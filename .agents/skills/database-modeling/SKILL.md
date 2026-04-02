---
name: database-modeling
description: Designs efficient and scalable database schemas for SQL and NoSQL systems. Use when defining or modifying data structures.
---

# Database Modeling Skill

## When to use this skill

- When designing schemas
- When storing application data
- When optimizing database structure

## How to use it

### Schema Design Principles

- Keep schema simple and clear
- Avoid unnecessary complexity
- Design for current needs, allow future extension

### Data Modeling

- Identify entities and relationships
- Use appropriate data types
- Normalize when needed (SQL)
- Denormalize when beneficial (NoSQL)

### Validation

- Enforce required fields
- Apply basic constraints
- Avoid over-validation for flexible fields

### Performance Considerations

- Use indexing for frequently queried fields
- Avoid deeply nested structures (for NoSQL)
- Optimize read vs write patterns

### Scalability

- Design schemas that can evolve
- Avoid hard dependencies between models

## Rules

- No business logic in schema/model
- Keep models reusable
- Maintain consistency across entities

## Anti-patterns

- Over-engineered schemas
- Poor naming conventions
- Ignoring indexing