import { useMeasurementsStore } from "@/stores/measurements";
import { useSensorsStore } from "@/stores/sensors";
import type { IMeasurement, ISensorMeasurement } from "@/types/measurements/measurements";

export async function fetchMeasurements(sensorId: string, measurementsStore = useMeasurementsStore()) {
    const url = `/api/measurements/${sensorId}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Status error: ${response.status}`);
    }

    const sensorData = await response.json();

    const newMeasurementData: ISensorMeasurement = {
        id: sensorId,
        measurements: sensorData.measurements || [],
    };

    measurementsStore.upsertAndBringToFront(newMeasurementData);

    return newMeasurementData.measurements;
}

export function getLastValue(measurements: IMeasurement[]) {
    if (!measurements || measurements.length === 0) {
        return null;
    }
    const lastMeasurement = measurements[measurements.length - 1];
    return lastMeasurement.disp_mm;
}

export function updateSensorInStore(sensorId: string, lastValue: number | null, sensorsStore = useSensorsStore()) {
    if (lastValue === null) {
        return;
    }

    const sensorInStore = sensorsStore.sensors.find((s) => s.id === sensorId);
    if (sensorInStore) {
        sensorInStore.lastValue = lastValue;
        sensorInStore.isClicked = true;
        sensorInStore.status = lastValue > sensorInStore.threshold;
    }
}
