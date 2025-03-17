import { describe, it, expect } from 'vitest'
import { generateTask, generateUser, generateMany, generateEntities } from './generators'
import type { Task } from '@/domain/models/task'
import type { User } from '@/domain/models/User'

describe('generateTask', () => {
  it('generates a task with default values', () => {
    const task = generateTask()
    expect(task.title).toBe('Test Task')
  })

  it('generates a task with overridden values', () => {
    const task = generateTask({ title: 'Overridden Task' })
    expect(task.title).toBe('Overridden Task')
  })
})

describe('generateUser', () => {
  it('generates a user with default values', () => {
    const user = generateUser()
    expect(user.name).toBe('John Doe')
  })

  it('generates a user with overridden values', () => {
    const user = generateUser({ name: 'Jane Doe' })
    expect(user.name).toBe('Jane Doe')
  })
})

describe('generateMany', () => {
  it('generates many tasks', () => {
    const tasks = generateMany<Task>(3, generateTask)
    expect(tasks).toHaveLength(3)
    tasks.forEach((task) => {
      expect(task.title).toBe('Test Task')
    })
  })

  it('generates many users', () => {
    const users = generateMany<User>(3, generateUser)
    expect(users).toHaveLength(3)
    users.forEach((user) => {
      expect(user.name).toBe('John Doe')
    })
  })
})

describe('generateEntities', () => {
  it('generates many tasks with overridden values', () => {
    const tasks = generateEntities<Task>(3, 'Task', { title: 'Overridden Task' })
    expect(tasks).toHaveLength(3)
    tasks.forEach((task) => {
      expect(task.title).toBe('Overridden Task')
    })
  })

  it('generates many users with overridden values', () => {
    const users = generateEntities<User>(3, 'User', { name: 'Jane Doe' })
    expect(users).toHaveLength(3)
    users.forEach((user) => {
      expect(user.name).toBe('Jane Doe')
    })
  })
})
