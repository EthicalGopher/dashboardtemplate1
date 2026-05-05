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
		return utils.RespondWithError(c, err, "We couldn't find your profile information", 404)
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
		return utils.RespondWithError(c, err, "Invalid update details provided", 400)
	}

	var user models.User
	if err := database.DB.First(&user, userId).Error; err != nil {
		return utils.RespondWithError(c, err, "User account not found", 404)
	}

	// 1. If changing Email or Password, require CurrentPassword
	if (req.Email != "" && req.Email != user.Email) || req.Password != "" {
		if req.CurrentPassword == "" {
			return utils.RespondWithError(c, nil, "Please provide your current password to change your email or password", 400)
		}
		if !utils.CheckPasswordHash(req.CurrentPassword, user.Password) {
			return utils.RespondWithError(c, nil, "The current password you entered is incorrect", 401)
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
		return utils.RespondWithError(c, err, "Could not update your profile. This email might already be in use.", 400)
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
		return utils.RespondWithError(c, nil, "A confirmation token is required", 400)
	}

	var user models.User
	if err := database.DB.Where("email_change_token = ?", token).First(&user).Error; err != nil {
		return utils.RespondWithError(c, err, "The confirmation link is invalid or has expired", 400)
	}

	if user.PendingEmail == "" {
		return utils.RespondWithError(c, nil, "No pending email change was found for this account", 400)
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
		return utils.RespondWithError(c, err, "No image file was uploaded", 400)
	}

	extension := filepath.Ext(file.Filename)
	filename := fmt.Sprintf("%d_%d%s", userId, time.Now().Unix(), extension)
	savePath := filepath.Join("uploads", filename)

	if _, err := os.Stat("uploads"); os.IsNotExist(err) {
		os.Mkdir("uploads", 0755)
	}

	if err := c.SaveFile(file, savePath); err != nil {
		return utils.RespondWithError(c, err, "Failed to save your profile picture", 500)
	}

	var user models.User
	if err := database.DB.First(&user, userId).Error; err != nil {
		return utils.RespondWithError(c, err, "User account not found", 404)
	}

	user.Avatar = "/uploads/" + filename
	database.DB.Save(&user)

	return c.JSON(user)
}
