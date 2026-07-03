# AgentOS – Project Structure

Version: 1.0

Status: Draft

Owner: Ajay Reddy

Last Updated: July 2026

---

# Document Purpose

This document defines the repository structure for AgentOS Version 1.

It describes how the project is organized, the purpose of each directory, naming conventions, and the responsibilities of different application modules.

A consistent structure improves maintainability, onboarding, scalability, and collaboration.

---

# Project Structure Goals

The repository should:

- Be easy to understand.
- Support frontend and backend development.
- Encourage modular design.
- Separate concerns clearly.
- Enable future scaling.
- Support shared code.
- Minimize duplication.

---

# Repository Layout

```
agentos/

├── apps/
│   ├── frontend/
│   └── backend/
│
├── packages/
│   ├── ui/
│   ├── shared/
│   ├── types/
│   ├── prompts/
│   └── config/
|   └── agents/
|   └── schemas/
│
├── docs/
│
├── docker/
│
├── scripts/
│
├── prisma/
│
├── .github/
│   └── workflows/
│
├── public/
│
├── .env.example
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── README.md
└── LICENSE
```

---

# Monorepo Strategy

AgentOS uses a monorepo.

Benefits include:

- Shared TypeScript types.
- Shared UI components.
- Shared utility functions.
- Shared configuration.
- Simpler dependency management.
- Easier code reuse.

---

# apps/

Contains runnable applications.

---

## apps/frontend

Purpose

React application.

Responsibilities

- Dashboard
- Chat interface
- Authentication pages
- Project management
- File management
- Settings
- UI components specific to the frontend

---

## apps/backend

Purpose

NestJS backend.

Responsibilities

- REST APIs
- Authentication
- Agent orchestration
- Memory management
- RAG
- File processing
- Database access
- Business logic

---

# packages/

Contains reusable code shared across applications.

---

## packages/ui

Reusable UI components.

Examples:

- Buttons
- Cards
- Dialogs
- Tables
- Layout components

---

## packages/shared

Shared utility functions.

Examples:

- Date utilities
- Validation helpers
- Common constants
- Error helpers

---

## packages/types

Shared TypeScript types.

Examples:

- User
- Project
- Conversation
- Agent
- Memory
- API responses

---

## packages/prompts

Stores prompt templates.

Examples:

- Planner prompts
- Reviewer prompts
- Documentation prompts
- Memory prompts

Prompt definitions should remain version-controlled.

---

## packages/config

Shared configuration.

Examples:

- Environment configuration
- Feature flags
- Application constants
- Default settings

---

# prisma/

Contains:

- Prisma schema
- Database migrations
- Seed scripts

This directory is the single source of truth for the database schema.

---

# docs/

Contains all product and engineering documentation.

Documentation should evolve alongside the application.

---

# docker/

Contains Docker configuration.

Examples:

- Dockerfiles
- Docker Compose
- Development containers

---

# scripts/

Automation scripts.

Examples:

- Database setup
- Development startup
- Build helpers
- Maintenance scripts

Scripts should be idempotent where possible.

---

# .github/

GitHub-specific configuration.

Examples:

- CI workflows
- Pull request templates
- Issue templates
- CODEOWNERS

---

# public/

Static assets.

Examples:

- Images
- Icons
- Logos
- Favicon

---

# Naming Conventions

Directories

- lowercase
- kebab-case where appropriate

Files

Examples:

```
project.service.ts
memory.controller.ts
agent.module.ts
```

React Components

```
ProjectCard.tsx
ChatWindow.tsx
AgentSidebar.tsx
```

Database Models

Singular nouns.

Examples:

- User
- Project
- Conversation
- Memory

API Endpoints

Plural resources.

Examples:

```
/projects
/users
/conversations
/tasks
/files
```

---

# Backend Module Structure

Example

```
backend/

src/

modules/

auth/

projects/

agents/

memory/

rag/

files/

conversations/

users/

common/

config/
```

Each module should include:

- Controller
- Service
- DTOs
- Entities
- Tests

---

# Frontend Structure

Example

```
frontend/

src/

components/

pages/

layouts/

hooks/

services/

store/

types/

utils/

assets/
```

Responsibilities:

Components

Reusable UI.

Pages

Application routes.

Hooks

Reusable React logic.

Services

API communication.

Store

Global application state.

Types

Frontend TypeScript models.

Utils

Helper functions.

Assets

Images and icons.

---

# Shared Code Principles

Only place code in packages/ when:

- It is used by multiple applications.
- It has no application-specific dependencies.
- It improves consistency.

Otherwise, keep it inside the relevant application.

---

# Dependency Direction

The dependency flow should be:

```
Applications

↓

Shared Packages

↓

External Libraries
```

Shared packages must never depend on application code.

---

# Configuration Files

Examples include:

- tsconfig
- eslint
- prettier
- docker
- environment configuration

Configuration should be centralized where practical.

---

# Documentation Standards

Every major feature should include:

- Design documentation
- API updates
- Architecture updates (if required)

Documentation should remain synchronized with implementation.

---

# Scalability Considerations

The project structure should support:

- Additional applications
- Mobile clients
- Worker services
- AI microservices
- Shared SDKs
- Plugin architecture

Future expansion should require minimal reorganization.

---

# Architecture Principles

The project structure should remain:

- Modular
- Predictable
- Consistent
- Scalable
- Easy to navigate
- Easy to maintain

---

# Conclusion

The AgentOS project structure provides a modular monorepo architecture that separates frontend, backend, and shared code while encouraging consistency, scalability, and long-term maintainability.

By following this structure throughout development, the repository remains organized as the platform grows from Version 1 to future releases.
