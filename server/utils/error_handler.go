package utils

import (
	"log"
	"strings"

	"github.com/gofiber/fiber/v2"
)

// RespondWithError handles logging the actual error and returning a user-friendly message
func RespondWithError(c *fiber.Ctx, err error, customMsg string, statusCode ...int) error {
	status := 500
	if len(statusCode) > 0 {
		status = statusCode[0]
	}

	if err != nil {
		log.Printf("[ERROR] %s: %v", customMsg, err)
		
		errStr := err.Error()
		
		// Map common technical errors to user-friendly messages
		if strings.Contains(errStr, "UNIQUE constraint failed") {
			if strings.Contains(errStr, "users.email") {
				return c.Status(400).JSON(fiber.Map{"error": "This email is already in use. Please try another one."})
			}
			return c.Status(400).JSON(fiber.Map{"error": "A record with this information already exists."})
		}

		if strings.Contains(errStr, "record not found") {
			return c.Status(404).JSON(fiber.Map{"error": "The requested information could not be found."})
		}

		if strings.Contains(errStr, "GEMINI_API_KEY not set") {
			return c.Status(503).JSON(fiber.Map{"error": "AI services are currently unavailable. Please contact support."})
		}
	}

	msg := customMsg
	if msg == "" {
		msg = "An unexpected error occurred. Please try again later."
	}

	return c.Status(status).JSON(fiber.Map{"error": msg})
}
