<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar/Sidebar.vue';
</script>

<template>
  <div class="flex relative">
    <Sidebar />
    <main class="flex-1 bg-background">
      <RouterView />
      <Toast class="max-w-[300px]" />
    </main>
  </div>
</template>
