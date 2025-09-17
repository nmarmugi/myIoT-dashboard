import { useMeasurementsStore } from "@/stores/measurements";
import { useSensorsStore } from "@/stores/sensors";
import type { IMeasurement, ISensorMeasurement } from "@/types/measurements/measurements";

// Funzione che simula la chiamata
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

    // Aggiorno lo store con la funzione di controllo e riordinamento passandoli la risposta con l'oggetto corretto
    measurementsStore.upsertAndBringToFront(newMeasurementData);

    // Ritorna l’array delle misurazioni
    return newMeasurementData.measurements;
}

// Funzione per prendere lastValue
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

    // Aggiornamento del sensore con le chiavi - valore nuove
    const sensorInStore = sensorsStore.sensors.find((s) => s.id === sensorId);
    if (sensorInStore) {
        sensorInStore.lastValue = lastValue;
        sensorInStore.isClicked = true;
        sensorInStore.status = lastValue > sensorInStore.threshold;
    }
}
