import React from "react";
import ReactEcharts from "echarts-for-react";
import { merge } from "lodash";

// utils
import mergeClasses from "../../../utils/mergeClasses";

// components
import { Form, Button, DatePicker, Empty } from "antd";

import defaultClasses from "./revenueStatistic.module.css";
import { useRevenueStatistic } from "../../../talons/Revenue/useRevenueStatistic";

interface Props {
    classes?: object;
}

const { RangePicker } = DatePicker;

const RevenueStatistic = ({ classes: propsClasses }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const { data, option, handleGenerateStatistic } = useRevenueStatistic();

    const defaultOption = {
        title: {
            text: "Thống kê doanh thu",
        },
        tooltip: {
            trigger: "axis",
            formatter: function (params: any) {
                params = params[0];
                var date = new Date(params.name);
                return (
                    date.getDate() +
                    "/" +
                    (date.getMonth() + 1) +
                    "/" +
                    date.getFullYear() +
                    " : " +
                    params.value[1]
                );
            },
            axisPointer: {
                animation: false,
            },
        },
        xAxis: {
            type: "time",
            splitLine: {
                show: true,
            },
        },
        yAxis: {
            type: "value",
            boundaryGap: [0, "100%"],
            splitLine: {
                show: false,
            },
        },
        dataZoom: [
            {
                show: true,
                type: "inside",
                filterMode: "none",
                xAxisIndex: [0],
            },
            {
                show: true,
                type: "inside",
                filterMode: "none",
                yAxisIndex: [0],
            },
        ],
    };

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
                    <ReactEcharts
                        style={{ height: 500 }}
                        option={merge({}, defaultOption, option)}
                    />
                )) || <Empty description={false} />}
            </div>
        </div>
    );
};

export default RevenueStatistic;
