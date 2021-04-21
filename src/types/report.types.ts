export interface iReport {
    id: string;
    reportDate: Date;
    description: string;
    reportFrom: Date;
    reportTo: Date;
    expense: number;
    revenue: number;
    profit: number;
}
