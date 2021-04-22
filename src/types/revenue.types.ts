import { iBankAccount } from "./bankAccount.types";
import { iStaff } from "./user.types";

export interface iRevenue {
    id: number;
    name: string;
    total: number;
    staff: iStaff;
    createdAt: Date;
    quantity: number;
    priceUnit: number;
    description: string;
    bankAccount: iBankAccount;
}

export interface iRevenueDTO {
    name: string;
    total: number;
    staffID: number;
    quantity: number;
    description: string;
    bankAccountNumber: number;
}

export interface iRevenueStatistic {
    date: string;
    value: number;
}
