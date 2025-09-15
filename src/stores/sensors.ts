import { ref } from 'vue'
import { defineStore } from 'pinia'
import mySensors from '../../public/data/sensors.json'
import type { ISensor } from '@/types/sensors/sensors'

export const useSensorsStore = defineStore('sensors', () => {
    const sensors = ref<ISensor[]>(mySensors as ISensor[])

    return { sensors }
})
