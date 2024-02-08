// Data base ones
export interface Reading {
    time: string;
    humidity: number;
}

export interface DataEntry {
    date: string;
    readings: Reading[];
    id: number;
}
// Threshold screen
export interface ThresholdChartProps {
    data: DataEntry[];
}
  


