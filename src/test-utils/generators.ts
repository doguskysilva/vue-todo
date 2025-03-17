import { composeTask } from '@/domain/logic/task'
import { createUser } from '@/domain/logic/user'
import type { Task } from '@/domain/models/task'
import type { User } from '@/domain/models/User'

type Entity = User | Task

export function generateTask(overrides?: Partial<Task>): Task {
  return {
    ...composeTask('Test Task'),
    ...overrides,
  }
}

export function generateUser(overrides?: Partial<User>): User {
  return {
    ...createUser('John Doe'),
    ...overrides,
  }
}

export function generateMany<T>(count: number, generator: () => T): T[] {
  return Array.from({ length: count }, generator)
}

export function generateEntities<T extends Entity>(
  count: number,
  type: 'Task' | 'User',
  overrides?: Partial<T>,
): T[] {
  let generator: (overrides?: Partial<T>) => T

  if (type === 'Task') {
    generator = generateTask as (overrides?: Partial<T>) => T
  } else if (type === 'User') {
    generator = generateUser as (overrides?: Partial<T>) => T
  } else {
    throw new Error('Unknown entity type')
  }

  return generateMany(count, () => generator(overrides))
}
