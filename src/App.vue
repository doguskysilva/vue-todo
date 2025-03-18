<script setup lang="ts">
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import { getGreetingMessage } from './domain/logic/time'
import AllTasks from './components/AllTasks.vue'

const greetingMessage = ref(getGreetingMessage(new Date()))
</script>

<template>
  <header class="flex p-8 lg:h-full items-center justify-center flex-col lg:flex-row">
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld :msg="greetingMessage" />
    </div>
  </header>

  <main class="flex p-8 lg:h-full items-center">
    <AllTasks />
  </main>
</template>
