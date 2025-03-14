import { describe, it, expect } from 'vitest'
import { createUser } from '@/domain/logic/user'

describe('createUser', () => {
  it('should create a user', () => {
    const name = 'Douglas Silva'
    const user = createUser(name)

    expect(user.name).toBe(name)
    expect(user.id).toBeDefined()
  })
})
