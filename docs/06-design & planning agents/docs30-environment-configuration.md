# AgentOS – Environment Configuration

Version: 1.0

Status: Version 1.0

Owner: Ajay Reddy

Last Updated: July 2026

---

# Document Purpose

This document defines the environment configuration strategy for AgentOS Version 1.

It specifies all required environment variables, configuration validation, secret management, and environment-specific settings for local development, testing, staging, and production.

The objective is to provide a secure, predictable, and portable configuration system.

---

# Configuration Principles

Environment configuration should be:

- Secure
- Consistent
- Version controlled (templates only)
- Easy to validate
- Independent of source code

Secrets must never be committed to Git.

---

# Supported Environments

AgentOS supports:

- Development
- Testing
- Staging
- Production

Each environment should have its own configuration file.

Example:

```

.env.development

.env.test

.env.staging

.env.production

```

---

# Environment Variable Naming

Use uppercase names with underscores.

Examples:

```

DATABASE_URL

JWT_SECRET

OPENAI_API_KEY

APP_PORT

```

Avoid ambiguous names.

---

# Backend Configuration

## Application

```

NODE_ENV

APP_NAME

APP_PORT

APP_URL

LOG_LEVEL

```

---

## Authentication

```

JWT_SECRET

JWT_EXPIRES_IN

REFRESH_TOKEN_SECRET

REFRESH_TOKEN_EXPIRES_IN

```

---

## Database

```

DATABASE_URL

DATABASE_HOST

DATABASE_PORT

DATABASE_NAME

DATABASE_USER

DATABASE_PASSWORD

```

---

## Redis

```

REDIS_HOST

REDIS_PORT

REDIS_PASSWORD

```

---

## AI Providers

```

OPENAI_API_KEY

GEMINI_API_KEY

ANTHROPIC_API_KEY

DEFAULT_AI_PROVIDER

DEFAULT_MODEL

```

The application should support switching AI providers through configuration.

---

## Vector Database

```

VECTOR_DB_URL

VECTOR_DB_COLLECTION

EMBEDDING_MODEL

```

---

## File Storage

```

STORAGE_PROVIDER

UPLOAD_DIRECTORY

MAX_UPLOAD_SIZE

```

Future versions may support cloud storage providers.

---

## Email

```

SMTP_HOST

SMTP_PORT

SMTP_USERNAME

SMTP_PASSWORD

EMAIL_FROM

```

---

## Rate Limiting

```

RATE_LIMIT_WINDOW

RATE_LIMIT_MAX_REQUESTS

```

---

## CORS

```

CORS_ALLOWED_ORIGINS

```

---

## Feature Flags

```

ENABLE_RAG

ENABLE_MEMORY

ENABLE_DOCUMENTATION

ENABLE_MULTI_AGENT

ENABLE_ANALYTICS

```

Feature flags allow incomplete functionality to remain disabled until ready.

---

# Frontend Configuration

Examples:

```

VITE_API_BASE_URL

VITE_APP_NAME

VITE_ENABLE_ANALYTICS

VITE_DEFAULT_THEME

```

Only variables intended for the frontend should be exposed.

Secrets must never be accessible in frontend code.

---

# Docker Configuration

Containers should receive configuration through environment variables.

Example:

```

DATABASE_URL

REDIS_URL

JWT_SECRET

OPENAI_API_KEY

```

Avoid hardcoding values inside Docker images.

---

# Configuration Validation

The application should validate required variables during startup.

Validation should check:

- Missing variables
- Invalid formats
- Invalid URLs
- Invalid port numbers
- Empty secrets

Startup should fail if critical configuration is missing.

---

# Secret Management

Secrets include:

- API keys
- Database passwords
- JWT secrets
- SMTP credentials

Guidelines:

- Never commit secrets.
- Rotate secrets periodically.
- Restrict access.
- Use secure secret managers in production.

---

# Local Development

Developers should copy:

```

.env.example

↓

.env.development

```

Only local values should be edited.

---

# Example Environment Template

```

APP_NAME=AgentOS

APP_PORT=5000

DATABASE_URL=

JWT_SECRET=

OPENAI_API_KEY=

GEMINI_API_KEY=

```

Example templates should never contain real secrets.

---

# Production Configuration

Production should:

- Use HTTPS.
- Use strong secrets.
- Enable structured logging.
- Disable debug features.
- Restrict CORS.
- Validate configuration before startup.

---

# Configuration Ownership

Configuration should be grouped by domain:

| Area           | Variables                       |
| -------------- | ------------------------------- |
| Application    | APP_*                           |
| Authentication | JWT_*                           |
| Database       | DATABASE_*                      |
| Redis          | REDIS_*                         |
| AI Providers   | OPENAI__, GEMINI__, ANTHROPIC_* |
| Storage        | STORAGE_*                       |
| Email          | SMTP_*                          |
| Frontend       | VITE_*                          |

---

# Configuration Loading Order

Configuration should load in this order:

1. Default values
2. Environment variables
3. Environment-specific overrides

Later values override earlier ones.

---

# Security Guidelines

Never expose:

- JWT secrets
- API keys
- Database passwords
- SMTP passwords

Frontend builds must not include backend secrets.

---

# Future Enhancements

Future versions may support:

- Cloud secret managers
- Runtime configuration updates
- Encrypted configuration files
- Multi-region configuration
- Tenant-specific configuration

---

# Configuration Checklist

Before deployment verify:

- All required variables exist.
- Secrets are secure.
- Database connection is valid.
- AI provider credentials are working.
- CORS configuration is correct.
- Feature flags are reviewed.

---

# Conclusion

A well-defined environment configuration strategy ensures that AgentOS can be developed, tested, and deployed consistently across multiple environments while maintaining security and operational reliability.
