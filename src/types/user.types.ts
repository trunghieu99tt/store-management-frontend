export interface iUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    role: string;
}

export interface iStaff extends iUser {
    department: string;
}

export interface iManager extends iUser {
    position: string;
}

export type TUser = "manager" | "staff";
