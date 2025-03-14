import type { User } from '../models/User'

export function createUser(name: string): User {
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: name,
  }
}
