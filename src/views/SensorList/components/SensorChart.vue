<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as am5 from '@amcharts/amcharts5/index';
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useMeasurementsStore } from '@/stores/measurements';
import { useSensorsStore } from '@/stores/sensors';
import { getRecent3DaysData } from '../utils/getRecent3DaysData';
import Modal from '@/components/Modal/Modal.vue';

const measurementsStore = useMeasurementsStore();
const chartContainer = ref<HTMLElement | null>(null);
const showModal = ref<boolean>(false);

let root: am5.Root;
let chart: am5xy.XYChart;
let series: am5xy.LineSeries;
let targetLine: am5xy.LineSeries | null = null;

onMounted(() => {
    if (!chartContainer.value) {
        return;
    }

    root = am5.Root.new(chartContainer.value);

    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0
    }));

    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineX.set("forceHidden", true);
    cursor.lineY.set("forceHidden", true);

    let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
        baseInterval: {
            timeUnit: "hour",
            count: 1
        },
        renderer: am5xy.AxisRendererX.new(root, {
            minorGridEnabled: true,
            minGridDistance: 60
        }),
        tooltip: am5.Tooltip.new(root, {})
    }));

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
    }));

    series = chart.series.push(am5xy.LineSeries.new(root, {
        name: "Displacement (mm)",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY} mm\n{dateX.formatDate('yyyy-MM-dd HH:mm')}"
        }),
        stroke: am5.color(0x007BFF),
        fill: am5.color(0x007BFF)
    }));

    series.fills.template.setAll({
        fillOpacity: 0.15,
        visible: true
    });


    chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
    }));

    watch(() => measurementsStore.measurements, (newMeasurements) => {

        const firstSensorMeasurement = newMeasurements?.[0];

        if (!firstSensorMeasurement) {
            series.data.setAll([]);
            if (targetLine) targetLine.data.setAll([]);
            return;
        }

        const chartData = getRecent3DaysData(firstSensorMeasurement.measurements);
        series.data.setAll(chartData);

        const sensorId = firstSensorMeasurement.id;

        const sensorsStore = useSensorsStore();
        const sensor = sensorsStore.sensors.find(s => s.id === sensorId);
        const threshold = sensor?.threshold ?? null;

        if (targetLine) {
            targetLine.data.setAll([]);
        }

        if (threshold !== null && chartData.length > 0) {
            const firstDate = chartData[0]?.date;
            const lastDate = chartData[chartData.length - 1]?.date;

            if (!firstDate || !lastDate) return;

            if (!targetLine) {
                targetLine = chart.series.push(am5xy.LineSeries.new(root, {
                    name: "Threshold",
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: "value",
                    valueXField: "date",
                    stroke: am5.color(0xFF0000),
                    tooltip: am5.Tooltip.new(root, {
                        labelText: "Threshold: {valueY} mm"
                    })
                }));

                targetLine.fills.template.set("visible", false);
            }

            targetLine.data.setAll([
                { date: firstDate, value: threshold },
                { date: lastDate, value: threshold }
            ]);
        }

    }, { immediate: true });

    series.appear(1000);
    chart.appear(1000, 100);
});

onUnmounted(() => {
    if (root) {
        root.dispose();
    }
});
</script>

<template>
    <div class="flex items-center gap-1">
        <h3 class="font-semibold text-primaryText text-center md:text-start">
            {{ measurementsStore.measurements?.[0]?.id }}
        </h3>
        <i @click="showModal = true" class="pi pi-window-maximize cursor-pointer"></i>
    </div>
    <div ref="chartContainer" class="w-full h-96 overflow-x-auto bg-white shadow-md"></div>
    <Modal v-model:visible="showModal" :sensorMeasurement="measurementsStore.measurements?.[0]" />
</template>
