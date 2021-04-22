import { atom } from "recoil";
import { iRevenue } from "../types/revenue.types";

export const revenueState = atom<iRevenue[]>({
    key: "revenueState",
    default: [],
});
