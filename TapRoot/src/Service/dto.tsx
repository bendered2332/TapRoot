// Data base ones
export interface Reading {
    time: string;
    humidity: number;
}
// main object in the db
export interface DataEntry {
    date: string;
    readings: Reading[];
    id: number;
}
// Threshold screen
export interface ThresholdChartProps {
    data: DataEntry[];
}
  
export interface DbProps {
    data: DataEntry[];
}

