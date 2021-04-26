import { iBankAccount } from "./bankAccount.types";
import { iStaff, iUser } from "./user.types";

export interface iExpense {
    date: Date;
    description: string;
    total: number;
    paymentMethod: string;
    bankAccount: iBankAccount;
    staff: iStaff;
}

export interface iEmployeeSalary extends iExpense {
    user: iUser;
    name: string;
}

export interface iService extends iExpense {
    name: string;
}

export interface iShopping extends iExpense {
    productID: number;
    name: string;
    quantity: number;
    priceUnit: number;
}

export type TExpense = "BASE" | "EMPLOYEE_SALARY" | "SERVICE" | "SHOPPING";

export interface iExpenseStatisticByDate {
    date: string;
    value: number;
}
