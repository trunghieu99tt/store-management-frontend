import { iBudget } from "./budget.types";
import { iExpense } from "./expense.types";
import { iRevenue } from "./revenue.types";

interface iReportRow {
    date: Date;
    totalExpense: number;
    totalRevenue: number;
}

export interface iBaseReport {
    id?: number;
    reportDate: Date;
    description: string;
    dateFrom: Date;
    dateTo: Date;
    expense: number;
    revenue: number;
    budget: number;
    profit: number;
    staffID: number;
    reportFrom?: Date;
    reportTo?: Date;
    staff?: any;
}

export interface iReport extends iBaseReport {
    expenses: iExpense[];
    revenues: iRevenue[];
    budgets: iBudget[];
}

export interface iCustomReport extends iBaseReport {
    id?: number;
    row?: iReportRow[];
}
