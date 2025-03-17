<script setup lang="ts">
import { useTaskStore } from '@/stores/task';
import { composeTask } from '@/domain/logic/task';
import { Status, type Task } from '@/domain/models/task';

const taskStore = useTaskStore();

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

const taskClass = (task: Task) => {
  return {
    completed: task.status === Status.Completed
  }
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
        <span :class="taskClass(task)">{{ task.title }}</span>
        <button id="btnCompleteTask" @click="completeTask(task)">Done</button>
        <button id="btnRemoveTask" @click="removeTask(task)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
