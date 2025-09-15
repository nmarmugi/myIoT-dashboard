<script setup lang="ts">
import { useSensorsStore } from "@/stores/sensors";
import SensorRow from "./SensorRow.vue";
import { thTable } from "../utils/th";

const {sensors} = useSensorsStore();
</script>

<template>
    <div class="overflow-x-auto rounded-2xl shadow-md">
        <table>
            <thead>
                <tr class="bg-secondaryText text-white">
                    <th class="px-6 py-3 text-left text-sm font-semibold" v-for="th in thTable" :key="th">
                        {{ th }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <SensorRow
                    v-for="sensor in sensors"
                    :key="sensor.id"
                    :sensor="sensor"
                />
            </tbody>
        </table>
    </div>
</template>
