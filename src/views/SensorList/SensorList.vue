<script setup lang="ts">
import SensorsTable from './components/SensorsTable.vue';
import SensorChart from './components/SensorChart.vue';
import { useMeasurementsStore } from '@/stores/measurements';

const measurementsStore = useMeasurementsStore();
</script>

<template>
    <div class="w-full min-h-dvh flex justify-center pt-20">
        <div class="px-8 pb-8 md:pl-30">
            <h2 class="text-center md:text-start text-3xl font-bold mb-6 text-primaryText">Your sensors</h2>
            <div class="flex flex-col gap-5">
                <SensorsTable />
                <SensorChart v-if="measurementsStore.measurements.length > 0" />
            </div>
        </div>
    </div>
</template>
