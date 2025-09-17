import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ISensorMeasurement } from '@/types/measurements/measurements'

export const useMeasurementsStore = defineStore('measurements', () => {
    const measurements = ref<ISensorMeasurement[]>([])

    // Funzione che puo' accettare o un oggetto per accedere poi all'id o un id, serve per nel caso dell'oggetto per vedere se esite l'oggetto nell'array
    // se non esiste lo inserisce all'indice 0 sennò fa il replace e lo mette all'indice 0, nel caso in cui gli passassimo direttamente l'id
    // lo cerca e lo mette all'indice 0 dell'array. Come mai questo? Perchè il line chart è pensato per leggere l'indice 0 dell'array
    function upsertAndBringToFront(sensorOrId: ISensorMeasurement | string) {
        const current = [...measurements.value];

        if (typeof sensorOrId === 'string') {
            const index = current.findIndex(m => m.id === sensorOrId);

            if (index !== -1) {
                const [item] = current.splice(index, 1);
                current.unshift(item);
                measurements.value = current;
            }
        } else {
            const index = current.findIndex(m => m.id === sensorOrId.id);
            
            if (index !== -1) {
                current[index] = sensorOrId;
                const [item] = current.splice(index, 1);
                current.unshift(item);
            } else {
                current.unshift(sensorOrId);
            }
            measurements.value = current;
        }
    }

    return { measurements, upsertAndBringToFront }
})
