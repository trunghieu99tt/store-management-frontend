export interface iUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    role: string;
    department?: string;
    position?: string;
}

export interface iStaff extends iUser {
    department: string;
}
