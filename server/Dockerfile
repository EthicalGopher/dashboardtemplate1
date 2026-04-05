# Backend Dockerfile
FROM golang:1.25-alpine AS builder

# Install build dependencies for sqlite (CGO)
RUN apk add --no-cache build-base

WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Build the application
# CGO_ENABLED=1 is required for go-sqlite3
RUN CGO_ENABLED=1 GOOS=linux go build -o main .

# Final stage
FROM alpine:latest

# Install sqlite and libc6-compat for CGO support
RUN apk add --no-cache sqlite libc6-compat

WORKDIR /root/

# Copy the binary from builder
COPY --from=builder /app/main .

# Create uploads directory if it doesn't exist
RUN mkdir -p uploads

# Expose port
EXPOSE 8080

# Command to run the application
CMD ["./main"]
