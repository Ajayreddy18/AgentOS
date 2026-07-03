# AgentOS – Git Workflow

Version: 1.0

Status: Draft

Owner: Ajay Reddy

Last Updated: July 2026

---

# Document Purpose

This document defines the Git workflow for AgentOS Version 1.

It establishes consistent practices for branching, committing, reviewing, merging, releasing, and maintaining repository history.

The goal is to ensure a clean, traceable, and maintainable development process.

---

# Git Workflow Goals

The workflow should:

- Keep commit history clean.
- Support parallel feature development.
- Simplify code reviews.
- Enable safe releases.
- Make rollbacks easier.
- Maintain repository quality.

---

# Branching Strategy

Version 1 uses a simplified Git Flow.

```
main
│
├── develop
│
├── feature/*
│
├── bugfix/*
│
├── hotfix/*
│
└── release/*
```

---

# Branch Purpose

## main

- Production-ready code only.
- Always deployable.
- Protected branch.

---

## develop

- Integration branch.
- Completed features are merged here.
- Basis for future releases.

---

## feature/*

Used for new functionality.

Examples

```
feature/authentication

feature/project-dashboard

feature/memory-manager

feature/rag-pipeline
```

---

## bugfix/*

Used to fix issues discovered during development.

Examples

```
bugfix/login-validation

bugfix/file-upload
```

---

## hotfix/*

Used to fix critical production issues.

Examples

```
hotfix/jwt-expiration

hotfix/database-timeout
```

Hotfixes should be merged into both:

- main
- develop

---

## release/*

Prepared before production deployment.

Examples

```
release/v1.0.0

release/v1.1.0
```

Only stabilization work should occur in release branches.

---

# Branch Naming Conventions

Use:

```
feature/project-chat

feature/agent-planner

bugfix/api-timeout

hotfix/auth-token

release/v1.0.0
```

Branch names should:

- Be lowercase.
- Use kebab-case.
- Clearly describe the purpose.

---

# Commit Message Format

Use the Conventional Commits specification.

Examples

```
feat: add project creation API

feat: implement planner agent

fix: resolve JWT validation issue

docs: update API documentation

refactor: simplify memory retrieval

test: add authentication unit tests

style: format backend modules

chore: update dependencies
```

---

# Commit Guidelines

Commits should:

- Represent a single logical change.
- Build successfully.
- Pass linting.
- Avoid unrelated modifications.

Avoid large "everything" commits.

---

# Pull Request Workflow

Every Pull Request should include:

- Clear title
- Summary of changes
- Testing performed
- Related issue (if applicable)
- Updated documentation (if required)

---

# Pull Request Checklist

Before merging:

- Code builds successfully.
- Tests pass.
- Linting passes.
- Documentation updated.
- Security considered.
- No merge conflicts.
- Code reviewed.

---

# Code Review Guidelines

Reviewers should verify:

- Correctness
- Readability
- Simplicity
- Security
- Performance
- Test coverage
- Documentation

Feedback should focus on improving the code rather than criticizing the developer.

---

# Merge Strategy

Use:

```
Squash and Merge
```

Benefits

- Cleaner history.
- Easier rollback.
- One commit per feature.

Avoid unnecessary merge commits.

---

# Versioning Strategy

Use Semantic Versioning.

```
MAJOR.MINOR.PATCH
```

Examples

```
1.0.0

1.1.0

1.2.3

2.0.0
```

---

# Release Process

```
Feature Complete

↓

Create Release Branch

↓

Testing

↓

Bug Fixes

↓

Documentation Review

↓

Merge into main

↓

Tag Release

↓

Deploy

↓

Merge back into develop
```

---

# Git Tags

Every production release should be tagged.

Examples

```
v1.0.0

v1.1.0

v1.2.0
```

Tags provide a permanent reference to released versions.

---

# Repository Protection

Protect the following branches:

- main
- develop

Recommended protections:

- Prevent force pushes.
- Require successful CI checks.
- Require pull requests.
- Require review before merge.

---

# Large Files

Do not commit:

- Build outputs
- Temporary files
- Database dumps
- Environment files
- AI model binaries
- Generated logs

Use `.gitignore` appropriately.

---

# Git Ignore

Typical ignored files include:

```
node_modules/
dist/
build/
coverage/
.env
.env.local
*.log
```

The `.gitignore` file should be maintained as the project evolves.

---

# Release Notes

Each release should document:

- New features
- Bug fixes
- Improvements
- Breaking changes
- Known issues

Release notes improve communication with users and contributors.

---

# Rollback Strategy

If a deployment fails:

- Identify the issue.
- Revert to the previous stable release.
- Create a hotfix branch.
- Verify the fix.
- Redeploy.

Rollbacks should be quick and well documented.

---

# Dependency Updates

Dependency upgrades should:

- Be reviewed.
- Pass automated testing.
- Include release notes if significant.
- Avoid unnecessary version changes.

---

# Repository Maintenance

Regularly:

- Remove stale branches.
- Update documentation.
- Archive completed milestones.
- Review open issues.
- Keep dependencies current.

---

# GitHub Configuration

The repository should include:

- README.md
- LICENSE
- CONTRIBUTING.md
- CODE_OF_CONDUCT.md (future)
- Pull Request Template
- Issue Templates
- GitHub Actions workflows

---

# Future Workflow Enhancements

Future versions may include:

- Automated release generation
- Changelog automation
- Signed commits
- Protected environments
- Release approval workflows
- Multi-maintainer review policies

---

# Conclusion

A disciplined Git workflow keeps the AgentOS repository organized, traceable, and production-ready.

By following consistent branching, commit, review, and release practices, the project can grow without sacrificing maintainability or development quality.
