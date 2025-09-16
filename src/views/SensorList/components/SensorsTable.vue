<script setup lang="ts">
import { useSensorsStore } from "@/stores/sensors";
import SensorRow from "./SensorRow.vue";
import { useStatusSortStore } from "@/stores/sort";

const { sensors, sortedByAlpha, sortedByNumber, sortedByStatus } = useSensorsStore();
const { statusSorts } = useStatusSortStore();
</script>

<template>
    <div class="overflow-x-scroll rounded-tl-2xl rounded-tr-2xl shadow-md max-w-[300px] md:max-w-none md:overflow-x-auto">
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
