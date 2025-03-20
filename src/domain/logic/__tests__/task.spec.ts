import { describe, expect, it } from 'vitest'
import {
  composeTask,
  sortTasksByCompleted,
  completeTask,
  filterTasksCompletedBeforeToday,
} from '@/domain/logic/task'
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
      generateTask({
        title: 'Task 1',
        status: Status.Completed,
        completedAt: new Date('2023-01-01'),
      }),
      generateTask({ title: 'Task 2', status: Status.Pending }),
      generateTask({
        title: 'Task 3',
        status: Status.Completed,
        completedAt: new Date('2023-01-02'),
      }),
    ]

    const sortedTasks = sortTasksByCompleted(tasks)

    expect(sortedTasks[0].title).toBe('Task 2')
  })
})

describe('completeTask', () => {
  it('should update the task status to Completed and set completedAt', () => {
    const task = generateTask({ status: Status.Pending, completedAt: null })
    const completed = completeTask(task)

    expect(completed.status).toBe(Status.Completed)
    expect(completed.completedAt).toBeInstanceOf(Date)
  })
})

describe('filterTasksCompletedBeforeToday', () => {
  it('should filter out tasks that were completed before the start of today', () => {
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)

    // Task completed one hour before today (should be filtered out)
    const pastTime = new Date(todayStart.getTime() - 60 * 60 * 1000)
    // Task completed two hours after todayStart (should remain)
    const futureTime = new Date(todayStart.getTime() + 2 * 60 * 60 * 1000)

    const pendingTask = generateTask({
      status: Status.Pending,
      completedAt: null,
      title: 'Pending Task',
    })
    const futureCompletedTask = generateTask({
      title: 'Future Task',
      status: Status.Completed,
      completedAt: futureTime,
    })
    const pastCompletedTask = generateTask({
      title: 'Past Task',
      status: Status.Completed,
      completedAt: pastTime,
    })

    const tasks = [pendingTask, futureCompletedTask, pastCompletedTask]
    const filtered = filterTasksCompletedBeforeToday(tasks)

    expect(filtered).toHaveLength(2)
    expect(filtered).toContainEqual(pendingTask)
    expect(filtered).toContainEqual(futureCompletedTask)
    expect(filtered).not.toContainEqual(pastCompletedTask)
  })
})
