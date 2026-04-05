package utils

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
)

func GenerateToken() string {
	b := make([]byte, 20)
	if _, err := rand.Read(b); err != nil {
		return ""
	}
	return hex.EncodeToString(b)
}

// In a real app, this would use an SMTP client or service like SendGrid/Mailgun
func SendVerificationEmail(email, token string) {
	verificationLink := fmt.Sprintf("http://localhost:5173/verify-email?token=%s", token)
	fmt.Printf("\n--- SIMULATED EMAIL SENT TO %s ---\n", email)
	fmt.Printf("Subject: Verify your email\n")
	fmt.Printf("Body: Click here to verify: %s\n", verificationLink)
	fmt.Printf("------------------------------------\n\n")
}

func SendPasswordResetEmail(email, token string) {
	resetLink := fmt.Sprintf("http://localhost:5173/reset-password?token=%s", token)
	fmt.Printf("\n--- SIMULATED EMAIL SENT TO %s ---\n", email)
	fmt.Printf("Subject: Reset your password\n")
	fmt.Printf("Body: Click here to reset: %s\n", resetLink)
	fmt.Printf("------------------------------------\n\n")
}

func SendEmailChangeVerification(newEmail, token string) {
	verificationLink := fmt.Sprintf("http://localhost:5173/confirm-email-change?token=%s", token)
	fmt.Printf("\n--- SIMULATED EMAIL SENT TO %s ---\n", newEmail)
	fmt.Printf("Subject: Confirm your new email address\n")
	fmt.Printf("Body: Click here to confirm your email change: %s\n", verificationLink)
	fmt.Printf("------------------------------------\n\n")
}
