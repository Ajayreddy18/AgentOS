# AgentOS – Database Design

Version: 1.0

Status: Version 1.0

Owner: Ajay Reddy

Last Updated: July 2026

---

Repository Structure

apps/
├── api/ Backend API
└── web/ React Frontend

docs/
├── product/
├── architecture/
├── engineering/
├── design/
├── roadmap/
└── design-planning/

---

# Document Purpose

This document defines the database architecture for AgentOS Version 1.

It describes the core entities, relationships, constraints, indexing strategy, and data lifecycle required to support software engineering workflows, AI collaboration, project memory, and knowledge retrieval.

This document serves as the blueprint for database implementation using PostgreSQL and Prisma.

---

# Database Goals

The database should:

- Support multiple users.
- Support multiple software projects.
- Preserve project history.
- Maintain persistent AI memory.
- Enable efficient file management.
- Support semantic search using embeddings.
- Track agent activities.
- Remain scalable for future versions.

---

# Database Technology

Database Engine

- PostgreSQL

ORM

- Drizzle ORM

Vector Storage

- PostgreSQL + pgvector

Migration Tool

- Drizzle Kit

---

# High-Level Entity Relationship Diagram

```
User
 │
 └── Organizations
        │
        └── Projects
               │
               └── Environments
                      │
                      ├── Agents
                      │      │
                      │      ├── Conversations
                      │      │      └── Messages
                      │      │
                      │      ├── Prompts
                      │      ├── Tools
                      │      ├── Models
                      │      └── Runtime
                      │
                      ├── Knowledge Bases
                      │      ├── Documents
                      │      └── Embeddings
                      │
                      └── Activity Logs
```

---

# Core Tables

Core Tables

- Users
- Organizations
- Organization Members
- Projects
- Environments
- Agents
- Conversations
- Messages
- Knowledge Bases
- Documents
- Embeddings
- Providers
- Models
- Prompts
- Tools
- Activity Logs

---

## User Settings

Purpose

Stores user preferences.

Main Fields

- id
- user_id
- theme
- default_model
- notification_preferences

---

# Relationships

User

↓

Many Organizations

↓

Many Projects

↓

Many Environments

↓

Many Agents

↓

Many Conversations

↓

Many Messages

Environment

↓

Knowledge Bases

↓

Documents

↓

Embeddings

Environment

↓

Providers

↓

Models

Environment

↓

Prompts

↓

Tools
---

# Constraints

The database should enforce:

- Unique email addresses.
- Foreign key integrity.
- Cascade deletion where appropriate.
- Required project ownership.
- Required conversation ownership.
- Required task ownership.

---

# Indexing Strategy

Indexes should be created for:

- email
- owner_id
- project_id
- conversation_id
- task status
- timestamps
- vector search columns
- organization_id
- environment_id
- agent_id
- provider_id
- model_id

---

# Data Lifecycle

User registers

↓

Creates project

↓

Uploads files

↓

Files processed

↓

Embeddings generated

↓

Memory updated

↓

Agents use memory

↓

Tasks completed

↓

Activity logged

---

# Future Database Enhancements

Future versions may introduce:

- API Keys
- Billing
- Usage Analytics
- Plugin Marketplace
- Multi-region replication
- Organizations
- Permissions
- Billing
- API Keys
- Agent Marketplace
- Plugin Storage

---

# Conclusion

The database architecture is designed around projects rather than conversations.

Each project acts as an independent workspace containing tasks, files, AI conversations, memories, embeddings, and activity history.

This structure provides a scalable foundation for AgentOS Version 1 while supporting future expansion.

## References

Related Documents

- docs/architecture/05-system-architecture.md
- docs/architecture/07-api-architecture.md
- docs/architecture/08-backend-architecture.md
