<script setup lang="ts">
import { useTaskStore } from '@/stores/task';
import { composeTask, sortTasksByCompleted } from '@/domain/logic/task';
import { Status, type Task } from '@/domain/models/task';
import { computed } from 'vue';

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
      <li v-for="task in sortedTasks" :key="task.id">
        <span :class="taskClass(task)">{{ task.title }}</span>

        <button v-if="!task.completedAt" id="btnCompleteTask" @click="completeTask(task)">Done</button>
        <button v-if="!task.completedAt" id="btnRemoveTask" @click="removeTask(task)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
