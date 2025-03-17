import { Priority, Status, type Task } from '@/domain/models/task'

export function composeTask(title: string): Task {
  return {
    id: Math.random().toString(36).substr(2, 9),
    title: title,
    status: Status.Pending,
    priority: Priority.Low,
    createdAt: new Date(),
    completedAt: null,
  }
}
