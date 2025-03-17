<script setup lang="ts">
import { useTaskStore } from '@/stores/task';
import { composeTask } from '@/domain/logic/task';

const taskStore = useTaskStore();

const handleTaskSubmit = (event: Event) => {
  const task = (event.target as HTMLInputElement).value;
  taskStore.addTask(composeTask(task));

  (event.target as HTMLInputElement).value = '';
}
</script>

<template>
  <div>
    <h1>Tasks</h1>
  </div>
  <div>
    <input type="text" placeholder="Add a task" @keyup.enter="handleTaskSubmit" />
  </div>
  <div>
    <ul>
      <li v-for="task in taskStore.tasks" :key="task.id">
        <span>{{ task.title }}</span>
      </li>
    </ul>
  </div>
</template>
