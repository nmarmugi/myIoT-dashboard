<script setup lang="ts">
import type { ISensor } from "@/types/sensors/sensors";
import SensorStatus from "./SensorStatus.vue";
import SensorUpdateButton from "./SensorUpdateButton.vue";

defineProps<{sensor: ISensor}>();
</script>

<template>
    <tr class="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors text-secondaryText">
        <td class="px-6 py-4 text-sm">{{ sensor.id }}</td>
        <td class="px-6 py-4 text-sm">{{ sensor.name }}</td>
        <td class="px-6 py-4 text-sm">{{ sensor.location }}</td>
        <td class="px-6 py-4 text-sm">{{ sensor.lastValue ?? "-" }}</td>
        <td class="px-6 py-4 text-sm">
            <SensorStatus :lastValue="sensor.lastValue" :threshold="sensor.threshold" />
        </td>
        <td class="px-6 py-4 text-sm">
            <SensorUpdateButton :sensor="sensor" />
        </td>
    </tr>
</template>
