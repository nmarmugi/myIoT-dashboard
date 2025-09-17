<script setup lang="ts">
import type { ISensor } from "@/types/sensors/sensors";
import { ref } from "vue";
import { fetchMeasurements, getLastValue, updateSensorInStore } from "../utils/fetchMeasurements";

const props = defineProps<{ sensor: ISensor }>();
const isLoading = ref<boolean>(false);

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
    <button :disabled="isLoading" @click="updateSensor"
        class="px-4 py-2 bg-secondaryText hover:bg-blue-400 text-white text-sm font-semibold rounded-lg shadow transition cursor-pointer flex justify-center items-center">
        <i v-if="!isLoading" :class="sensor.isClicked ? 'pi pi-sync' : 'pi pi-cloud-download'"></i>
        <span v-else
            class="w-3 h-3 inline-block border-2 border-t-transparent border-white rounded-full animate-spin"></span>
    </button>
</template>
