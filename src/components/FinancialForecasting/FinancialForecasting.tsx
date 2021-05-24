import { Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useExpense } from "../../talons/Expense/useExpense";
import { useRevenue } from "../../talons/Revenue/useRevenue";
import { iExpense } from "../../types/expense.types";
import { iRevenue } from "../../types/revenue.types";
import { formatNumber } from "../../utils/helper";

// utils
import mergeClasses from "../../utils/mergeClasses";
import OverviewCard from "../Cards/OverviewCard";
import Loading from "../Loading";

// classes
import defaultClasses from "./financialForecasting.module.css";

interface Props {
    classes?: object;
}

const columns = [
    {
        title: "Tháng",
        dataIndex: "month",
        key: "month",
    },
    {
        title: "Lợi nhuận",
        dataIndex: "profit",
        key: "profit",
        render: (value: number) => {
            return <strong>{formatNumber(value)}</strong>;
        },
    },
];

const FinancialForecasting = ({ classes: propsClasses }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);
    const [revenues, setRevenues] = useState<iRevenue[] | any>(null);
    const [expenses, setExpenses] = useState<iExpense[] | any>(null);
    const [data, setData] = useState<any>(null);
    const [forecast, setForecast] = useState<any>(null);

    const { fetchAllRevenues, fetchRevenuesInRange } = useRevenue();
    const { fetchExpenseInRange } = useExpense({ type: "BASE" });
    const { fetchExpenses } = useExpense({ type: "BASE" });

    const handleFetchAllExpenses = async () => {
        const data = await fetchExpenses();
        setExpenses(data.data);
    };

    const handleFetchAllRevenues = async () => {
        const data = await fetchAllRevenues();
        setRevenues(data);
    };

    useEffect(() => {
        handleFetchAllRevenues();
        handleFetchAllExpenses();
        handleFetchData();
    }, []);

    const handleFetchData = async () => {
        const { data, forecast } = await getFinancialData(
            fetchRevenuesInRange,
            fetchExpenseInRange
        );
        setData(data);
        setForecast(forecast);
    };

    // if(!revenues || !expenses){
    //     return <Loading />
    // }

    const revenueCount = revenues?.reduce(
        (prev: any, curr: any) => prev + curr.total,
        0
    );
    const expenseCount = expenses?.reduce(
        (prev: any, curr: any) => prev + curr.total,
        0
    );
    const profit = revenueCount - expenseCount;

    return (
        <section className={classes.root}>
            <OverviewCard name="Doanh thu" number={revenueCount || 0} />
            <br />
            <OverviewCard name="Lợi nhuận" number={profit || 0} />
            <br />
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: 12,
                    total: 12,
                }}
                scroll={{ x: "500px" }}
                loading={!revenues || !expenses || !data}
            />
            <p>
                Dự báo năm {new Date().getFullYear() + 1}: Tăng trưởng{" "}
                {forecast} %
            </p>
        </section>
    );
};

const getTotalRevenues = (monthlyRevenues: any) => {
    return monthlyRevenues?.reduce(
        (prev: any, curr: any) => prev + curr.total,
        0
    );
};

const getTotalExpenses = (monthlyExpenses: any) => {
    return monthlyExpenses?.reduce(
        (prev: any, curr: any) => prev + curr.total,
        0
    );
};

const getFinancialData = async (
    fetchRevenuesInRange: any,
    fetchExpenseInRange: any
) => {
    const currentYear = new Date().getFullYear();
    const getRevenueByMonth = async (monthNumber: number) => {
        let month = monthNumber.toString();
        if (monthNumber < 10) {
            month = "0" + monthNumber;
        }
        const dateFrom = moment(`${month}${currentYear}`, "MMYYYY")
            .toDate()
            .toLocaleDateString();
        const dateTo = moment(dateFrom)
            .endOf("month")
            .toDate()
            .toLocaleDateString();

        // console.log("dateFrom", dateFrom);
        // console.log("dateTo", dateTo);

        const revenues = await fetchRevenuesInRange(dateFrom, dateTo);
        const expenses = await fetchExpenseInRange(dateFrom, dateTo);

        const profit =
            getTotalRevenues(revenues.data) - getTotalExpenses(expenses.data);
        return profit;
        // console.log('data', data)
    };

    let data: any = [];
    let forecast = 0;
    for (let i = 1; i < 12; i++) {
        let value = 0;
        await getRevenueByMonth(i).then((r) => {
            value = r;
        });
        const item = {
            month: `Tháng ${i} -> Tháng ${i + 1}`,
            profit: value,
        };
        data.push(item);
    }
    return { data, forecast };
};

export default FinancialForecasting;
