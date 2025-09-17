<script setup lang="ts">
defineProps<{ status?: boolean }>();
</script>

<template>
    <span class="inline-block px-3 py-1 rounded-full"
        :class="status === undefined ? 'text-secondartText' : status ? 'bg-red-500 text-white font-semibold' : 'bg-green-500 text-white font-semibold'">
        {{ status === undefined ? '-' : status ? 'Alarm' : 'OK' }}
    </span>
</template>
