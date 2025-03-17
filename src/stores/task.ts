import type { Task } from '@/domain/models/task'
import { LocalStorageService } from '@/services/storageService'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const storageService = new LocalStorageService()

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>(storageService.load<Task[]>('tasks') || [])

  const addTask = (newTask: Task) => {
    tasks.value.push(newTask)
  }

  watch(
    tasks,
    (newTasks) => {
      storageService.save('tasks', newTasks)
    },
    { deep: true },
  )

  return { tasks, addTask }
})
