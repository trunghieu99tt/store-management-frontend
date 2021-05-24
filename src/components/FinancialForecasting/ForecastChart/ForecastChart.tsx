import React from "react";
import { merge } from "lodash";
import ReactEcharts from "echarts-for-react";
import { formatNumber } from "../../../utils/helper";

interface Props {
    title: string;
    option?: object;
    height?: number;
    width?: number | string;
    padding?: number | string;
}

const ForecastChart = ({
    title,
    option = {},
    height = 500,
    width = 500,
    padding = 0,
}: Props) => {
    const defaultOption = {
        title: {
            text: title,
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: (params: any) => {
                // console.log(`params`, params[0]);
                return `${formatNumber(params[0].data)} VND`;
            },
        },
        xAxis: {
            data: ["2022", "2023"],
            axisLabel: {
                inside: true,
                textStyle: {
                    color: "#fff",
                },
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            z: 10,
        },
        yAxis: {
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                textStyle: {
                    color: "#999",
                },
            },
        },
        dataZoom: [
            {
                type: "inside",
            },
        ],
    };

    return (
        <ReactEcharts
            key="theanhdz"
            style={{ height, width, padding }}
            option={merge({}, defaultOption, option)}
        />
    );
};

export default ForecastChart;
