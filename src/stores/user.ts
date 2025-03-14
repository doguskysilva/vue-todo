import type { User } from '@/domain/models/User'
import { LocalStorageService } from '@/services/storageService'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const storageService = new LocalStorageService()

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(storageService.load<User>('user'))

  const setUser = (newUser: User) => {
    user.value = newUser
  }

  watch(
    user,
    (newUser) => {
      storageService.save('user', newUser)
    },
    { deep: true },
  )

  return { user, setUser }
})
