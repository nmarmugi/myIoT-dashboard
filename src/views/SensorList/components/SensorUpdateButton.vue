<script setup lang="ts">
import type { ISensor } from "@/types/sensors/sensors";

defineProps<{sensor: ISensor}>();

function updateSensor() {

}
</script>

<template>
    <button
        @click="updateSensor"
        class="px-4 py-2 bg-secondaryText hover:bg-blue-400 text-white text-sm font-semibold rounded-lg shadow transition cursor-pointer"
    >
        Update
    </button>
</template>
