---
name: backend-architecture
description: Designs scalable and maintainable backend systems using layered architecture and separation of concerns. Use when setting up or refactoring backend projects.
---

# Backend Architecture Skill

## When to use this skill

- When starting a new backend project
- When restructuring an existing codebase
- When improving maintainability and scalability

## How to use it

### Architecture Pattern

Use layered architecture:

- Routes → Controllers → Services → Repository/Data Layer

### Responsibilities

- **Routes**
  - Define endpoints
  - Map to controllers
  - No logic

- **Controllers**
  - Handle HTTP request/response
  - Call services
  - No business logic

- **Services**
  - Contain business logic
  - Coordinate operations
  - Call repositories or external services

- **Repository/Data Layer**
  - Handle database interactions
  - No business logic

### Folder Structure

Use modular structure:

src/
- controllers/
- services/
- repositories/ (or models/)
- routes/
- config/
- utils/

### Design Principles

- Separation of concerns
- Single responsibility per layer
- Dependency flows downward only
- Keep modules loosely coupled

## Rules

- Controllers must be thin
- Services must be reusable
- Avoid circular dependencies
- Use TypeScript types/interfaces

## Anti-patterns

- Business logic in controllers
- Monolithic files
- Tight coupling between modules