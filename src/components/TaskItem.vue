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
  <li>
    {{ iconsPriority[task.priority] }} <span :class="taskClass(task)">{{ task.title }}</span>
    <button v-if="!task.completedAt" id="btnCompleteTask" @click="hadleCompleteTask">Done</button>
    <button v-if="!task.completedAt" id="btnRemoveTask" @click="handleRemoveTask">Remove</button>
  </li>
</template>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
