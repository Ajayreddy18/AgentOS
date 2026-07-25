# AgentOS – API Design

Version: 1.0

Status: Version 1.0

Owner: Ajay Reddy

Last Updated: July 2026

---

# Document Purpose

This document defines the REST API design for AgentOS Version 1.

It specifies the major API endpoints, request methods, expected behaviors, authentication requirements, response conventions, and error handling strategy.

The API serves as the communication layer between the frontend, backend services, AI orchestration engine, and supporting infrastructure.

---

# API Design Principles

The APIs should follow these principles:

- RESTful architecture
- JSON request and response format
- Stateless communication
- JWT-based authentication
- Predictable endpoint naming
- Consistent error responses
- Versioned API paths
- Secure by default

---

# Base URL

```
/api/v1
```

---

# Authentication APIs

## Register User

POST

```
/auth/register
```

Purpose

Create a new user account.

---

## Login

POST

```
/auth/login
```

Purpose

Authenticate a user and return a JWT access token.

---

## Logout

POST

```
/auth/logout
```

Purpose

End the current user session.

---

## Get Current User

GET

```
/auth/me
```

Purpose

Return the authenticated user's profile.

---

# User APIs

## Get Profile

GET

```
/users/profile
```

---

## Update Profile

PUT

```
/users/profile
```

---

## Update User Settings

PUT

```
/users/settings
```

Purpose

Update preferences such as theme, AI model selection, and notification settings.

---

# Organization APIs

GET /organizations

POST /organizations

GET /organizations/{organizationId}

PUT /organizations/{organizationId}

DELETE /organizations/{organizationId}

---

Project APIs

GET /organizations/{organizationId}/projects

POST /organizations/{organizationId}/projects

GET /projects/{projectId}

PUT /projects/{projectId}

DELETE /projects/{projectId}

---

Environment APIs

GET /projects/{projectId}/environments

POST /projects/{projectId}/environments

GET /environments/{environmentId}

PUT /environments/{environmentId}

DELETE /environments/{environmentId}

```

---
```

---

# Conversation APIs

## Create Conversation

POST

```
/agents/{agentId}/conversations
```

---

## Get Conversations

GET

```
/agents/{agentId}/conversations
```

---

## Get Conversation

GET

```
/agents/{conversationId}
```

---

# Message APIs

## Send Message

POST

```
/conversations/{conversationId}/chat
POST /conversations/{conversationId}/chat/stream
```

Purpose

Send a user prompt to the Agent Orchestrator.

---

## Get Messages

GET

```
/conversations/{conversationId}/messages
```

Purpose

Retrieve conversation history.

---

# Agent APIs

GET /environments/{environmentId}/agents

POST /environments/{environmentId}/agents

GET /agents/{agentId}

PUT /agents/{agentId}

DELETE /agents/{agentId}

---

# File APIs

Knowledge Base APIs

GET /agents/{agentId}/knowledge

POST /agents/{agentId}/knowledge

GET /knowledge/{knowledgeId}

PUT /knowledge/{knowledgeId}

DELETE /knowledge/{knowledgeId}

---

Document APIs

GET /knowledge/{knowledgeId}/documents

POST /knowledge/{knowledgeId}/documents

GET /documents/{documentId}

DELETE /documents/{documentId}
---

# RAG APIs

Embedding APIs

POST /documents/{documentId}/embed

GET /documents/{documentId}/embeddings

---

Retrieval APIs

POST /retrieval/search

## Index Documents

POST

```
/projects/{projectId}/rag/index
```

Purpose

Generate embeddings for project files.

---

###Provider APIs

GET /providers

POST /providers

GET /providers/{providerId}

PUT /providers/{providerId}

DELETE /providers/{providerId}

Model APIs

GET /providers/{providerId}/models

POST /providers/{providerId}/models

GET /models/{modelId}

PUT /models/{modelId}

DELETE /models/{modelId}

Prompt APIs

GET /agents/{agentId}/prompts

POST /agents/{agentId}/prompts

GET /prompts/{promptId}

PUT /prompts/{promptId}

DELETE /prompts/{promptId}

Tool APIs

GET /agents/{agentId}/tools

POST /agents/{agentId}/tools

GET /tools/{toolId}

PUT /tools/{toolId}

DELETE /tools/{toolId}

## Search Knowledge Base

POST

```
/projects/{projectId}/rag/search
```

Purpose

Retrieve semantically relevant document chunks.

---

# Standard Response Format

Successful responses should follow:

```json
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully."
}
```

---

# Standard Error Format

Errors should follow:

```json
{
  "success": false,
  "error": {
    "code": "PROJECT_NOT_FOUND",
    "message": "The requested project does not exist."
  }
}
```

---

# HTTP Status Codes

| Status | Meaning               |
| ------ | --------------------- |
| 200    | OK                    |
| 201    | Created               |
| 204    | No Content            |
| 400    | Bad Request           |
| 401    | Unauthorized          |
| 403    | Forbidden             |
| 404    | Not Found             |
| 409    | Conflict              |
| 422    | Validation Error      |
| 500    | Internal Server Error |

---

# Authentication

Protected endpoints require:

```
Authorization: Bearer <JWT_TOKEN>
```

Public endpoints include:

- Register
- Login

All other endpoints require authentication.

---

# API Versioning

Version 1 uses:

```
/api/v1
```

Future versions may include:

```
/api/v2
```

without breaking existing clients.

---

# Future APIs

Future releases may include:

- Team APIs
- - Webhooks
- API Keys
- Usage Analytics
- Billing APIs
- Plugin APIs
- Marketplace APIs
- Webhook APIs

---

# Conclusion

The REST API provides a consistent and secure interface between the frontend, backend services, AI agents, memory system, and supporting infrastructure.

All backend implementation should follow the endpoint structure, response conventions, authentication model, and versioning strategy defined in this document.
