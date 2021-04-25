import { iBankAccount } from "./bankAccount.types";

export interface iExpense {
    date: Date;
    description: string;
    total: string;
    paymentMethod: string;
    bankAccount: iBankAccount;
}
