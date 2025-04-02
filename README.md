# Vue Todo App

A Todo application built with Vue 3, TypeScript, and Pinia for state management. The application follows a lightweight DDD (Domain-Driven Design) approach.

## Project Structure

src/
├── components/ # Vue components
├── domain/ # Domain logic and models
│ ├── logic/ # Business logic
│ └── models/ # TypeScript interfaces and types
├── services/ # Application services
├── stores/ # Pinia stores
└── test-utils/ # Testing utilities

## Key Features

- Task management with priority levels
- Local storage persistence
- Dark mode support
- User management
- Task filtering and sorting

## Technical Details

### Domain Models

The application uses TypeScript interfaces to define its domain models:

```typescript
interface Task {
  id: string
  title: string
  status: Status
  priority: Priority
  createdAt: Date // Stored as Date object
  completedAt: Date | null
}
```
