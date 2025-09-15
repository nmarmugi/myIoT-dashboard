<script setup lang="ts">
import SensorsTable from './components/SensorsTable.vue';
import SensorChart from './components/SensorChart.vue';
import { useMeasurementsStore } from '@/stores/measurements';

const measurementsStore = useMeasurementsStore();
</script>

<template>
    <div class="w-full min-h-dvh flex justify-center items-center">
        <div class="p-8">
            <h1 class="text-3xl font-bold mb-6 text-gray-800">Your sensors</h1>
            <div class="flex flex-col gap-5">
                <SensorsTable />
                <SensorChart v-if="measurementsStore.measurements" />
            </div>
        </div>
    </div>
</template>
