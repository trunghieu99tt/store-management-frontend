import React from "react";

// talons
import { useFinancialForecasting } from "../../talons/FinancialForecasting/useFinancialForecasting";

// utils
import mergeClasses from "../../utils/mergeClasses";

// components
import { Table } from "antd";
import OverviewCard from "../Cards/OverviewCard";
import Loading from "../Loading";

// classes
import defaultClasses from "./financialForecasting.module.css";
import FinancialChart from "./FinancialChart/FinancialChart";
import ForecastChart from "./ForecastChart/ForecastChart";

interface Props {
    classes?: object;
}

const FinancialForecasting = ({ classes: propsClasses }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const { expenses, avgProfit, profits, revenues, forecastProfits } =
        useFinancialForecasting();

    if (
        !revenues ||
        !expenses ||
        !profits ||
        !revenues.length ||
        !expenses.length ||
        !profits.length
    ) {
        return <Loading />;
    }

    const totalExpense =
        expenses?.length > 0 &&
        expenses.reduce((res: number, curr: number) => (res += curr), 0);

    const totalProfit =
        profits?.length > 0 &&
        profits.reduce((res: number, curr: number) => (res += curr), 0);

    const totalRevenue =
        revenues?.length > 0 &&
        revenues.reduce((res: number, curr: number) => (res += curr), 0);

    const financialOption = {
        legend: {
            data: ["Doanh thu", "Chi phí", "Lợi nhuận"],
        },
        series: [
            {
                name: "Doanh thu",
                type: "bar",
                data: revenues,
            },
            {
                name: "Chi phí",
                type: "bar",
                data: expenses,
            },
            {
                name: "Lợi nhuận",
                type: "line",
                data: profits,
            },
        ],
    };

    const forecastOption = {
        series: [
            {
                type: "bar",
                showBackground: true,
                data: forecastProfits,
            },
        ],
    };

    return (
        <section className={classes.root}>
            <section className={classes.statistic}>
                <OverviewCard name="Tổng Chi phí" number={totalExpense || 0} />
                <OverviewCard
                    name="Tổng Doanh thu"
                    number={totalRevenue || 0}
                />
                <OverviewCard name="Tổng Lợi nhuận" number={totalProfit || 0} />
            </section>
            <FinancialChart
                title={`Thống kê chi phí, doanh thu và lợi nhuận năm ${new Date().getFullYear()}`}
                option={financialOption}
                width={"100%"}
                padding="2rem"
            />
            <p className={classes.summary}>
                Tăng trưởng trung bình mỗi tháng của năm{" "}
                {new Date().getFullYear()} là:
                <span
                    style={{
                        color: avgProfit > 0 ? "green" : "red",
                    }}
                >
                    {avgProfit} %
                </span>
            </p>
            <section className={classes.forecast}>
                <ForecastChart
                    title="Dự đoán lợi nhuận 2 năm tới:"
                    option={forecastOption}
                    width={1000}
                />
            </section>
        </section>
    );
};

export default FinancialForecasting;
