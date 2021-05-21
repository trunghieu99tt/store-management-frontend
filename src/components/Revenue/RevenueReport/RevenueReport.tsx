import React from "react";
import { formatNumber } from "../../../utils/helper";
import SmoothedLineChart from "../../CompareChart/SmoothedLineChart";

interface Props {
    data: any;
    option: any;
    classes: any;
}

const RevenueReport = ({ data, option, classes }: Props) => {
    const { smallest, largest, total } = data;

    return (
        <div className={classes.root}>
            <div className={classes.main}>
                <SmoothedLineChart
                    title="Thống kê doanh thu"
                    option={option}
                    width="700px"
                />
            </div>
            <footer className={classes.footer}>
                <ul className={classes.statisticList}>
                    <li className={classes.statisticListItem}>
                        <strong>Doanh thu nhỏ nhất: </strong>
                        <span>{smallest?.amount} </span>
                        đạt được vào ngày:
                        <span> {smallest?.day}</span>
                    </li>
                    <li className={classes.statisticListItem}>
                        <strong>Doanh thu lớn nhất: </strong>
                        <span>{formatNumber(largest?.amount || "")} </span>
                        đạt được vào ngày:
                        <span> {largest?.day}</span>
                    </li>
                    <li className={classes.statisticListItem}>
                        <strong>Tổng doanh thu : </strong>
                        <span> {formatNumber(total)}</span>
                    </li>
                </ul>
            </footer>
        </div>
    );
};

export default RevenueReport;
