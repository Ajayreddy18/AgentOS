# AgentOS – Contributing Guide

Version: 1.0

Status: Draft

Owner: Ajay Reddy

Last Updated: July 2026

---

# Welcome

Thank you for your interest in contributing to AgentOS.

This guide explains how to set up the project, follow the development workflow, maintain code quality, and submit contributions.

Our goal is to keep the codebase consistent, maintainable, and production-ready.

---

# Core Principles

Every contribution should:

- Improve the project.
- Maintain code quality.
- Follow established architecture.
- Include appropriate tests.
- Keep documentation up to date.
- Be reviewed before merging.

---

# Development Workflow

The standard workflow is:

```

Fork Repository

↓

Clone Repository

↓

Create Feature Branch

↓

Implement Changes

↓

Run Tests

↓

Update Documentation

↓

Commit Changes

↓

Open Pull Request

↓

Code Review

↓

Merge

```

---

# Development Setup

Before contributing, install:

- Node.js (LTS)
- npm
- Git
- Docker Desktop
- PostgreSQL (or Docker)
- Redis (or Docker)

---

# Project Setup

Example:

```
git clone <repository-url>

cd agentos

npm install

cp .env.example .env.development

docker compose up -d

npm run dev
```

---

# Branch Naming

Use descriptive branch names.

Examples:

```
feature/project-dashboard

feature/chat-streaming

feature/rag-service

fix/login-validation

fix/file-upload

docs/api-design

refactor/auth-module
```

---

# Commit Message Convention

Follow Conventional Commits.

Examples:

```
feat: add project dashboard

feat: implement memory retrieval

fix: resolve JWT validation bug

docs: update API documentation

refactor: simplify agent orchestration

test: add authentication tests

chore: update dependencies
```

---

# Pull Request Guidelines

Each pull request should:

- Focus on one feature or fix.
- Include tests where applicable.
- Update documentation if behavior changes.
- Pass all automated checks.

Avoid large unrelated changes.

---

# Code Style

All code should follow:

- TypeScript strict mode
- ESLint rules
- Prettier formatting
- Project coding standards

Avoid unnecessary complexity.

---

# Testing Requirements

Contributors should run:

```
npm test

npm run lint

npm run typecheck
```

All checks should pass before submitting a pull request.

---

# Documentation Requirements

Documentation should be updated when:

- New APIs are added.
- Architecture changes.
- New features are introduced.
- Configuration changes.
- Dependencies change.

Documentation is considered part of the implementation.

---

# Issue Reporting

Bug reports should include:

- Description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment information

---

# Feature Requests

Feature requests should explain:

- Problem
- Proposed solution
- Alternatives considered
- Expected benefits

Requests should align with the product vision.

---

# Code Review Checklist

Reviewers should verify:

- Correctness
- Readability
- Maintainability
- Performance
- Security
- Test coverage
- Documentation updates

Constructive feedback is encouraged.

---

# Security Issues

Do not publicly disclose security vulnerabilities.

Report them privately to the maintainers.

Security issues should include:

- Description
- Reproduction steps
- Potential impact
- Suggested mitigation

---

# Dependency Management

Before adding a dependency:

- Check if an existing solution already exists.
- Evaluate maintenance status.
- Review TypeScript support.
- Assess bundle size impact.
- Document the reason for adding it.

---

# Coding Principles

Prefer:

- Small functions
- Clear naming
- Reusable components
- Explicit typing
- Composition over duplication

Avoid:

- Dead code
- Large files
- Deep nesting
- Magic values
- Unnecessary abstractions

---

# Pull Request Template

Each pull request should answer:

- What problem does this solve?
- What changes were made?
- How was it tested?
- Does documentation need updating?
- Are there any breaking changes?

---

# Definition of Done

A task is complete when:

- Implementation is finished.
- Tests pass.
- Documentation is updated.
- Code review feedback is addressed.
- No known blocking issues remain.

---

# Community Standards

Contributors should:

- Be respectful.
- Communicate professionally.
- Welcome constructive feedback.
- Help improve documentation.
- Support new contributors.

---

# Future Contribution Areas

Future contributors may help with:

- AI agents
- Frontend features
- Backend services
- Documentation
- Testing
- Performance optimization
- Accessibility
- Internationalization

---

# Conclusion

Following this contribution guide helps maintain a high-quality, production-ready codebase while ensuring that AgentOS remains approachable for both current and future contributors.
