<script setup lang="ts">
import { Priority, Status, type Task } from '@/domain/models/task';

const props = defineProps<{ task: Task; }>()

const emit = defineEmits(['complete', 'remove'])

const hadleCompleteTask = () => {
  emit('complete', props.task)
}

const handleRemoveTask = () => {
  emit('remove', props.task)
}

const taskClass = (task: Task) => {
  return {
    completed: task.status === Status.Completed
  }
}

const iconsPriority = {
  [Priority.Low]: '⬇️',
  [Priority.Medium]: '➡️',
  [Priority.High]: '⬆️'
}
</script>

<template>
  <li class="flex justify-between items-center gap-x-6 py-3">
    <div>
      {{ iconsPriority[task.priority] }} <span :class="taskClass(task)">{{ task.title }}</span>
    </div>
    <div>
      <button v-if="!task.completedAt" id="btnCompleteTask" @click="hadleCompleteTask"
        class="mr-4 inline-block rounded-sm border px-3 py-2 text-sm font-medium border-green-600 bg-green-600 text-white hover:bg-green-500 hover:text-green-100 focus:ring-3 focus:outline-hidden">Done</button>
      <button v-if="!task.completedAt" id="btnRemoveTask" @click="handleRemoveTask"
        class="mr-4 inline-block rounded-sm border px-3 py-2 text-sm font-medium border-red-600 bg-red-600 text-white hover:bg-red-500 hover:text-red-100 focus:ring-3">Remove</button>
    </div>
  </li>
</template>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
