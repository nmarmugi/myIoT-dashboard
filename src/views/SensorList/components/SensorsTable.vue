<script setup lang="ts">
import { useSensorsStore } from "@/stores/sensors";
import SensorRow from "./SensorRow.vue";
import { useStatusSortStore } from "@/stores/sort";
import { thTable } from "../utils/th";

const { sensors, sortedByAlpha, sortedByNumber, sortedByStatus } = useSensorsStore();
const { statusSorts } = useStatusSortStore();
</script>

<template>
    <div
        class="overflow-x-scroll rounded-tl-2xl rounded-tr-2xl shadow-md max-w-[300px] md:max-w-none md:overflow-x-auto">
        <table>
            <thead>
                <tr class="bg-secondaryText text-white">
                    <th v-for="(th, index) in thTable" class="px-6 py-3 text-left text-sm font-semibold" :key="th.label">
                        <div :class="['flex items-center gap-1', (index + 1) === thTable.length ? '' : 'min-w-[90px]']">
                            <span>
                                {{ th.label }}
                            </span>
                            <i v-if="th.iconUp"
                                :class="['cursor-pointer pi', statusSorts[th.keySort as keyof typeof statusSorts] ? th.iconUp : (th.iconDown || th.iconUp)]"
                                @click="th.keySort === 'id' || th.keySort === 'name' || th.keySort === 'location'
                                    ? sortedByAlpha(sensors, th.keySort)
                                    : th.keySort === 'lastValue'
                                        ? sortedByNumber(sensors, th.keySort)
                                        : th.keySort === 'status'
                                            ? sortedByStatus(sensors, th.keySort)
                                            : null">
                            </i>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <SensorRow v-for="sensor in sensors" :key="sensor.id" :sensor="sensor" />
            </tbody>
        </table>
    </div>
</template>
