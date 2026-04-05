package handlers

import (
	"github.com/dashboardtemplate/server/database"
	"github.com/dashboardtemplate/server/models"
	"github.com/gofiber/fiber/v2"
)

func GetPendingApplications(c *fiber.Ctx) error {
	var users []models.User
	if err := database.DB.Where("status = ?", "pending").Find(&users).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch applications"})
	}
	return c.JSON(users)
}

func GetPendingApplicationsCount(c *fiber.Ctx) error {
	var count int64
	if err := database.DB.Model(&models.User{}).Where("status = ?", "pending").Count(&count).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to count applications"})
	}
	return c.JSON(fiber.Map{"count": count})
}

func ApproveApplication(c *fiber.Ctx) error {
	id := c.Params("id")
	if err := database.DB.Model(&models.User{}).Where("id = ?", id).Update("status", "active").Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to approve application"})
	}
	return c.JSON(fiber.Map{"message": "Application approved successfully"})
}

func RejectApplication(c *fiber.Ctx) error {
	id := c.Params("id")
	if err := database.DB.Model(&models.User{}).Where("id = ?", id).Update("status", "rejected").Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to reject application"})
	}
	return c.JSON(fiber.Map{"message": "Application rejected successfully"})
}
