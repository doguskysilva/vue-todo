<script setup lang="ts">
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import { getGreetingMessage } from './domain/logic/time'
import AllTasks from './components/AllTasks.vue'

const greetingMessage = ref(getGreetingMessage(new Date()))
</script>

<template>
  <header class="flex px-8 lg:h-full items-center justify-center flex-col lg:flex-row">
    <img alt="Todo Vue Logo" class="hidden lg:block lg:w-32 lg:h-32" src="./assets/logo.svg" />

    <div>
      <HelloWorld :msg="greetingMessage" />
    </div>
  </header>

  <main class="flex px-8 lg:h-full items-center">
    <AllTasks />
  </main>
</template>
