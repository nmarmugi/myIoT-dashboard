import type { IMeasurementChart } from "@/types/chart/chart";
import type { IMeasurement } from "@/types/measurements/measurements";

// Recupera gli ultimi 3 giorni di misurazioni, servirà per il line chart
export function getRecent3DaysData(measurements: IMeasurement[]): IMeasurementChart[] {
    if (!measurements || measurements.length === 0) return [];

    // Crea una copia dell’array (non modifica l’originale!) e lo ordina dalla più vecchia alla più recente
    const sorted = [...measurements].sort((a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    // Prende l’ultima misurazione (la più recente) e ne estrae la data
    const lastDate = new Date(sorted[sorted.length - 1].timestamp);

    // Crea una nuova data sottraendo 3 giorni all’ultima data
    const threeDaysAgo = new Date(lastDate);
    threeDaysAgo.setDate(lastDate.getDate() - 3);

    // Tiene solo le misurazioni che hanno una data uguale o successiva a 3 giorni fa
    const filtered = sorted.filter(m => {
        const ts = new Date(m.timestamp);
        return ts >= threeDaysAgo;
    });

    // Trasforma ogni misurazione in un formato adatto al grafico
    return filtered.map(m => ({
        date: new Date(m.timestamp).getTime(),
        value: m.disp_mm
    }));
}
