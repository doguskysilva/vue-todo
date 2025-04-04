<script setup lang="ts">
import { useTaskStore } from '@/stores/task';
import { completeTask, composeTask, filterTasksCompletedBeforeToday, sortTasksByCompleted, sortTasksByCreatedAt } from '@/domain/logic/task';
import { type Task } from '@/domain/models/task';
import { computed } from 'vue';
import TaskItem from './TaskItem.vue';
import TaskCreator from './TaskCreator.vue';

const taskStore = useTaskStore();

const sortedTasks = computed(() =>
  sortTasksByCompleted(
    sortTasksByCreatedAt(
      filterTasksCompletedBeforeToday(taskStore.tasks)
    )
  )
)

const handleTaskSubmit = ({ title, priority }: Partial<Task>) => {
  if (title && priority) {
    taskStore.addTask(composeTask(title, priority));
  } else {
    console.error('Task title and priority are required');
  }
}

const handleCompleteTask = (task: Task) => {
  taskStore.updateTask(
    completeTask(task)
  );
}

const handleRemoveTask = (task: Task) => {
  taskStore.removeTask(task);
}
</script>

<template>
  <div class="w-full">
    <h1 class="text-4xl mb-4">Tasks</h1>
    <TaskCreator v-on:create="handleTaskSubmit" />
    <ul role="list" class="divide-y divide-gray-100 dark:divide-gray-800 mt-4">
      <TransitionGroup name="list" tag="ul">
        <TaskItem v-for="task in sortedTasks" :key="task.id" :task="task" v-on:complete="handleCompleteTask"
          v-on:remove="handleRemoveTask" />
      </TransitionGroup>
    </ul>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
