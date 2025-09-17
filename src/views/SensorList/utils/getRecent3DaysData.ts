import type { IMeasurementChart } from "@/types/chart/chart";
import type { IMeasurement } from "@/types/measurements/measurements";

export function getRecent3DaysData(measurements: IMeasurement[]): IMeasurementChart[] {
    if (!measurements || measurements.length === 0) return [];

    const sorted = [...measurements].sort((a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    const lastDate = new Date(sorted[sorted.length - 1].timestamp);
    const threeDaysAgo = new Date(lastDate);
    threeDaysAgo.setDate(lastDate.getDate() - 3);

    const filtered = sorted.filter(m => {
        const ts = new Date(m.timestamp);
        return ts >= threeDaysAgo;
    });

    return filtered.map(m => ({
        date: new Date(m.timestamp).getTime(),
        value: m.disp_mm
    }));
}
