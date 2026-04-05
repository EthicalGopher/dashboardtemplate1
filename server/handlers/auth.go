package handlers

import (
	"github.com/dashboardtemplate/server/database"
	"github.com/dashboardtemplate/server/models"
	"github.com/dashboardtemplate/server/utils"
	"github.com/gofiber/fiber/v2"
	"time"
)

func Signup(c *fiber.Ctx) error {
	type SignupRequest struct {
		Email    string `json:"email"`
		Password string `json:"password"`
		FullName string `json:"full_name"`
		Role     string `json:"role"`
	}

	var req SignupRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	validRoles := map[string]bool{"user": true, "ceo": true, "manager": true}
	if req.Role == "" {
		req.Role = "user"
	}
	if !validRoles[req.Role] {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid role selected"})
	}

	status := "active"
	if req.Role == "manager" {
		status = "pending"
	}

	user := models.User{
		Email:           req.Email,
		Password:        req.Password,
		FullName:        req.FullName,
		Role:            req.Role,
		Status:          status,
		IsEmailVerified: true, // Verified by default now
	}

	if err := database.DB.Create(&user).Error; err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	// If pending manager, return message
	if user.Status == "pending" {
		return c.Status(201).JSON(fiber.Map{
			"message": "Application submitted. Please wait for CEO approval.",
			"user":    user,
		})
	}

	// For others, login directly
	at, rt, _ := utils.GenerateTokens(user)

	return c.Status(201).JSON(models.AuthResponse{
		AccessToken:  at,
		RefreshToken: rt,
		User:         user,
	})
}

func Login(c *fiber.Ctx) error {
	type LoginRequest struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	var req LoginRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	var user models.User
	if err := database.DB.Where("email = ?", req.Email).First(&user).Error; err != nil {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid credentials"})
	}

	// Verification check removed as requested

	if user.Status == "pending" {
		return c.Status(401).JSON(fiber.Map{"error": "Your account is pending CEO approval"})
	}

	if user.Status == "rejected" {
		return c.Status(401).JSON(fiber.Map{"error": "Your application was rejected"})
	}

	if !utils.CheckPasswordHash(req.Password, user.Password) {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid credentials"})
	}

	at, rt, _ := utils.GenerateTokens(user)

	return c.JSON(models.AuthResponse{
		AccessToken:  at,
		RefreshToken: rt,
		User:         user,
	})
}

// ... rest of the file (VerifyEmail, ForgotPassword, ResetPassword, Refresh, ConfirmEmailChange) remains the same for settings/recovery
func VerifyEmail(c *fiber.Ctx) error {
	token := c.Query("token")
	if token == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Token is required"})
	}

	var user models.User
	if err := database.DB.Where("verification_token = ?", token).First(&user).Error; err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid or expired token"})
	}

	user.IsEmailVerified = true
	user.VerificationToken = ""
	database.DB.Save(&user)

	return c.JSON(fiber.Map{"message": "Email verified successfully. You can now log in."})
}

func ForgotPassword(c *fiber.Ctx) error {
	type ForgotRequest struct {
		Email string `json:"email"`
	}
	var req ForgotRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	var user models.User
	if err := database.DB.Where("email = ?", req.Email).First(&user).Error; err != nil {
		return c.JSON(fiber.Map{"message": "If an account exists, a reset link has been sent."})
	}

	resetToken := utils.GenerateToken()
	expiry := time.Now().Add(time.Hour * 1)

	user.ResetPasswordToken = resetToken
	user.ResetPasswordExpires = &expiry
	database.DB.Save(&user)

	utils.SendPasswordResetEmail(user.Email, resetToken)

	return c.JSON(fiber.Map{"message": "If an account exists, a reset link has been sent."})
}

func ResetPassword(c *fiber.Ctx) error {
	type ResetRequest struct {
		Token    string `json:"token"`
		Password string `json:"password"`
	}
	var req ResetRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	var user models.User
	if err := database.DB.Where("reset_password_token = ? AND reset_password_expires > ?", req.Token, time.Now()).First(&user).Error; err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid or expired reset token"})
	}

	user.Password = req.Password
	user.ResetPasswordToken = ""
	user.ResetPasswordExpires = nil
	database.DB.Save(&user)

	return c.JSON(fiber.Map{"message": "Password reset successfully. You can now log in."})
}

func Refresh(c *fiber.Ctx) error {
	type RefreshRequest struct {
		RefreshToken string `json:"refresh_token"`
	}

	var req RefreshRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	userId, _, err := utils.ValidateToken(req.RefreshToken, true)
	if err != nil {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid refresh token"})
	}

	var user models.User
	if err := database.DB.First(&user, userId).Error; err != nil {
		return c.Status(401).JSON(fiber.Map{"error": "User not found"})
	}

	if user.Status != "active" {
		return c.Status(401).JSON(fiber.Map{"error": "Account not active"})
	}

	at, rt, _ := utils.GenerateTokens(user)

	return c.JSON(models.AuthResponse{
		AccessToken:  at,
		RefreshToken: rt,
		User:         user,
	})
}
