import React from "react";
import { iReport } from "../../../types/report.types";
import { formatNumber } from "../../../utils/helper";
import mergeClasses from "../../../utils/mergeClasses";

import defaultClasses from "./reportSummary.module.css";

interface Props {
    classes?: object;
    data: Partial<iReport>;
}

const ReportSummary = ({ classes: propsClasses, data }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    if (!data || !data.budget || !data.expense || !data.profit) return null;

    console.log((data.expense * 100) / (data.budget > 0 ? data.budget : 1));

    const expensePercent =
        Math.round((data.expense * 1e4) / (data.budget > 0 ? data.budget : 1)) /
        100;

    return (
        <div className={classes.root}>
            <p>Tổng kết : </p>
            <p>
                Ngân sách:{" "}
                <strong
                    style={{
                        color: "green",
                    }}
                >
                    {formatNumber(data.budget)}
                </strong>
            </p>
            <p>
                Tổng chi:{" "}
                <strong
                    style={{
                        color: "red",
                    }}
                >
                    {formatNumber(data.expense)}
                </strong>
            </p>
            <p>
                Tổng thu:{" "}
                <strong
                    style={{
                        color: "green",
                    }}
                >
                    {formatNumber(data.revenue)}
                </strong>
            </p>
            <p>
                Lợi nhuận:{" "}
                <strong
                    style={{
                        color: `${data.profit > 0 ? "blue" : "red"}`,
                    }}
                >
                    {formatNumber(data.profit)}
                </strong>
            </p>
            <p>
                Phần trăm chi / ngân sách:{" "}
                <strong
                    style={{
                        color: `${expensePercent < 100 ? "green" : "red"}`,
                    }}
                >
                    {expensePercent}%
                </strong>
            </p>
            <p>
                Đơn vị: <strong>VND</strong>
            </p>
        </div>
    );
};

export default ReportSummary;
