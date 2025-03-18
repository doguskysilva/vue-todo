import { Priority, Status, type Task } from '@/domain/models/task'

export function composeTask(title: string, priority: Priority): Task {
  return {
    id: Math.random().toString(36).substr(2, 9),
    title: title,
    status: Status.Pending,
    priority: priority,
    createdAt: new Date(),
    completedAt: null,
  }
}

export function sortTasksByCompleted(tasks: Task[]): Task[] {
  return tasks.sort((a, b) => {
    if (a.completedAt && !b.completedAt) {
      return 1
    }
    if (!a.completedAt && b.completedAt) {
      return -1
    }
    return 0
  })
}
