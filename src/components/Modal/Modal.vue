<script setup lang="ts">
import { useSensorsStore } from '@/stores/sensors';
import type { ISensorMeasurement } from '@/types/measurements/measurements';
import type { ISensor } from '@/types/sensors/sensors';
import { computed } from 'vue';
import Dialog from 'primevue/dialog';

const props = defineProps<{ visible: boolean, sensorMeasurement: ISensorMeasurement, toggleShowModal: () => void }>();

const { sensors } = useSensorsStore();

// Mi prendo il sensore giusto cercandolo tramite id
const sensor = computed<ISensor | undefined>(() => {
    return sensors.find(s => s.id === props.sensorMeasurement?.id);
});

// Funzione per formattare il timestamp
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
    <div class="card flex justify-center p-2">
        <Dialog :visible="visible" @click="toggleShowModal" modal class="w-full max-w-[95%] md:max-w-[600px]">
            <div class="flex flex-col gap-3 w-full">
                <div class="w-full flex flex-col items-start gap-3">
                    <h3 class="text-primaryText font-semibold text-center w-full text-md">
                        {{ sensorMeasurement?.id }} | {{ sensor?.name }} | {{ sensor?.location }}
                    </h3>
                    <span class="text-primaryText font-semibold">
                        {{ $t("sensorList.modal.threshold") }} {{ sensor?.threshold }} mm
                    </span>
                    <div class="flex items-center gap-2">
                        <span class="text-primaryText font-semibold">
                            {{ $t("sensorList.modal.lastStatus") }}
                        </span>
                        <span class="inline-block px-3 py-1 rounded-full font-semibold text-white text-xs" :class="sensor?.status ? 'bg-red-500' : 'bg-green-500'">
                            {{ sensor?.status ? 'Alarm' : 'OK' }}
                        </span>
                    </div>
                </div>
                <span class="text-primaryText font-semibold">
                    {{ $t("sensorList.modal.lastMeasurements") }}
                </span>
                <div class="w-full flex flex-col gap-1 max-h-[300px] overflow-y-scroll px-2">
                    <div class="w-full flex justify-around border-2 border-yellow-500 rounded-sm" v-for="m in sensorMeasurement?.measurements?.slice(0, 100)" :key="m.timestamp">
                        <span class="text-primaryText">
                            {{ formatTimestamp(m.timestamp) }}
                        </span>
                        <span :class="m.disp_mm > (sensor?.threshold ?? -Infinity) ? 'text-red-500' : 'text-green-500'">
                            {{ m.disp_mm }} mm
                        </span>
                    </div>
                </div>
            </div>
        </Dialog>
    </div>
</template>
