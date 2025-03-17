<script setup lang="ts">
import { Priority } from '@/domain/models/task'
import { ref } from 'vue'

const emit = defineEmits(['create'])
const priorities = Object.values(Priority)
const errorMessage = ref('')

const task = ref('')
const priority = ref(priorities[0])

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
    <input type="text" placeholder="Add a task" v-model="task" @keyup.enter="handleCreateTask" />
    <select v-model="priority">
      <option v-for="priority in priorities" :key="priority" :value="priority">{{ priority }}</option>
    </select>
    <button id="btnCreateTask" @click="handleCreateTask">Add</button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.error {
  color: red;
  margin-top: 0.5rem;
}
</style>
