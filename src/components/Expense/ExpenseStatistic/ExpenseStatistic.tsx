import React from "react";
import mergeClasses from "../../../utils/mergeClasses";

import defaultClasses from "./expenseStatistic.module.css";
import { Form, DatePicker, Button, Empty } from "antd";
import { useExpenseStatistic } from "../../../talons/Expense/useExpenseStatistic";
import SmoothedLineChart from "../../CompareChart/SmoothedLineChart/SmoothedLineChart";
import PieChart from "../../CompareChart/PieChart";

interface Props {
    classes?: object;
}

const { RangePicker } = DatePicker;

const ExpenseStatistic = ({ classes: propsClasses }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const { data, optionByDate, optionByType, handleGenerateStatistic } =
        useExpenseStatistic();

    return (
        <div className={classes.root}>
            <header className={classes.header}>
                <h2 className={classes.heading}>Thống kê chi phí </h2>

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
                            Xem thống kê
                        </Button>
                    </Form.Item>
                </Form>
            </header>
            {(data && (
                <div className={classes.main}>
                    <div className={classes.item}>
                        <SmoothedLineChart
                            title="Thống kê chi phí"
                            option={optionByDate}
                            width={"100%"}
                            padding="2rem"
                        />
                    </div>
                    <div className={classes.item}>
                        <PieChart
                            title="Thống kê theo loại chi phí"
                            option={optionByType}
                            width={"100%"}
                            padding="2rem"
                        />
                    </div>
                </div>
            )) || <Empty description={false} />}
        </div>
    );
};

export default ExpenseStatistic;
