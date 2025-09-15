<script setup lang="ts">
import { useMeasurementsStore } from "@/stores/measurements";
import { useSensorsStore } from "@/stores/sensors";
import type { IMeasurement } from "@/types/measurements/measurements";
import type { ISensor } from "@/types/sensors/sensors";
import { ref } from "vue";

const props = defineProps<{sensor: ISensor}>();
const sensorsStore = useSensorsStore();
const measurementsStore = useMeasurementsStore();
const isLoading = ref<boolean>(false);

async function fetchMeasurements(sensorId: string) {
    const url = `/api/measurements/${sensorId}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Status error: ${response.status}`);
    }

    const sensorData = await response.json();
    measurementsStore.setMeasurements(sensorData);
    return sensorData.measurements || [];
}

function getLastValue(measurements: IMeasurement[]) {
    if (!measurements || measurements.length === 0) {
        return null;
    }
    const lastMeasurement = measurements[measurements.length - 1];
    return lastMeasurement.disp_mm;
}


function updateSensorInStore(sensorId: string, lastValue: number | null) {
    if (lastValue === null) {
        return;
    }

    const sensorInStore = sensorsStore.sensors.find(s => s.id === sensorId);
    if (sensorInStore) {
        sensorInStore.lastValue = lastValue;
        sensorInStore.isClicked = true;
    }
}

async function updateSensor() {
    try {
        isLoading.value = true;
        const fetchedMeasurements = await fetchMeasurements(props.sensor.id);

        const lastValue = getLastValue(fetchedMeasurements);

        updateSensorInStore(props.sensor.id, lastValue);

    } catch (error) {
        console.error("Error:", error);
        isLoading.value = false;
    } finally {
        isLoading.value = false;
    }
}
</script>

<template>
    <button
        :disabled="isLoading"
        @click="updateSensor"
        class="px-4 py-2 bg-secondaryText hover:bg-blue-400 text-white text-sm font-semibold rounded-lg shadow transition cursor-pointer flex justify-center items-center"
    >
        <i v-if="!isLoading" :class="sensor.isClicked ? 'pi pi-sync' : 'pi pi-cloud-download'"></i>
        <span v-else class="w-3 h-3 inline-block border-2 border-t-transparent border-white rounded-full animate-spin"></span>
    </button>
</template>
