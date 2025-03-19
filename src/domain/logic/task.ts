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

export function completeTask(task: Task): Task {
  return {
    ...task,
    status: Status.Completed,
    completedAt: new Date(),
  }
}

export function filterTasksCompletedBeforeToday(tasks: Task[]): Task[] {
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)

  return tasks.filter((task) => {
    if (!task.completedAt) return true
    return new Date(task.completedAt).getTime() >= todayStart.getTime()
  })
}
