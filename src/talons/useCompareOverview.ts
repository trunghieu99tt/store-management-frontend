import { message } from "antd";
import { iRevenue } from "../types/revenue.types";
import { useRevenue } from "./Revenue/useRevenue";

const useCompareOverview = () => {
    const { fetch2NearestMonths } = useRevenue();

    const parse2NearestMonthData = async () => {
        const response = await fetch2NearestMonths();
        if (response.status !== 200) {
            message.error("Fetching Error");
        } else {
            const data = response.data;
            const today = new Date();
            const currMonth = today.getMonth();
            const currMonthData = [...Array(7)].map(() => 0);
            const prevMonthData = [...Array(7)].map(() => 0);
            data.forEach((item: iRevenue) => {
                const { createdAt, total } = item;
                const date = new Date(createdAt);
                const dayOfWeek = date.getDay();
                if (date.getMonth() === currMonth) {
                    currMonthData[dayOfWeek] += total;
                } else {
                    prevMonthData[dayOfWeek] += total;
                }
            });

            return {
                currMonthData: currMonthData,
                prevMonthData: prevMonthData,
            };
        }
    };

    return { parse2NearestMonthData };
};

export { useCompareOverview };
