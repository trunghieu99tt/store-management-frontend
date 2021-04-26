import { useRevenue } from "./useRevenue";

import moment from "moment";
import { useState } from "react";
import { iRevenueStatistic } from "../../types/revenue.types";
import { message } from "antd";

/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html}
 * that provides revenue statistic logic
 * @kind function.
 *
 *
 * @return {{
 * option: object,
 * data: iRevenueStatistic,
 * handleGenerateStatistic: func
 * }}
 *
 * */

const useRevenueStatistic = () => {
    const [data, setData] = useState<iRevenueStatistic[] | null>(null);
    const [option, setOption] = useState<any>(null);

    const { fetchRevenuesInRange } = useRevenue();

    const handleGenerateStatistic = async (values: any) => {
        const dateFrom = moment(values.dateRange[0])
            .toDate()
            .toLocaleDateString();
        const dateTo = moment(values.dateRange[1])
            .toDate()
            .toLocaleDateString();
        const data = await fetchRevenuesInRange(dateFrom, dateTo);

        if (data.status === 200) {
            setData(data.data);
            const allData = data.data;
            const mappingData: any = {};
            allData.forEach((data: any) => {
                const { createdAt, total } = data;

                if (mappingData.hasOwnProperty(createdAt)) {
                    mappingData[createdAt] += total;
                } else {
                    mappingData[createdAt] = total;
                }
            });
            const newOption = {
                series: [
                    {
                        data: Object.entries(mappingData)
                            .sort((a: any, b: any) => {
                                return a[0].localeCompare(b[0]);
                            })
                            .map(([day, value]) => {
                                return {
                                    name: day,
                                    value: [day, value],
                                };
                            }),
                        type: "line",
                        smooth: true,
                    },
                ],
            };
            setOption(newOption);
        } else {
            message.error("Something went wrong. Please try again later");
        }
    };

    return {
        data,
        option,
        handleGenerateStatistic,
    };
};

export { useRevenueStatistic };
