import { atom } from "recoil";
import { iStudent } from "../types/app.types";

export const authState = atom<boolean>({
    key: "authState",
    default: false,
});

export const studentState = atom<iStudent[]>({
    key: "studentState",
    default: [],
});
