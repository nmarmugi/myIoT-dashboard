<script setup lang="ts">
import { useSensorsStore } from '@/stores/sensors';
import type { ISensorMeasurement } from '@/types/measurements/measurements';
import type { ISensor } from '@/types/sensors/sensors';
import { computed } from 'vue';

const props = defineProps<{ visible: boolean, sensorMeasurement: ISensorMeasurement }>();
const emit = defineEmits(['update:visible']);
const { sensors } = useSensorsStore();
const sensor = computed<ISensor | undefined>(() => {
    return sensors.find(s => s.id === props.sensorMeasurement?.id);
});

function close() {
    emit('update:visible', false);
}

function formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleString('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).replace(',', ' -');
}
</script>

<template>
    <div v-if="visible" class="absolute top-0 left-0 w-full min-h-dvh h-full flex justify-center items-center bg-black/50 z-[51] p-2">
        <div class="max-w-[600px] w-full bg-white rounded-lg relative px-6 py-10">
            <i @click="close" class="pi pi-times cursor-pointer absolute top-3 right-3 text-xl text-primaryText hover:text-gray-800"></i>
            <div class="flex flex-col gap-3 w-full">
                <div class="w-full flex flex-col items-start gap-3">
                    <span class="text-primaryText font-semibold">
                        {{ sensorMeasurement?.id }} | {{ sensor?.name }} | {{ sensor?.location }}
                    </span>
                    <div class="flex items-center gap-2">
                        <span class="text-primaryText font-semibold">
                            Last status: 
                        </span>
                        <span class="inline-block px-3 py-1 rounded-full font-semibold text-white text-xs" :class="sensor?.status ? 'bg-red-500' : 'bg-green-500'">
                            {{ sensor?.status ? 'Alarm' : 'OK' }}
                        </span>
                    </div>
                </div>
                <span class="text-primaryText font-semibold">
                    Last 100 measurements: 
                </span>
                <div class="w-full flex flex-col gap-1 max-h-[300px] overflow-y-scroll px-2">
                    <div class="w-full flex justify-around border-2 border-yellow-500 rounded-sm" v-for="m in sensorMeasurement?.measurements?.slice(0, 100)" :key="m.timestamp">
                        <span class="text-primaryText">
                            {{ formatTimestamp(m.timestamp) }}
                        </span>
                        <span :class="m.disp_mm > (sensor?.threshold ?? -Infinity) ? 'text-red-500' : 'text-green-500'">
                            {{ m.disp_mm }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
