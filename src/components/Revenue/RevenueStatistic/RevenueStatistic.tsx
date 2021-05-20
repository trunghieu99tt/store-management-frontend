import React from "react";

// utils
import mergeClasses from "../../../utils/mergeClasses";

// components
import { Form, Button, DatePicker, Empty } from "antd";

import defaultClasses from "./revenueStatistic.module.css";
import { useRevenueStatistic } from "../../../talons/Revenue/useRevenueStatistic";
import SmoothedLineChart from "../../CompareChart/SmoothedLineChart";

interface Props {
    classes?: object;
}

const { RangePicker } = DatePicker;

const RevenueStatistic = ({ classes: propsClasses }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const { data, largest, smallest, total, option, handleGenerateStatistic } =
        useRevenueStatistic();

    return (
        <div className={classes.root}>
            <header className={classes.header}>
                <Form layout="inline" onFinish={handleGenerateStatistic}>
                    <Form.Item
                        label="Xem thống kê theo khoảng ngày"
                        name="dateRange"
                        rules={[
                            {
                                required: true,
                                message: "Xin hãy chọn khoảng để xem thống kê",
                            },
                        ]}
                    >
                        <RangePicker />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Trích xuất
                        </Button>
                    </Form.Item>
                </Form>
            </header>
            <div className={classes.main}>
                {(data && (
                    <SmoothedLineChart
                        title="Thống kê doanh thu"
                        option={option}
                        width="100%"
                    />
                )) || <Empty description={false} />}
            </div>
            {data && (
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
                            <span>{largest?.amount} </span>
                            đạt được vào ngày:
                            <span> {largest?.day}</span>
                        </li>
                        <li className={classes.statisticListItem}>
                            <strong>Tổng doanh thu : </strong>
                            <span> {total}</span>
                        </li>
                    </ul>
                </footer>
            )}
        </div>
    );
};

export default RevenueStatistic;
