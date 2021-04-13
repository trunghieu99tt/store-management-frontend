export type FORM_TYPE = "ADD" | "EDIT" | "VIEW";

export interface iStudent {
    id: string;
    name: string;
    studentId: string;
    department: string;
    fee: number;
    paymentDate?: any | null;
    paid?: number | null;
    owe?: number | null;
    ok?: boolean | null;
}

export interface Size {
    width: number | undefined;
    height: number | undefined;
}
