import { atom } from "recoil";
import { iUser } from "../types/user.types";

export const userState = atom<iUser | null>({
    key: "user",
    default: null,
});
