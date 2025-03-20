<script setup lang="ts">
import { Priority } from '@/domain/models/task'
import { ref } from 'vue'

const emit = defineEmits(['create'])
const priorities = Object.values(Priority)
const errorMessage = ref('')

const task = ref('')
const priority = ref(priorities[0])

const setPriority = (newPriority: Priority) => {
  priority.value = newPriority
}

const handleCreateTask = () => {
  if (!task.value.trim()) {
    errorMessage.value = 'Task title is required'
    return
  }
  emit('create', { title: task.value, priority: priority.value })
  task.value = ''
  errorMessage.value = ''
}
</script>

<template>
  <div>
    <div class="flex space-x-2">
      <input type="text" placeholder="Add a task" v-model="task" @keyup.enter="handleCreateTask"
        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
    </div>
    <div class="grid grid-cols-3 gap-0 w-full mt-2 rounded-lg overflow-hidden" role="group">
      <button v-for="(p, index) in priorities" :key="p" @click="setPriority(p)" :class="[
        'py-1.5 text-sm font-medium transition-colors w-full',
        // Border styles
        index !== priorities.length - 1 ? 'border-r' : '',
        // Active state
        priority === p
          ? 'bg-indigo-600 text-white border-indigo-600'
          : 'bg-white text-indigo-600 border-indigo-600 hover:bg-indigo-50',
        'border-y border-indigo-600',
        // First and last items border
        index === 0 ? 'border-l' : '',
        index === priorities.length - 1 ? 'border-r' : ''
      ]">
        {{ p }}
      </button>
    </div>
    <p v-if="errorMessage" class="rounded-sm border- border-red-400 bg-red-200 text-red-800 px-2 py-1 mt-2 flex">
      <span class="grow" id="error">{{ errorMessage }}</span>
      <span aria-hidden="true" @click="errorMessage = ''" class="flex-none cursor-pointer">✖</span>
    </p>
  </div>
</template>

<style scoped>
.error {
  color: red;
  margin-top: 0.5rem;
}
</style>
