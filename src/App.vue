<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar/Sidebar.vue';
import SelectChangeLanguage from './components/SelectChangeLanguage/SelectChangeLanguage.vue';
</script>

<template>
  <div class="flex relative">
    <Sidebar />
    <main class="flex-1 bg-background">
      <SelectChangeLanguage />
      <RouterView />
      <Toast class="max-w-[300px]" />
    </main>
  </div>
</template>
