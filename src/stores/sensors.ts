import { ref } from 'vue'
import { defineStore } from 'pinia'
import mySensors from '../data/sensors.json'
import type { ISensor, TSortStatus } from '@/types/sensors/sensors'
import { useStatusSortStore } from './sort'

export const useSensorsStore = defineStore('sensors', () => {
    const sensors = ref<ISensor[]>(mySensors as ISensor[])
    const { statusSorts } = useStatusSortStore();

    // Funzioni per il sort (alfabetico, numerico, buleano e di reset)
    function resetSorts(statusSorts: TSortStatus, exceptKey: keyof TSortStatus) {
        for (const key in statusSorts) {
            if (key !== exceptKey) {
                statusSorts[key as keyof TSortStatus] = false;
            }
        }
    }

    function sortedByAlpha(array: ISensor[], key: keyof TSortStatus) {
        const validKeys: (keyof ISensor)[] = ['id', 'name', 'location'];
        if (!validKeys.includes(key as keyof ISensor)) return;

        const sortKey = key as 'id' | 'name' | 'location';

        if (!statusSorts[key]) {
            array.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
        } else {
            array.sort((a, b) => b[sortKey].localeCompare(a[sortKey]));
        }

        resetSorts(statusSorts, key)
        statusSorts[key] = !statusSorts[key];
    }

    function sortedByNumber(array: ISensor[], key: 'lastValue') {
        const asc = !statusSorts[key];

        array.sort((a, b) => {
            const valA = a[key] ?? -Infinity;
            const valB = b[key] ?? -Infinity;

            return asc ? valA - valB : valB - valA;
        });

        resetSorts(statusSorts, key)
        statusSorts[key] = !statusSorts[key];
    }

    function sortedByStatus(array: ISensor[], key: 'status') {
        const asc = !statusSorts[key];

        array.sort((a, b) => {
            const rank = (val: boolean | undefined) => {
                if (val === undefined) return 2;
                return val ? 1 : 0;
            };

            const diff = rank(a[key]) - rank(b[key]);
            return asc ? diff : -diff;
        });

        resetSorts(statusSorts, key)
        statusSorts[key] = !statusSorts[key];
    }

    return { sensors, sortedByAlpha, sortedByNumber, sortedByStatus }
})
