# AgentOS – Technology Stack

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

# Document Purpose

This document defines the technology stack for AgentOS Version 1.

It explains the purpose of each technology, why it was selected, possible alternatives, and the architectural principles behind these decisions.

The goal is to maintain consistency throughout development and make future technology decisions easier.

---

# Technology Selection Principles

Every technology should satisfy most of the following criteria:

- Open source where practical
- Large community support
- Production proven
- Easy to learn
- Strong documentation
- Good developer experience
- Long-term maintainability
- Compatible with future scaling
- Low development cost

---

# High-Level Technology Stack

| Layer               | Technology           |
| ------------------- | -------------------- |
| Frontend            | React + Vite         |
| Language            | TypeScript           |
| Styling             | Tailwind CSS         |
| Backend             | Express.js           |
| Runtime             | Express.js           |
| ORM                 | Drizzle ORM          |
| Database            | PostgreSQL           |
| Vector Database     | pgvector             |
| Authentication      | JWT                  |
| Validation          | Zod                  |
| AI Provider Layer   | Provider Abstraction |
| Initial AI Provider | Groq                 |
| Package Manager     | npm                  |
| Version Control     | Git                  |
| Containerization    | Docker               |
| API Testing         | Bruno                |
| Testing             | Vitest               |
| CI/CD               | GitHub Actions       |
| Code Quality        | ESLint + Prettier    |

---

# Frontend

## Technology

React

### Purpose

Build a modern, component-based user interface.

### Why We Chose It

- Industry standard
- Excellent ecosystem
- Large community
- Component architecture
- Easy integration with AI workflows

### Alternatives Considered

- Vue
- Angular
- Svelte

### Decision

React provides the best balance between ecosystem maturity, hiring availability, and long-term maintainability.

---

# Programming Language

## Technology

TypeScript

### Purpose

Provide static typing across the application.

### Why We Chose It

- Better developer experience
- Early error detection
- Improved IDE support
- Easier refactoring
- Safer large codebases

### Alternatives Considered

- JavaScript

### Decision

TypeScript improves reliability and maintainability for a production-grade platform.

---

# Styling

## Technology

Tailwind CSS

### Purpose

Build consistent, responsive user interfaces.

### Why We Chose It

- Utility-first workflow
- Fast development
- Small production bundle
- Easy customization

### Alternatives Considered

- Bootstrap
- Material UI
- CSS Modules

### Decision

Tailwind CSS provides flexibility while avoiding unnecessary UI framework constraints.

---

# Backend Framework

## Technology

Express.js

### Purpose

Implement backend APIs and business logic.

### Why We Chose It

- Modular architecture
- Dependency Injection
- Built-in validation
- Scalable project structure
- Strong TypeScript support

### Alternatives Considered

- Express
- Fastify
- Django
- Flask

### Decision

Express provides structure and maintainability for a growing backend.

---

# Runtime

Version 1 also includes a Runtime Engine responsible for:

- Runtime loading
- Model selection
- Provider selection
- Tool loading
- Prompt configuration
- Retrieval configuration

## Technology

Express.js

### Purpose

Execute backend services.

### Why We Chose It

- Excellent ecosystem
- Asynchronous architecture
- Large package ecosystem
- Works naturally with Express

---

# Database

## Technology

PostgreSQL

### Purpose

Store structured application data.

### Why We Chose It

- Reliable
- ACID compliant
- Mature ecosystem
- Excellent indexing
- Supports pgvector

### Alternatives Considered

- MongoDB
- MySQL

### Decision

PostgreSQL supports both relational data and vector search through pgvector.

---

# ORM

## Technology

Drizzle ORM

### Purpose

Access the database safely.

### Why We Chose It

- Type-safe queries
- Schema migrations
- Excellent TypeScript support
- Strong developer experience

### Alternatives Considered

- TypeORM
- Sequelize

---

# Vector Database

## Technology

pgvector

### Purpose

Store embeddings for semantic search.

### Why We Chose It

- Runs inside PostgreSQL
- No additional infrastructure
- Lower operational cost
- Good enough for Version 1

### Alternatives Considered

- Pinecone
- Weaviate
- Qdrant
- ChromaDB

### Decision

pgvector keeps the architecture simpler while meeting Version 1 requirements.

---

# Authentication

## Technology

JWT

### Purpose

Authenticate users securely.

### Why We Chose It

- Stateless
- Widely supported
- Easy frontend integration
- Scalable

---

# AI Integration

## Runtime Components

Version 1 Runtime includes:

- Runtime Loader
- Planner
- Memory Manager
- Retrieval Engine
- Tool Registry
- Tool Runtime
- Tool Executor

## Provider Layer

The Provider Layer abstracts AI providers behind a common interface.

Responsibilities:

- Model selection
- Request formatting
- Streaming responses
- Tool calling
- Provider switching

This allows the rest of the application to remain provider-independent.

## Technology

Provider Abstarction Layer

### Purpose

Provide AI capabilities.

### Initial Providers

- Groq
- OpenAI
- OpenRouter
- Ollama (Local Models)

### Design Principle

The AI provider should be replaceable without affecting business logic.

---

# File Storage

## Version 1

Local Storage

### Future

- Amazon S3
- Cloudflare R2
- Google Cloud Storage

The storage layer should be abstracted to simplify future migration.

---

# Package Manager

## Technology

npm

### Why We Chose It

- Fast
- Disk efficient
- Excellent monorepo support

---

# Containerization

## Technology

Docker

### Purpose

Provide consistent development and deployment environments.

---

# API Documentation

## Technology

Planned for Future Version

Current API testing is performed using Bruno.

### Purpose

Automatically generate interactive API documentation.

---

# Testing Tools

## Unit Testing

Vitest

## End-to-End Testing

Bruno (API Testing)

Manual Integration Testing

### Why

Modern tooling with strong TypeScript support and excellent developer experience.

---

# CI/CD

## Technology

GitHub Actions

### Purpose

Automate:

- Linting
- Testing
- Building
- Deployment

---

# Development Tools

| Tool            | Purpose             |
| --------------- | ------------------- |
| VS Code         | Code editor         |
| Git             | Version control     |
| GitHub          | Repository hosting  |
| Docker Desktop  | Local containers    |
| Postman / Bruno | API testing         |
| Drizzle Studio  | Database inspection |
| Ollama          | Local LLM Runtime   |
| Docker Compose  | Local Development   |

---

# Technology Decision Summary

| Area             | Selected Technology |
| ---------------- | ------------------- |
| Frontend         | React               |
| Language         | TypeScript          |
| Styling          | Tailwind CSS        |
| Backend          | Express             |
| Runtime          | Express.js          |
| Database         | PostgreSQL          |
| ORM              | Drizzle ORM         |
| Vector Search    | pgvector            |
| Authentication   | JWT                 |
| AI Integration   | Provider Layer      |
| Testing          | Vitest + Playwright |
| CI/CD            | GitHub Actions      |
| Containerization | Docker              |
| Package Manager  | npm                 |
| API Testing      | Bruno               |

---

# Future Technology Evolution

Future versions may evaluate:

- Kubernetes
- Redis
- Message Queues
- Elasticsearch
- Dedicated Vector Databases
- Multi-region deployments
- AI Gateway services
- MCP (Model Context Protocol)
- Agent-to-Agent Communication
- Distributed Runtime Workers

Technology should evolve only when required by product growth.

---

# Conclusion

The selected technology stack prioritizes maintainability, scalability, developer experience, and low development cost.

Each technology has been chosen to support the long-term vision of AgentOS while keeping Version 1 practical, production-ready, and accessible for a small engineering team.
