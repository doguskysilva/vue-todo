import { describe, expect, it } from 'vitest'
import { composeTask, sortTasksByCompleted } from '@/domain/logic/task'
import { Priority, Status } from '@/domain/models/task'
import { generateTask } from '@/test-utils/generators'

describe('createTask', () => {
  it('should create a task', () => {
    const title = 'Do something'
    const task = composeTask(title, Priority.Low)

    expect(task.id).toBeDefined()
    expect(task.title).toBe(title)
    expect(task.status).toBe(Status.Pending)
    expect(task.priority).toBe(Priority.Low)
    expect(task.createdAt).toBeInstanceOf(Date)
    expect(task.completedAt).toBeNull()
  })
})

describe('sortTasksByCompleted', () => {
  it('should sort tasks by completed status', () => {
    const tasks = [
      generateTask({ title: 'Task 1', status: Status.Completed, completedAt: new Date() }),
      generateTask({ title: 'Task 2', status: Status.Pending }),
      generateTask({ title: 'Task 3', status: Status.Completed, completedAt: new Date() }),
    ]

    const sortedTasks = sortTasksByCompleted(tasks)

    expect(sortedTasks[0].title).toBe('Task 2')
    expect(sortedTasks[1].title).toBe('Task 1')
    expect(sortedTasks[2].title).toBe('Task 3')
  })
})
