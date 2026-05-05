package handlers

import (
	"context"
	"fmt"
	"os"
	"strings"

	"github.com/dashboardtemplate/server/utils"
	"github.com/gofiber/fiber/v2"
	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

// Mock Data (moved from frontend)
var riskDistributionData = []map[string]interface{}{
	{"name": "Critical", "value": 12, "color": "#ef4444"},
	{"name": "High", "value": 45, "color": "#f97316"},
	{"name": "Medium", "value": 180, "color": "#eab308"},
	{"name": "Low", "value": 1047, "color": "#22c55e"},
}

var complianceTrendData = []map[string]interface{}{
	{"month": "Jan", "rate": 78},
	{"month": "Feb", "rate": 82},
	{"month": "Mar", "rate": 80},
	{"month": "Apr", "rate": 85},
	{"month": "May", "rate": 89},
	{"month": "Jun", "rate": 92},
}

var vendorsList = []map[string]interface{}{
	{"name": "DataStream Inc.", "risk": "Critical", "score": 94, "category": "Data Processing"},
	{"name": "Nebula Cloud", "risk": "Moderate", "score": 62, "category": "Cloud Infrastructure"},
	{"name": "ShieldForce Lab", "risk": "Low", "score": 28, "category": "Cybersecurity"},
	{"name": "CyberNode", "risk": "High", "score": 81, "category": "Network Solutions"},
	{"name": "SafeAuth", "risk": "Low", "score": 15, "category": "Identity Management"},
}

// AI Request/Response structs
type ChatRequest struct {
	Message string `json:"message"`
	History []struct {
		Role string `json:"role"`
		Text string `json:"text"`
	} `json:"history"`
}

func AIChat(c *fiber.Ctx) error {
	ctx := context.Background()
	apiKey := os.Getenv("GEMINI_API_KEY")
	if apiKey == "" {
		return utils.RespondWithError(c, fmt.Errorf("GEMINI_API_KEY not set"), "AI services are currently unavailable", 503)
	}

	req := new(ChatRequest)
	if err := c.BodyParser(req); err != nil {
		return utils.RespondWithError(c, err, "Invalid request details", 400)
	}

	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		return utils.RespondWithError(c, err, "Could not initialize AI service", 500)
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-2.5-flash")

	// Define Tools
	model.Tools = []*genai.Tool{
		{
			FunctionDeclarations: []*genai.FunctionDeclaration{
				{
					Name:        "get_risk_distribution",
					Description: "Get the current distribution of risks across critical, high, medium, and low categories.",
				},
				{
					Name:        "get_compliance_trend",
					Description: "Get the compliance rate trend data over the last few months.",
				},
				{
					Name:        "search_vendors",
					Description: "Search for specific vendors and their risk scores/categories.",
					Parameters: &genai.Schema{
						Type: genai.TypeObject,
						Properties: map[string]*genai.Schema{
							"query": {
								Type:        genai.TypeString,
								Description: "The name or part of the name of the vendor to search for.",
							},
						},
					},
				},
			},
		},
	}

	session := model.StartChat()

	// Reconstruct history
	for _, h := range req.History {
		role := h.Role
		if role == "ai" {
			role = "model"
		}
		session.History = append(session.History, &genai.Content{
			Role: role,
			Parts: []genai.Part{
				genai.Text(h.Text),
			},
		})
	}

	resp, err := session.SendMessage(ctx, genai.Text(req.Message))
	if err != nil {
		return utils.RespondWithError(c, err, "We encountered an issue getting a response from the AI", 500)
	}

	// Handle Tool Calling
	part := resp.Candidates[0].Content.Parts[0]
	if funcCall, ok := part.(genai.FunctionCall); ok {
		var toolResult interface{}

		switch funcCall.Name {
		case "get_risk_distribution":
			toolResult = riskDistributionData
		case "get_compliance_trend":
			toolResult = complianceTrendData
		case "search_vendors":
			query := ""
			if q, ok := funcCall.Args["query"].(string); ok {
				query = q
			}
			if query == "" {
				toolResult = vendorsList
			} else {
				var filtered []map[string]interface{}
				for _, v := range vendorsList {
					name, _ := v["name"].(string)
					if strings.Contains(strings.ToLower(name), strings.ToLower(query)) {
						filtered = append(filtered, v)
					}
				}
				toolResult = filtered
			}
		}

		// Send tool result back
		resp, err = session.SendMessage(ctx, genai.FunctionResponse{
			Name:     funcCall.Name,
			Response: map[string]interface{}{"content": toolResult},
		})
		if err != nil {
			return utils.RespondWithError(c, err, "Failed to process AI tool request", 500)
		}
	}

	// Get final text response
	responseText := ""
	for _, p := range resp.Candidates[0].Content.Parts {
		if t, ok := p.(genai.Text); ok {
			responseText += string(t)
		}
	}

	return c.JSON(fiber.Map{
		"response": responseText,
	})
}
