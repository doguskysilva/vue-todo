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
  [Priority.Low]: '🔽',
  [Priority.Medium]: '🔼',
  [Priority.High]: '⏫'
}

const onCheckboxChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.checked) {
    hadleCompleteTask()
  }
}
</script>

<template>
  <li class="flex justify-between items-center gap-x-6 py-3">
    <div class="flex items-center">
      <input type="checkbox" class="mr-2" @change="onCheckboxChange" :checked="task.status === Status.Completed" />
      <div :class="taskClass(task)">
        {{ iconsPriority[task.priority] }} <span :class="taskClass(task)">{{ task.title }}</span>
      </div>
    </div>
    <div>
      <button v-if="!task.completedAt" id="btnRemoveTask" @click="handleRemoveTask"
        class="flex items-center justify-center w-6 h-6 rounded-full border border-red-600 text-red-600 hover:bg-red-600 hover:text-white focus:outline-none">
        ✖
      </button>
    </div>
  </li>
</template>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
