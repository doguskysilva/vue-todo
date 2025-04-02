<script setup lang="ts">
import { ref } from 'vue'

const show = ref(true)
const name = ref('')
const errorMessage = ref('')
const emit = defineEmits(['submit', 'close'])

const close = () => {
  if (!name.value.trim()) {
    errorMessage.value = 'Please enter your name before continuing'
    return
  }
  show.value = false
  emit('close')
}

const submit = () => {
  if (!name.value.trim()) {
    errorMessage.value = 'Please enter your name before continuing'
    return
  }
  emit('submit', name.value)
  show.value = false
}
</script>

<template>
  <Transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0"
    enter-to-class="opacity-100" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100"
    leave-to-class="opacity-0">
    <div v-if="show" class="relative z-50">
      <div class="fixed inset-0 bg-gray-500/90 dark:bg-gray-900/90 transition-opacity" />

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            class="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-indigo-600 dark:text-indigo-300" fill="none" viewBox="0 0 24 24"
                  stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>

              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Welcome to Todo App</h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500 dark:text-gray-400">Please enter your name to get started</p>
                </div>
                <div class="mt-4">
                  <input type="text" v-model="name" placeholder="Your name" @keyup.enter="submit" :class="[
                    'block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6',
                    errorMessage ? 'ring-red-300 dark:ring-red-500' : 'ring-gray-300 dark:ring-gray-600'
                  ]" />
                  <p v-if="errorMessage" class="mt-2 text-sm text-red-600 dark:text-red-400">{{ errorMessage }}</p>
                </div>
              </div>
            </div>

            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button type="button"
                class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-indigo-400 sm:ml-3 sm:w-auto"
                @click="submit">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
