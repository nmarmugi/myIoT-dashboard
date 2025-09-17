<script setup lang="ts">
import type { ISensor } from "@/types/sensors/sensors";
import SensorStatus from "./SensorStatus.vue";
import SensorUpdateButton from "./SensorUpdateButton.vue";
import { useMeasurementsStore } from "@/stores/measurements";

defineProps<{ sensor: ISensor }>();

const measurementsStore = useMeasurementsStore();
</script>

<template>
    <tr @click="() => measurementsStore.upsertAndBringToFront(sensor.id)"
        :class="['odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors text-secondaryText', sensor.lastValue && 'cursor-pointer', sensor.id === measurementsStore.measurements?.[0]?.id && 'border-2 border-yellow-400']">
        <td class="px-6 py-4 text-sm">{{ sensor.id }}</td>
        <td class="px-6 py-4 text-sm">{{ sensor.name }}</td>
        <td class="px-6 py-4 text-sm">{{ sensor.location }}</td>
        <td class="px-6 py-4 text-sm">{{ sensor.lastValue ?? "-" }}</td>
        <td class="px-6 py-4 text-sm">
            <SensorStatus :status="sensor.status" />
        </td>
        <td class="px-6 py-4 text-sm">
            <SensorUpdateButton :sensor="sensor" />
        </td>
    </tr>
</template>
