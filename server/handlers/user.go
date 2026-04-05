package handlers

import (
	"fmt"
	"os"
	"path/filepath"
	"time"

	"github.com/dashboardtemplate/server/database"
	"github.com/dashboardtemplate/server/models"
	"github.com/dashboardtemplate/server/utils"
	"github.com/gofiber/fiber/v2"
)

func GetProfile(c *fiber.Ctx) error {
	userId := c.Locals("user_id").(uint)
	var user models.User
	if err := database.DB.First(&user, userId).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "User not found"})
	}
	return c.JSON(user)
}

func UpdateProfile(c *fiber.Ctx) error {
	userId := c.Locals("user_id").(uint)
	
	type UpdateRequest struct {
		FullName        string `json:"full_name"`
		Email           string `json:"email"`
		Password        string `json:"password"`
		CurrentPassword string `json:"current_password"`
	}

	var req UpdateRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	var user models.User
	if err := database.DB.First(&user, userId).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "User not found"})
	}

	// 1. If changing Email or Password, require CurrentPassword
	if (req.Email != "" && req.Email != user.Email) || req.Password != "" {
		if req.CurrentPassword == "" {
			return c.Status(400).JSON(fiber.Map{"error": "Current password is required to change email or password"})
		}
		if !utils.CheckPasswordHash(req.CurrentPassword, user.Password) {
			return c.Status(401).JSON(fiber.Map{"error": "Incorrect current password"})
		}
	}

	// 2. Update Full Name (direct)
	if req.FullName != "" {
		user.FullName = req.FullName
	}

	// 3. Update Password (direct, hook handles hashing)
	if req.Password != "" {
		user.Password = req.Password
	}

	// 4. Handle Email Change (requires verification)
	emailChanged := false
	if req.Email != "" && req.Email != user.Email {
		token := utils.GenerateToken()
		user.PendingEmail = req.Email
		user.EmailChangeToken = token
		utils.SendEmailChangeVerification(req.Email, token)
		emailChanged = true
	}

	if err := database.DB.Save(&user).Error; err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	message := "Profile updated successfully"
	if emailChanged {
		message = "Profile updated. Please check your new email to confirm the change."
	}

	return c.JSON(fiber.Map{
		"message": message,
		"user":    user,
	})
}

func ConfirmEmailChange(c *fiber.Ctx) error {
	token := c.Query("token")
	if token == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Token is required"})
	}

	var user models.User
	if err := database.DB.Where("email_change_token = ?", token).First(&user).Error; err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid or expired token"})
	}

	if user.PendingEmail == "" {
		return c.Status(400).JSON(fiber.Map{"error": "No pending email change found"})
	}

	user.Email = user.PendingEmail
	user.PendingEmail = ""
	user.EmailChangeToken = ""
	database.DB.Save(&user)

	return c.JSON(fiber.Map{"message": "Email updated successfully."})
}

func UploadAvatar(c *fiber.Ctx) error {
	userId := c.Locals("user_id").(uint)
	
	file, err := c.FormFile("avatar")
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "No file uploaded"})
	}

	extension := filepath.Ext(file.Filename)
	filename := fmt.Sprintf("%d_%d%s", userId, time.Now().Unix(), extension)
	savePath := filepath.Join("uploads", filename)

	if _, err := os.Stat("uploads"); os.IsNotExist(err) {
		os.Mkdir("uploads", 0755)
	}

	if err := c.SaveFile(file, savePath); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to save file"})
	}

	var user models.User
	if err := database.DB.First(&user, userId).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "User not found"})
	}

	user.Avatar = "/uploads/" + filename
	database.DB.Save(&user)

	return c.JSON(user)
}
