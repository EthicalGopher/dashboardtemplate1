package utils

import (
	"errors"
	"time"

	"github.com/dashboardtemplate/server/models"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var jwtSecret = []byte("your-very-secret-key")
var refreshSecret = []byte("your-refresh-secret-key")

// Removed HashPassword - now handled by GORM Hooks in models/user.go

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func GenerateTokens(user models.User) (string, string, error) {
	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"role":    user.Role,
		"exp":     time.Now().Add(time.Hour * 1).Unix(),
	})

	at, err := accessToken.SignedString(jwtSecret)
	if err != nil {
		return "", "", err
	}

	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"exp":     time.Now().Add(time.Hour * 24 * 7).Unix(),
	})

	rt, err := refreshToken.SignedString(refreshSecret)
	if err != nil {
		return "", "", err
	}

	return at, rt, nil
}

func ValidateToken(tokenString string, isRefresh bool) (uint, string, error) {
	secret := jwtSecret
	if isRefresh {
		secret = refreshSecret
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		return secret, nil
	})

	if err != nil {
		return 0, "", err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		userId := uint(claims["user_id"].(float64))
		role, _ := claims["role"].(string)
		return userId, role, nil
	}

	return 0, "", errors.New("invalid token")
}
