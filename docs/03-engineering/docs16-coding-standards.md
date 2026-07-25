# AgentOS – Coding Standards

Version: 1.0

Status: Version 1.0

Owner: Ajay Reddy

Last Updated: July 2026

---

# Document Purpose

This document defines the coding standards for AgentOS Version 1.

It establishes consistent practices for writing, organizing, reviewing, and maintaining code across the frontend, backend, shared packages, and AI components.

The goal is to improve readability, maintainability, reliability, and long-term scalability.

---

# Coding Principles

Every piece of code should strive to be:

- Simple
- Readable
- Modular
- Testable
- Reusable
- Predictable
- Well documented

Code should optimize for clarity before cleverness.

# Architecture Rules

The codebase follows a layered architecture.

Allowed dependency flow:

Controllers
↓

Services
↓

Domain Logic

↓

Repositories

↓

Database

Rules:

- Controllers must never access the database directly.
- Business logic belongs in services.
- Services should depend on abstractions rather than implementations where practical.
- Avoid circular dependencies.
- Shared packages must remain framework-independent.

---

# General Standards

- Use TypeScript throughout the project.
- Prefer composition over inheritance.
- Avoid duplicated logic.
- Keep functions focused on a single responsibility.
- Avoid unnecessary abstractions.
- Remove dead code.
- Do not commit commented-out code.
- Keep imports organized.

---

# File Naming

Use lowercase with descriptive names.

Backend Examples

```
auth.service.ts
memory.controller.ts
project.module.ts
```

Frontend Components

```
ProjectCard.tsx
AgentSidebar.tsx
ChatWindow.tsx
```

Hooks

```
useProjects.ts
useConversation.ts
```

Utilities

```
date-utils.ts
validation.ts
```

---

# Folder Naming

Use:

- lowercase
- kebab-case where appropriate

Examples

```
project-management/
file-storage/
agent-orchestrator/
```

---

# Variable Naming

Use meaningful names.

Good

```ts
projectId;
conversationHistory;
retrievedDocuments;
memorySummary;
```

Avoid

```ts
a;
temp;
data1;
obj;
```

Boolean variables should read naturally.

Good

```ts
isAuthenticated;
hasPermission;
canUploadFiles;
```

---

# Function Naming

Functions should describe an action.

Examples

```ts
createProject();
deleteConversation();
retrieveMemory();
generateDocumentation();
```

Avoid vague names.

```ts
process();
handle();
run();
```

unless additional context makes the purpose obvious.

---

# Class Naming

Use PascalCase.

Examples

```ts
ProjectService;
MemoryManager;
AgentOrchestrator;
```

---

# Constants

Use UPPER_SNAKE_CASE.

Examples

```ts
MAX_FILE_SIZE;
DEFAULT_PAGE_SIZE;
JWT_EXPIRATION_TIME;
```

---

# TypeScript Standards

Always:

- Use explicit types where helpful.
- Prefer interfaces for object contracts.
- Use enums only when appropriate.
- Avoid the `any` type.
- Use `unknown` when the type is uncertain.
- Enable strict mode.

Example

```ts
interface Project {
  id: string;
  name: string;
}
```

# SOLID Principles

The codebase should follow SOLID principles where appropriate.

- Single Responsibility Principle
- Open/Closed Principle
- Liskov Substitution Principle
- Interface Segregation Principle
- Dependency Inversion Principle

These principles should improve maintainability without introducing unnecessary abstraction.
---

# React Standards

Components should:

- Have a single responsibility.
- Remain small and focused.
- Receive data through props.
- Minimize internal state.
- Extract reusable logic into custom hooks.

Prefer functional components.

Example

```tsx
function ProjectCard() {
    ...
}
```

# Clean Code Guidelines

Prefer:

- Small functions
- Early returns
- Guard clauses
- Descriptive variable names
- Immutable data where practical

Avoid:

- Deep nesting
- Long parameter lists
- God classes
- Large files
- Hidden side effects

---

# State Management

Use:

- Local state for UI-specific interactions.
- Global state only when shared across multiple pages.
- Server state should remain synchronized with the backend.

Avoid unnecessary global state.

---

# Backend Standards

Each Express.js module should contain:

```
controller/
service/
dto/
repository/
schemas/
validators/
types/
tests/
```

Business logic belongs in services.

Controllers should remain lightweight.

---

# API Standards

REST principles should be followed.

Examples

```
GET /projects
POST /projects
PUT /projects/:id
DELETE /projects/:id
```

Responses should be consistent.

Example

```json
{
  "success": true,
  "data": {},
  "message": "Project created successfully."
}
```

---

# API Design Rules

Every endpoint should:

- Validate requests.
- Return typed responses.
- Follow REST conventions.
- Support pagination where appropriate.
- Support filtering.
- Return meaningful HTTP status codes.
- Avoid breaking changes.

---

# Database Standards

- Use descriptive table names.
- Use foreign keys.
- Use indexes where appropriate.
- Avoid duplicate data.
- Keep migrations version controlled.

---

# AI Agent Standards

Every AI agent should:

- Have one responsibility.
- Use structured prompts.
- Produce deterministic outputs where practical.
- Never access persistence directly.
- Use shared interfaces.
- Return structured responses.
- Log execution metadata.

# Error Handling

Never ignore errors.

Use centralized error handling.

Errors should:

- Be logged.
- Return meaningful messages.
- Avoid exposing internal implementation details.

---

# Logging Standards

Log:

- Authentication events
- AI execution
- File uploads
- Memory updates
- Errors

Do not log:

- Passwords
- API keys
- Tokens
- Sensitive user data

---

# Logging Levels

Use structured logging.

Levels:

- DEBUG
- INFO
- WARN
- ERROR

Logs should include:

- Request ID
- User ID (when available)
- Execution time
- Module name

---

# Error Handling Standards

Errors should be:

- Typed
- Logged
- Actionable
- User-friendly

Avoid generic Error objects.

Prefer domain-specific exceptions.

---

# Database Query Standards

Prefer:

- Indexed queries
- Transactions where necessary
- Pagination
- Bulk operations
- Optimistic updates

Avoid:

- N+1 queries
- Full table scans
- Duplicate queries

---

# Performance Guidelines

Optimize:

- Database queries
- AI context size
- Streaming responses
- Memory retrieval
- File processing

Avoid premature optimization.

Profile before optimizing.

---

# Secure Coding Practices

Always:

- Validate inputs
- Escape outputs
- Use parameterized queries
- Protect secrets
- Verify authorization
- Sanitize uploaded files

Never trust client input.

---

# Documentation Standards

Every module should include:

- Purpose
- Responsibilities
- Dependencies
- Public APIs
- Sequence diagrams when helpful
- Examples where appropriate

---

# Git Workflow

Use:

main
develop
feature/*
fix/*
docs/*
refactor/*

---

# Pull Request Standards

Every PR should include:

- Summary
- Related issue
- Testing performed
- Documentation updates
- Screenshots (UI changes)

---

# Monorepo Standards

Shared packages should:

- Avoid application-specific logic.
- Export stable interfaces.
- Remain independently testable.
- Minimize cross-package dependencies.

---

# Definition of Ready

Before implementation:

- Requirements approved
- APIs defined
- Database changes reviewed
- Acceptance criteria written
- Dependencies identified

---

# AI Code Review Checklist

Review:

- Prompt quality
- Memory updates
- Retrieval accuracy
- Tool usage
- Token efficiency
- Context size
- Hallucination risks

---

# Complexity Guidelines

Prefer:

- Functions under 40 lines.
- Files under 500 lines.
- Classes with one responsibility.
- Maximum nesting depth of 3.

---

# Dependency Injection

Prefer dependency injection over manual instantiation.

Avoid creating services using:

new Service()

within business logic.

---

# Async Programming Standards

Use:

- async/await
- Proper error handling
- Timeouts where appropriate
- Cancellation support for long-running operations

Avoid unhandled promises.

---

# Streaming Standards

Streaming endpoints should:

- Flush responses incrementally.
- Handle client disconnects gracefully.
- Support cancellation.
- Emit structured events.
- Record execution metadata.

---

# AI Prompt Standards

Prompt templates should:

- Be version controlled.
- Be stored outside application logic.
- Include clear instructions.
- Produce deterministic outputs where practical.

Avoid embedding large prompts directly inside services.

---

# Prompt Engineering Standards

Prompts should:

- Be stored separately from business logic.
- Have version numbers.
- Use reusable templates.
- Specify expected output format.
- Minimize ambiguity.
- Avoid unnecessary verbosity.

---

# Tool Development Standards

Every tool should:

- Declare an input schema.
- Validate inputs.
- Return structured outputs.
- Be independently testable.
- Remain stateless.
- Avoid direct database access.

---

# Documentation Standards

Every major module should include:

- Purpose
- Responsibilities
- Dependencies
- Public interfaces

Public APIs should include descriptive comments where necessary.

---

# Comments

Write comments only when they explain:

- Why something exists.
- Important business rules.
- Complex algorithms.

Avoid comments that simply restate the code.

Good

```ts
// Preserve chronological ordering for memory retrieval.
```

Avoid

```ts
// Increment counter
counter++;
```

---

# Testing Standards

New features should include:

- Unit tests
- Integration tests (where applicable)
- Updated documentation

Critical business logic should never be merged without testing.

---

# Dependency Management

Before adding a dependency:

- Evaluate necessity.
- Prefer existing libraries already in use.
- Check maintenance status.
- Verify license compatibility.

Avoid unnecessary dependencies.

---

# Performance Standards

Prefer:

- Efficient database queries.
- Lazy loading where appropriate.
- Memoization when beneficial.
- Pagination for large datasets.

Avoid premature optimization.

---

# Accessibility Standards

Frontend interfaces should:

- Support keyboard navigation.
- Use semantic HTML.
- Include accessible labels.
- Maintain sufficient color contrast.

Accessibility should be considered from the beginning.

---

# Security Standards

Always:

- Validate inputs.
- Sanitize user data.
- Authorize every protected request.
- Store secrets securely.
- Avoid exposing sensitive information.

Security should never be optional.

---

# Git Commit Standards

Commit messages should be clear.

Examples

```
feat: add project creation API

fix: resolve memory retrieval bug

docs: update deployment guide

refactor: simplify agent orchestration
```

Avoid generic messages.

```
update

changes

fix
```

---

# Memory Standards

Memory updates should:

- Avoid duplicate entries.
- Generate concise summaries.
- Preserve source references.
- Store structured metadata.
- Trigger embedding generation when required.

---

# Retrieval Standards

Retrieval should:

- Prefer semantic relevance.
- Apply metadata filtering.
- Remove duplicate chunks.
- Limit context size.
- Preserve source attribution.

---

# Code Review Checklist

Before merging:

- Code builds successfully.
- Tests pass.
- No linting errors.
- Naming conventions followed.
- Documentation updated.
- Security reviewed.
- No unnecessary complexity.
- No duplicated logic.

---

# Definition of Done

A feature is complete only when:

- Code implemented
- Tests passing
- Documentation updated
- Code reviewed
- Security considered
- Performance acceptable
- No known critical bugs

---

# Future Improvements

As AgentOS grows, coding standards may expand to include:

- Performance budgets
- AI prompt evaluation rules
- Multi-package versioning
- Plugin development guidelines
- Public SDK standards

---

# Conclusion

Consistent coding standards improve software quality, simplify maintenance, and make collaboration easier.

Following these standards ensures that AgentOS remains clean, scalable, and understandable throughout its development lifecycle.
