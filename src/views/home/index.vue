<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const onNewMeeting = () => {
  router.push('/meeting')
}
</script>

<template>
  <main class="w-full">
    <v-sheet
      border="md"
      class="pa-6 w-[80vw] max-w-none min-h-[400px] text-white mx-auto !flex gap-[32px] justify-center items-center flex-col"
      color="#141518"
    >
      <v-btn size="x-large" density="default" color="indigo-darken-3" @click="onNewMeeting">
        New Meeting
      </v-btn>
      <v-btn size="x-large" density="default" color="blue">Join Meeting</v-btn>
    </v-sheet>
  </main>
</template>

<style>
@import 'tailwindcss';
</style>
