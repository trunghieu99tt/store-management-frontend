import { message } from "antd";
import moment from "moment";
import { useState } from "react";
import { iExpenseStatisticByDate } from "../../types/expense.types";
import { useExpense } from "./useExpense";

const useExpenseStatistic = () => {
    const [dataByDate, setDataByDate] =
        useState<iExpenseStatisticByDate[] | null>(null);
    const [optionByDate, setOptionByDate] = useState<any>(null);
    const [optionByType, setOptionByType] = useState<any>(null);

    const { fetchExpenseInRange } = useExpense({ type: "BASE" });

    const handleGenerateStatistic = async (values: any) => {
        const dateFrom = moment(values.dateRange[0])
            .toDate()
            .toLocaleDateString();
        const dateTo = moment(values.dateRange[1])
            .toDate()
            .toLocaleDateString();
        const data = await fetchExpenseInRange(dateFrom, dateTo);

        if (data.status === 200) {
            setDataByDate(data.data);
            generateDateStatistic(data.data);
            generateTypeStatistic(data.data);
        } else {
            message.error("Something went wrong. Please try again later");
        }
    };

    const generateDateStatistic = (data: any) => {
        const allData = [...data];
        const mappingData: any = {};
        allData.forEach((data: any) => {
            const { date, total } = data;
            const createdAt = date.slice(0, 10);
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
        setOptionByDate(newOption);
    };

    const generateTypeStatistic = (data: any) => {
        const allData = [...data];
        const mappingData: any = {
            "Mua s???m": 0,
            "Tr??? l????ng": 0,
            "Trang thi???t b???": 0,
        };
        allData.forEach((e: any) => {
            let type = "Mua s???m";
            if (e.hasOwnProperty("productID")) type = "Mua s???m";
            else if (e.hasOwnProperty("employeeID")) type = "Tr??? l????ng";
            else type = "Trang thi???t b???";
            mappingData[type] += e.total || 0;
        });
        const newOption = {
            series: [
                {
                    type: "pie",
                    radius: "50%",
                    data: Object.entries(mappingData).map(([key, value]) => {
                        return {
                            name: key,
                            value: value,
                        };
                    }),
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                        },
                    },
                },
            ],
        };
        setOptionByType(newOption);
    };

    return {
        data: dataByDate,
        optionByDate,
        optionByType,
        handleGenerateStatistic,
    };
};

export { useExpenseStatistic };
