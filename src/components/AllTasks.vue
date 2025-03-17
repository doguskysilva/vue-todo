<script setup lang="ts">
import { useTaskStore } from '@/stores/task';
import { composeTask, sortTasksByCompleted } from '@/domain/logic/task';
import { Status, type Task } from '@/domain/models/task';
import { computed } from 'vue';
import TaskItem from './TaskItem.vue';
import TaskCreator from './TaskCreator.vue';

const taskStore = useTaskStore();

const sortedTasks = computed(() => sortTasksByCompleted(taskStore.tasks))

const handleTaskSubmit = ({ title, priority }: Partial<Task>) => {
  if (title && priority) {
    taskStore.addTask(composeTask(title, priority));
  } else {
    console.error('Task title and priority are required');
  }
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
  <TaskCreator v-on:create="handleTaskSubmit" />
  <div>
    <ul>
      <TaskItem v-for="task in sortedTasks" :key="task.id" :task="task" v-on:complete="completeTask"
        v-on:remove="removeTask" />
    </ul>
  </div>
</template>
