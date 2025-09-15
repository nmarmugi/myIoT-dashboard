<script setup lang="ts">
defineProps<{lastValue?: number, threshold: number}>();
</script>

<template>
    <span
        class="inline-block px-3 py-1 rounded-full"
        :class="lastValue === undefined ? 'text-secondartText' : lastValue > threshold ? 'bg-red-500 text-white font-semibold' : 'bg-green-500 text-white font-semibold'"
    >
        {{ lastValue === undefined ? '-' : lastValue > threshold ? 'Alarm' : 'OK' }}
    </span>
</template>
