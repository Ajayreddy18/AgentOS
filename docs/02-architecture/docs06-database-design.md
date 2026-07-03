# AgentOS – Database Design

Version: 1.0

Status: Draft

Owner: Ajay Reddy

Last Updated: July 2026

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

- Prisma

Vector Storage

- PostgreSQL + pgvector

Migration Tool

- Prisma Migrate

---

# High-Level Entity Relationship Diagram

```
User
 │
 ├── Projects
 │      │
 │      ├── Tasks
 │      │      │
 │      │      └── Messages
 │      │
 │      ├── Files
 │      │
 │      ├── Memories
 │      │
 │      ├── Embeddings
 │      │
 │      └── Activity Logs
 │
 └── User Settings
```

---

# Core Tables

## Users

Purpose

Stores registered users.

Main Fields

- id
- name
- email
- password_hash
- avatar
- created_at
- updated_at

---

## Projects

Purpose

Stores software development projects.

Main Fields

- id
- owner_id
- name
- description
- status
- tech_stack
- created_at
- updated_at

---

## Tasks

Purpose

Stores development tasks.

Main Fields

- id
- project_id
- title
- description
- assigned_agent
- priority
- status
- created_at

---

## Conversations

Purpose

Stores AI conversations.

Main Fields

- id
- project_id
- title
- created_at

---

## Messages

Purpose

Stores chat history.

Main Fields

- id
- conversation_id
- sender
- content
- timestamp

---

## Agents

Purpose

Stores available AI agents.

Main Fields

- id
- name
- role
- description
- system_prompt

---

## Files

Purpose

Stores uploaded project files.

Main Fields

- id
- project_id
- filename
- file_type
- storage_path
- uploaded_at

---

## Memories

Purpose

Stores persistent project knowledge.

Main Fields

- id
- project_id
- memory_type
- content
- importance
- created_at

---

## Embeddings

Purpose

Stores vector representations for RAG.

Main Fields

- id
- memory_id
- vector
- chunk_text

---

## Activity Logs

Purpose

Stores important project events.

Main Fields

- id
- project_id
- action
- actor
- timestamp

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

Many Projects

Project

↓

Many Tasks

Project

↓

Many Conversations

Conversation

↓

Many Messages

Project

↓

Many Files

Project

↓

Many Memories

Memory

↓

Many Embeddings

Project

↓

Many Activity Logs

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

- Team workspaces
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
