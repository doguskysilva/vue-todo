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
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3 v-if="userStore.user">
      Welcome {{ userStore.user.name }}, to your Vue Todo App!
    </h3>
    <UserDialog v-if="showDialog" @submit="handleUserSubmit" @close="closeDialog" />
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
