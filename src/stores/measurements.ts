import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ISensorMeasurement } from '@/types/measurements/measurements'

export const useMeasurementsStore = defineStore('measurements', () => {
    const measurements = ref<ISensorMeasurement[]>([])

    function upsertAndBringToFront(sensorData: ISensorMeasurement) {
        const current = [...measurements.value];
        const index = current.findIndex(m => m.id === sensorData.id);

        if (index !== -1) {
            current[index] = sensorData;
            const [item] = current.splice(index, 1);
            current.unshift(item);
        } else {
            current.unshift(sensorData);
        }

        measurements.value = current;
    }

    function bringToFrontIfExists(sensorId: string) {
        const current = [...measurements.value];
        const index = current.findIndex(m => m.id === sensorId);

        if (index !== -1) {
            const [item] = current.splice(index, 1);
            current.unshift(item);
            measurements.value = current;
        }
    }

    return { measurements, upsertAndBringToFront, bringToFrontIfExists }
})
