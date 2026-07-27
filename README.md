<div align="center">

# AgentOS

### Production-Grade AI Operating System for Collaborative AI Agents

Build, orchestrate, and manage intelligent AI agents with persistent memory, Retrieval-Augmented Generation (RAG), tool execution, streaming conversations, and enterprise-grade architecture.

---

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-20+-green)
![Express](https://img.shields.io/badge/Express-5.x-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-green)
![pgvector](https://img.shields.io/badge/pgvector-enabled-red)
![React](https://img.shields.io/badge/React-19-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38BDF8)
![License](https://img.shields.io/badge/License-MIT-green)

</div>

---

# Overview

AgentOS is a production-oriented AI Operating System designed to run intelligent AI agents with persistent memory, semantic retrieval, tool execution, streaming responses, and modular orchestration.

Unlike simple chatbot applications, AgentOS provides the backend infrastructure required to build real AI products.

It combines:

- AI Agent Runtime
- Long-term Memory
- Semantic Search (RAG)
- Tool Calling
- Knowledge Base
- Conversation Management
- Multi-Provider LLM Support
- Production Architecture

The project follows scalable software engineering principles inspired by modern AI systems used in production.

---

# Why AgentOS?

Modern AI applications require much more than calling an LLM API.

Production AI systems need:

- Agent orchestration
- Persistent memory
- Context retrieval
- Tool execution
- Multi-provider support
- Conversation history
- Knowledge management
- Streaming responses
- Modular architecture

AgentOS brings these capabilities together into one extensible platform.

---

# Key Features

## AI Runtime

- AI Agent Runtime
- Runtime Loader
- Agent Configuration
- Model Management
- Provider Management
- Environment Management

---

## Authentication & Organization

- JWT Authentication
- User Management
- Organizations
- Projects
- Environments

---

## Conversation System

- Chat API
- Conversation History
- Streaming Responses (SSE)
- Context Window Management

---

## Memory System

- Long-term Memory
- Conversation Memory
- Memory Retrieval
- Memory Manager
- Context Injection

---

## Retrieval-Augmented Generation (RAG)

- Knowledge Base
- Document Management
- Chunk Storage
- Embedding Generation
- Semantic Retrieval
- Vector Search using pgvector

---

## Tool Calling

- Tool Registry
- Tool Runtime
- Dynamic Tool Loading
- Tool Executor
- Built-in Tools

Example tools:

- Calculator
- Date & Time

Designed for easy extension with custom tools.

---

## AI Providers

Current support:

- Groq
- Jina Embeddings

Provider architecture allows easy addition of:

- OpenAI
- Anthropic
- Google Gemini
- Ollama
- Azure OpenAI

---

## AI Planning

- Planner
- Tool Selection
- Orchestration Pipeline
- Runtime Context Assembly

---

## Backend Architecture

- Layered Architecture
- Service Layer
- Repository Pattern
- Dependency Injection Style
- Modular Components
- Scalable Folder Structure

---

# Technology Stack

## Backend

- TypeScript
- Node.js
- Express.js
- PostgreSQL
- Drizzle ORM
- pgvector
- JWT Authentication
- Zod Validation
- Pino Logger

---

## AI Stack

- Groq API
- Jina Embeddings
- RAG
- Vector Search
- Tool Calling
- Streaming Responses

---

## Frontend

- React
- Vite
- Tailwind CSS
- TypeScript

---

## DevOps

- GitHub
- Husky
- ESLint
- Prettier

---

# Project Architecture

```
AgentOS

├── Authentication
├── Organizations
├── Projects
├── Environments
├── Providers
├── Models
├── Agents
├── Conversations
├── Runtime
├── Planner
├── Orchestrator
├── Memory
├── Retrieval
├── Knowledge Base
├── Documents
├── Embeddings
├── Tool Runtime
├── Streaming
└── API Layer
```

---

# Implemented Modules

| Module | Status |
|---------|--------|
| Authentication | ✅ |
| Users | ✅ |
| Organizations | ✅ |
| Projects | ✅ |
| Environments | ✅ |
| AI Providers | ✅ |
| Models | ✅ |
| Agents | ✅ |
| Runtime Loader | ✅ |
| Conversations | ✅ |
| Streaming Chat | ✅ |
| Memory Manager | ✅ |
| Retrieval | ✅ |
| Knowledge Base | ✅ |
| Documents | ✅ |
| Embeddings | ✅ |
| Vector Search | ✅ |
| Tool Runtime | ✅ |
| Tool Registry | ✅ |
| Tool Executor | ✅ |
| Planner | ✅ |
| Orchestrator | ✅ |

---

# API Highlights

REST APIs include:

- Authentication
- Users
- Organizations
- Projects
- Environments
- Providers
- Models
- Agents
- Conversations
- Chat
- Streaming Chat
- Documents
- Knowledge Base
- Embeddings

---

# Repository Structure

```
AgentOS

apps/
    api/
    web/

docs/

packages/

```

---

# Running Locally

## Clone

```bash
git clone https://github.com/Ajayreddy18/AgentOS.git

cd AgentOS
```

---

## Install

```bash
npm install
```

---

## Configure Environment

Create:

```
apps/api/.env
```

Example:

```
DATABASE_URL=

JWT_SECRET=

GROQ_API_KEY=

JINA_API_KEY=
```

---

## Run Backend

```bash
cd apps/api

npm run dev
```

---

## Run Frontend

```bash
cd apps/web

npm run dev
```

---

# Engineering Principles

This project emphasizes:

- Clean Architecture
- Modular Design
- SOLID Principles
- Separation of Concerns
- Type Safety
- Production Readiness
- Scalability
- Maintainability

---

# Future Roadmap

- Multi-Agent Collaboration
- Background Agent Jobs
- Agent Marketplace
- Workflow Builder
- Observability Dashboard
- Runtime Inspector
- Docker Deployment
- Kubernetes Deployment
- OAuth Authentication
- Multi-LLM Routing
- Human-in-the-Loop Approval
- Plugin SDK
- Monitoring & Metrics

---

# Learning Outcomes

Building AgentOS involved implementing concepts including:

- AI Agent Systems
- Retrieval-Augmented Generation (RAG)
- Vector Databases
- Embedding Pipelines
- Tool Calling
- Streaming APIs
- Semantic Search
- REST API Design
- Authentication
- PostgreSQL
- TypeScript Backend Architecture
- Clean Software Engineering Practices

---

# Author

**Ajay Reddy**

AI Engineer | Backend Engineer | Generative AI

GitHub:
https://github.com/Ajayreddy18

LinkedIn:
https://www.linkedin.com/in/ajayreddyofficial

Email:
najayreddy2424@gmail.com

---

If you found this project interesting, consider giving it a ⭐.
