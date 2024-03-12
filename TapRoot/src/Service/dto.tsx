// Data base ones
export interface Reading {
    time: string;
    humidity: number;
}
// main object in the db
export interface DataEntry {
    date: string;
    readings: Reading[];
    id: string;
}
// Threshold screen
export interface ThresholdChartProps {
    data: DataEntry[];
}
  
export interface DbProps {
    data: DataEntry[];
}

export interface ThresholdLimitProps {
    data: DataEntry;
}
export interface Limit {
    min: number;
    max: number;
}

export interface ChipsProps {
    data: HistoryChip[];
    onSelectedChipsChange: (selectedChips: string[]) => void;
}
export interface HistoryChip {
    date: string;
    id: string;
}
