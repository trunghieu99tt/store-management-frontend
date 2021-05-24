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
    const [largest, setLargest] =
        useState<{
            day: String | Date;
            amount: Number;
        } | null>(null);
    const [smallest, setSmallest] =
        useState<{
            day: String | Date;
            amount: Number;
        } | null>(null);
    const [total, setTotal] = useState<Number>(0);

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
            let tempLargest = {
                day: new Date(),
                amount: 0,
            };
            let tempSmallest = {
                day: new Date(),
                amount: Number.MAX_SAFE_INTEGER,
            };

            let sum = 0;

            allData.forEach((data: any) => {
                const { createdAt, total } = data;

                if (total > tempLargest.amount) {
                    tempLargest = {
                        day: createdAt.toLocaleString(),
                        amount: total,
                    };
                }

                if (total < tempSmallest.amount) {
                    tempSmallest = {
                        day: createdAt.toLocaleString(),
                        amount: total,
                    };
                }

                sum += total;

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
                                return (
                                    a &&
                                    a[0] &&
                                    b &&
                                    b[0] &&
                                    a[0].localeCompare(b[0])
                                );
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
            setTotal(sum);
            setLargest(tempLargest);
            setSmallest(tempSmallest);
        } else {
            message.error("Something went wrong. Please try again later");
        }
    };

    return {
        data,
        total,
        option,
        largest,
        smallest,

        handleGenerateStatistic,
    };
};

export { useRevenueStatistic };
