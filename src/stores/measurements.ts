import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ISensorMeasurement } from '@/types/measurements/measurements'

export const useMeasurementsStore = defineStore('measurements', () => {
    const measurements = ref<ISensorMeasurement | null>(null)

    function setMeasurements(data: ISensorMeasurement) {
        measurements.value = data;
    }

    return { measurements, setMeasurements }
})
