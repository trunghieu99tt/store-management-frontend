import { useExpense } from "../Expense/useExpense";
import { useRevenue } from "../Revenue/useRevenue";
import moment from "moment";
import { useEffect, useState } from "react";

const useFinancialForecasting = () => {
    const [expenses, setExpenses] = useState<number[]>([]);
    const [revenues, setRevenues] = useState<number[]>([]);
    const [profits, setProfits] = useState<number[]>([]);
    const [avgProfit, setAvgProfit] = useState<number>(0);
    const [forecastProfits, setForecastProfits] = useState<number[]>([]);

    const { fetchRevenuesInRange } = useRevenue();
    const { fetchExpenseInRange } = useExpense({ type: "BASE" });

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (profits?.length > 1) {
            calcForecast();
        }
    }, [profits]);

    const getTotal = (data: any): number =>
        data?.reduce((prev: any, curr: any) => prev + curr.total, 0);

    const getData = async () => {
        const revenueArr: number[] = [...Array(12)].map(() => 0);
        const expenseArr: number[] = [...Array(12)].map(() => 0);
        const profitArr: number[] = [...Array(12)].map(() => 0);

        await Promise.all(
            [...Array(12)].map(async (e: any, monthNumber: number) => {
                const month = `${monthNumber + 1 < 10 ? "0" : ""}${
                    monthNumber + 1
                }`;
                const currentYear = new Date().getFullYear();
                const dateFrom = moment(`${month}${currentYear}`, "MMYYYY")
                    .toDate()
                    .toLocaleDateString();
                const dateTo = moment(dateFrom)
                    .endOf("month")
                    .toDate()
                    .toLocaleDateString();

                const revenuesData = await fetchRevenuesInRange(
                    dateFrom,
                    dateTo
                );
                const expensesData = await fetchExpenseInRange(
                    dateFrom,
                    dateTo
                );

                const revenue = getTotal(revenuesData.data);
                const expense = getTotal(expensesData.data);
                const profit = revenue - expense;

                revenueArr[monthNumber] = revenue;
                expenseArr[monthNumber] = expense;
                profitArr[monthNumber] = profit;
            })
        );

        setExpenses(expenseArr);
        setRevenues(revenueArr);
        setProfits(profitArr);
    };

    const calcForecast = () => {
        let calc: number = 0;
        for (let idx = 1; idx <= Math.min(profits.length, 11); idx += 1) {
            calc += (profits[idx] / Math.max(profits[idx - 1], 1)) * 100 - 100;
        }
        calc /= 11;
        // round to 2 numbers after decimal
        calc = Math.round(calc * 100) / 100;
        setAvgProfit(calc);
        let currProfit = profits.reduce(
            (res: number, curr: number) => res + curr,
            0
        );
        const futureProfits: number[] = [];

        for (let idx = 0; idx < 2; idx += 1) {
            currProfit *= (1 + calc/100);
            futureProfits.push(currProfit);
        }
        setForecastProfits(futureProfits);
    };

    return {
        expenses,
        revenues,
        profits,
        avgProfit,
        forecastProfits,
    };
};

export { useFinancialForecasting };
