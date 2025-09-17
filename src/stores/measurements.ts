import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ISensorMeasurement } from '@/types/measurements/measurements'

export const useMeasurementsStore = defineStore('measurements', () => {
    const measurements = ref<ISensorMeasurement[]>([])

    function upsertAndBringToFront(sensorOrId: ISensorMeasurement | string) {
        const current = [...measurements.value];

        if (typeof sensorOrId === 'string') {
            const index = current.findIndex(m => m.id === sensorOrId);

            if (index !== -1) {
                const [item] = current.splice(index, 1);
                current.unshift(item);
                measurements.value = current;
            }
        } else {
            const index = current.findIndex(m => m.id === sensorOrId.id);
            
            if (index !== -1) {
                current[index] = sensorOrId;
                const [item] = current.splice(index, 1);
                current.unshift(item);
            } else {
                current.unshift(sensorOrId);
            }
            measurements.value = current;
        }
    }

    return { measurements, upsertAndBringToFront }
})
