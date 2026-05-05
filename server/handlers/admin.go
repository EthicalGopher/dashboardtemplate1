package handlers

import (
	"github.com/dashboardtemplate/server/database"
	"github.com/dashboardtemplate/server/models"
	"github.com/dashboardtemplate/server/utils"
	"github.com/gofiber/fiber/v2"
)

func GetPendingApplications(c *fiber.Ctx) error {
	var users []models.User
	if err := database.DB.Where("status = ?", "pending").Find(&users).Error; err != nil {
		return utils.RespondWithError(c, err, "Failed to retrieve pending applications", 500)
	}
	return c.JSON(users)
}

func GetPendingApplicationsCount(c *fiber.Ctx) error {
	var count int64
	if err := database.DB.Model(&models.User{}).Where("status = ?", "pending").Count(&count).Error; err != nil {
		return utils.RespondWithError(c, err, "Failed to count pending applications", 500)
	}
	return c.JSON(fiber.Map{"count": count})
}

func ApproveApplication(c *fiber.Ctx) error {
	id := c.Params("id")
	if err := database.DB.Model(&models.User{}).Where("id = ?", id).Update("status", "active").Error; err != nil {
		return utils.RespondWithError(c, err, "Failed to approve the application", 500)
	}
	return c.JSON(fiber.Map{"message": "Application approved successfully"})
}

func RejectApplication(c *fiber.Ctx) error {
	id := c.Params("id")
	if err := database.DB.Model(&models.User{}).Where("id = ?", id).Update("status", "rejected").Error; err != nil {
		return utils.RespondWithError(c, err, "Failed to reject the application", 500)
	}
	return c.JSON(fiber.Map{"message": "Application rejected successfully"})
}
