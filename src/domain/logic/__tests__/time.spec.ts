import { describe, it, expect } from 'vitest'
import { getGreetingMessage } from '@/domain/logic/time'

describe('getGreetingMessage', () => {
  it('returns "Good Morning" for morning hours', () => {
    const date = new Date('2025-03-14T08:00:00')
    expect(getGreetingMessage(date)).toBe('Good Morning')
  })

  it('returns "Good Afternoon" for afternoon hours', () => {
    const date = new Date('2025-03-14T14:00:00')
    expect(getGreetingMessage(date)).toBe('Good Afternoon')
  })

  it('returns "Good Evening" for evening hours', () => {
    const date = new Date('2025-03-14T19:00:00')
    expect(getGreetingMessage(date)).toBe('Good Evening')
  })

  it('returns "Good Night" for night hours', () => {
    const date = new Date('2025-03-14T23:00:00')
    expect(getGreetingMessage(date)).toBe('Good Night')
  })

  it('returns "Good Night" for early morning hours', () => {
    const date = new Date('2025-03-14T02:00:00')
    expect(getGreetingMessage(date)).toBe('Good Night')
  })
})
