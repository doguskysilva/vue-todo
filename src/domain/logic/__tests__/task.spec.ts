import { describe, expect, it } from 'vitest'
import { composeTask } from '@/domain/logic/task'
import { Priority, Status } from '@/domain/models/task'

describe('createTask', () => {
  it('should create a task', () => {
    const title = 'Do something'
    const task = composeTask(title)

    expect(task.id).toBeDefined()
    expect(task.title).toBe(title)
    expect(task.status).toBe(Status.Pending)
    expect(task.priority).toBe(Priority.Low)
    expect(task.createdAt).toBeInstanceOf(Date)
    expect(task.completedAt).toBeNull()
  })
})
