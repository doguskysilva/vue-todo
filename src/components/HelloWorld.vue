<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref } from 'vue';
import UserDialog from './UserDialog.vue';
import { createUser } from '@/domain/logic/user';
defineProps<{
  msg: string
}>()

const userStore = useUserStore()
const showDialog = ref(!userStore.user?.name)

const handleUserSubmit = (name: string) => {
  userStore.setUser(createUser(name))
  showDialog.value = false
}

const closeDialog = () => {
  showDialog.value = false
}

</script>

<template>
  <div class="greetings text-center lg:text-left p-4">
    <h1 class="text-4xl mb-4">{{ msg }}</h1>
    <h3 v-if="userStore.user" class="text-lg">
      Welcome {{ userStore.user.name.split(' ')[0] }}, to your VueTodo App!
    </h3>
    <UserDialog v-if="showDialog" @submit="handleUserSubmit" @close="closeDialog" />
  </div>
</template>
