<script setup lang="ts">
import { useSensorsStore } from "@/stores/sensors";
import SensorRow from "./SensorRow.vue";
import { ref } from "vue";
import type { ISensor, TSortStatus } from "@/types/sensors/sensors";

const { sensors } = useSensorsStore();

const statusSorts = ref<TSortStatus>(
    {
        id: false,
        name: false,
        location: false,
        lastValue: false,
        status: false
    }
);

function sortedByAlpha(array: ISensor[], key: keyof TSortStatus) {
    const validKeys: (keyof ISensor)[] = ['id', 'name', 'location'];
    if (!validKeys.includes(key as keyof ISensor)) return;

    const sortKey = key as 'id' | 'name' | 'location';

    if (!statusSorts.value[key]) {
        array.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
    } else {
        array.sort((a, b) => b[sortKey].localeCompare(a[sortKey]));
    }

    statusSorts.value[key] = !statusSorts.value[key];
}

function sortedByNumber(array: ISensor[], key: 'lastValue') {
    const asc = !statusSorts.value[key];

    array.sort((a, b) => {
        const valA = a[key] ?? -Infinity;
        const valB = b[key] ?? -Infinity;

        return asc ? valA - valB : valB - valA;
    });

    statusSorts.value[key] = !statusSorts.value[key];
}

function sortedByStatus(array: ISensor[], key: 'status') {
    const asc = !statusSorts.value[key];

    array.sort((a, b) => {
        const rank = (val: boolean | undefined) => {
            if (val === undefined) return 2;
            return val ? 1 : 0;
        };

        const diff = rank(a[key]) - rank(b[key]);
        return asc ? diff : -diff;
    });

    statusSorts.value[key] = !statusSorts.value[key];
}
</script>

<template>
    <div class="overflow-x-auto rounded-tl-2xl rounded-tr-2xl shadow-md">
        <table>
            <thead>
                <tr class="bg-secondaryText text-white">
                    <th class="px-6 py-3 text-left text-sm font-semibold">
                        <span>
                            ID
                        </span>
                        <i :class="['cursor-pointer pi', !statusSorts.id ? 'pi-sort-alpha-up' : 'pi-sort-alpha-down']"
                            @click="() => sortedByAlpha(sensors, 'id')"></i>
                    </th>
                    <th class="px-6 py-3 text-left text-sm font-semibold">
                        <span>
                            Name
                        </span>
                        <i :class="['cursor-pointer pi', !statusSorts.name ? 'pi-sort-alpha-up' : 'pi-sort-alpha-down']"
                            @click="() => sortedByAlpha(sensors, 'name')"></i>
                    </th>
                    <th class="px-6 py-3 text-left text-sm font-semibold">
                        <span>
                            Location
                        </span>
                        <i :class="['cursor-pointer pi', !statusSorts.location ? 'pi-sort-alpha-up' : 'pi-sort-alpha-down']"
                            @click="() => sortedByAlpha(sensors, 'location')"></i>
                    </th>
                    <th class="px-6 py-3 text-left text-sm font-semibold">
                        <span>
                            Last value
                        </span>
                        <i :class="['cursor-pointer pi', !statusSorts.lastValue ? 'pi-sort-numeric-up' : 'pi-sort-numeric-down']"
                            @click="() => sortedByNumber(sensors, 'lastValue')"></i>
                    </th>
                    <th class="px-6 py-3 text-left text-sm font-semibold">
                        <span>
                            Staus
                        </span>
                        <i class='cursor-pointer pi pi-sort-alt'
                            @click="() => sortedByStatus(sensors, 'status')"></i>
                    </th>
                    <th class="px-6 py-3 text-left text-sm font-semibold">
                        <span>
                            Fetch
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <SensorRow v-for="sensor in sensors" :key="sensor.id" :sensor="sensor" />
            </tbody>
        </table>
    </div>
</template>
