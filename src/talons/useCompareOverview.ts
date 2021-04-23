import { message } from "antd";
import { useState } from "react";
import { iRevenue } from "../types/revenue.types";
import { useRevenue } from "./Revenue/useRevenue";

const useCompareOverview = () => {
    const { fetch2NearestMonths } = useRevenue();

    const [loading, setLoading] = useState<boolean>(false);

    const parse2NearestMonthData = async () => {
        setLoading(true);
        const response = await fetch2NearestMonths();
        setLoading(false);
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

    return { loading, parse2NearestMonthData };
};

export { useCompareOverview };
