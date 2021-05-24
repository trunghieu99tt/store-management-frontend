import React from "react";
import { merge } from "lodash";
import ReactEcharts from "echarts-for-react";

interface Props {
    title: string;
    option?: object;
    height?: number;
    width?: number | string;
    padding?: number | string;
}

const FinancialChart = ({
    title,
    option = {},
    height = 500,
    width = 500,
    padding = 0,
}: Props) => {
    const defaultOptions = {
        title: {
            text: title,
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
                crossStyle: {
                    color: "#999",
                },
            },
        },
        toolbox: {
            feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ["line", "bar"] },
                restore: { show: true },
                saveAsImage: { show: true },
            },
        },
        xAxis: [
            {
                type: "category",
                data: [...Array(12)].map(
                    (e, idx: number) => `Tháng ${idx + 1}`
                ),
                axisPointer: {
                    type: "shadow",
                },
            },
        ],
        yAxis: [
            {
                type: "value",
                name: "VNĐ",
                min: 0,
            },
        ],
    };

    return (
        <ReactEcharts
            style={{ height, width, padding }}
            option={merge({}, defaultOptions, option)}
        />
    );
};

export default FinancialChart;
