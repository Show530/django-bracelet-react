export interface Bracelet {
    id: string;
    name: string;
    pattern_url: string | null;
    bType: string;
    startDate: string;
    endDate: string;
    numColors: number | null;
    bLength: string;
    numStrings: number | null;
    goingWhere: string;
    price: number | null;
}