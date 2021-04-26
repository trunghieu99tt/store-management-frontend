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

    const {
        data,
        optionByDate,
        optionByType,
        handleGenerateStatistic,
    } = useExpenseStatistic();

    console.log(`optionByType`, optionByType);

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
                    <React.Fragment>
                        <SmoothedLineChart
                            title="Thống kê chi phí"
                            option={optionByDate}
                            width={"100%"}
                        />
                        <PieChart
                            title="Thống kê theo loại chi phí"
                            option={optionByType}
                            width={"100%"}
                        />
                    </React.Fragment>
                )) || <Empty description={false} />}
            </div>
        </div>
    );
};

export default ExpenseStatistic;
