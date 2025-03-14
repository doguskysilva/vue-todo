import type { User } from '@/domain/models/User'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const setUser = (newUser: User) => {
    user.value = newUser
  }

  return { user, setUser }
})
