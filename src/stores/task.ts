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

  const updateTask = (updatedTask: Task) => {
    const index = tasks.value.findIndex((task) => task.id === updatedTask.id)
    tasks.value[index] = updatedTask
  }

  const removeTask = ({ id }: Task) => {
    const index = tasks.value.findIndex((task) => task.id === id)
    tasks.value.splice(index, 1)
  }

  watch(
    tasks,
    (newTasks) => {
      storageService.save('tasks', newTasks)
    },
    { deep: true },
  )

  return { tasks, addTask, updateTask, removeTask }
})
