import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { TSortStatus } from '@/types/sensors/sensors'

export const useStatusSortStore = defineStore('statusSorts', () => {
    const statusSorts = ref<TSortStatus>({
        id: false,
        name: false,
        location: false,
        lastValue: false,
        status: false
    })

    return { statusSorts }
})
