export interface IMeasurement {
    timestamp: string;
    disp_mm: number;
}

export interface ISensorMeasurement {
    id: string;
    measurements: IMeasurement[];
}
