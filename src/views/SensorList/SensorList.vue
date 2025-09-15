<script setup lang="ts">
import SensorsTable from './components/SensorsTable.vue';
</script>

<template>
    <div class="w-full min-h-dvh flex justify-center items-center">
        <div class="p-8">
            <h1 class="text-3xl font-bold mb-6 text-gray-800">Your sensors</h1>
            <SensorsTable />
        </div>
    </div>
</template>
