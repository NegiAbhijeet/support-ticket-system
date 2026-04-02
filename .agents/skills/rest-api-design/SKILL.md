---
name: rest-api-design
description: Builds RESTful APIs with proper conventions, status codes, and consistent request/response patterns. Use when creating or improving backend endpoints.
---

# REST API Design Skill

## When to use this skill

- When designing API endpoints
- When improving API consistency
- When handling HTTP communication

## How to use it

### REST Principles

- Use resource-based URLs
- Use proper HTTP methods:
  - GET → read
  - POST → create
  - PUT/PATCH → update
  - DELETE → remove

### Status Codes

- 200 → success
- 201 → created
- 400 → bad request
- 404 → not found
- 500 → server error

### Response Format

Maintain consistent structure:

{
  "success": boolean,
  "data": any,
  "error": string | null
}

### Error Handling

- Use centralized error middleware
- Return meaningful error messages
- Avoid exposing internal details

### API Design Guidelines

- Keep endpoints predictable
- Use plural resource names
- Use query params for filtering

## Rules

- Do not mix business logic in routes
- Always validate inputs before processing
- Always return structured responses

## Anti-patterns

- Inconsistent response formats
- Missing status codes
- Overloading endpoints