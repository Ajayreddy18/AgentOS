# AgentOS – API Design

Version: 1.0

Status: Draft

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

# Project APIs

## Create Project

POST

```
/projects
```

---

## Get All Projects

GET

```
/projects
```

---

## Get Project

GET

```
/projects/{projectId}
```

---

## Update Project

PUT

```
/projects/{projectId}
```

---

## Delete Project

DELETE

```
/projects/{projectId}
```

---

# Task APIs

## Create Task

POST

```
/projects/{projectId}/tasks
```

---

## Get Tasks

GET

```
/projects/{projectId}/tasks
```

---

## Get Task

GET

```
/tasks/{taskId}
```

---

## Update Task

PUT

```
/tasks/{taskId}
```

---

## Delete Task

DELETE

```
/tasks/{taskId}
```

---

# Conversation APIs

## Create Conversation

POST

```
/projects/{projectId}/conversations
```

---

## Get Conversations

GET

```
/projects/{projectId}/conversations
```

---

## Get Conversation

GET

```
/conversations/{conversationId}
```

---

# Message APIs

## Send Message

POST

```
/conversations/{conversationId}/messages
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

## Get Available Agents

GET

```
/agents
```

---

## Get Agent Details

GET

```
/agents/{agentId}
```

---

## Execute Agent Task

POST

```
/agents/{agentId}/execute
```

Purpose

Run a specific AI agent for a defined task.

---

# File APIs

## Upload File

POST

```
/projects/{projectId}/files
```

---

## Get Files

GET

```
/projects/{projectId}/files
```

---

## Download File

GET

```
/files/{fileId}
```

---

## Delete File

DELETE

```
/files/{fileId}
```

---

# Memory APIs

## Get Project Memory

GET

```
/projects/{projectId}/memory
```

---

## Search Memory

GET

```
/projects/{projectId}/memory/search
```

Purpose

Retrieve relevant memories based on a search query.

---

# RAG APIs

## Index Documents

POST

```
/projects/{projectId}/rag/index
```

Purpose

Generate embeddings for project files.

---

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
- Organization APIs
- Billing APIs
- Plugin APIs
- Marketplace APIs
- Webhook APIs

---

# Conclusion

The REST API provides a consistent and secure interface between the frontend, backend services, AI agents, memory system, and supporting infrastructure.

All backend implementation should follow the endpoint structure, response conventions, authentication model, and versioning strategy defined in this document.
