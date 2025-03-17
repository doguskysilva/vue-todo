<script setup lang="ts">
import { useTaskStore } from '@/stores/task';
import { composeTask, sortTasksByCompleted } from '@/domain/logic/task';
import { Status, type Task } from '@/domain/models/task';
import { computed } from 'vue';
import TaskItem from './TaskItem.vue';

const taskStore = useTaskStore();

const sortedTasks = computed(() => sortTasksByCompleted(taskStore.tasks))

const handleTaskSubmit = (event: Event) => {
  const task = (event.target as HTMLInputElement).value;
  taskStore.addTask(composeTask(task));

  (event.target as HTMLInputElement).value = '';
}

const completeTask = (task: Task) => {
  taskStore.updateTask(
    {
      ...task,
      status: Status.Completed,
      completedAt: new Date()
    }
  );
}

const removeTask = (task: Task) => {
  taskStore.removeTask(task);
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
      <TaskItem v-for="task in sortedTasks" :key="task.id" :task="task" v-on:complete="completeTask"
        v-on:remove="removeTask" />
    </ul>
  </div>
</template>
