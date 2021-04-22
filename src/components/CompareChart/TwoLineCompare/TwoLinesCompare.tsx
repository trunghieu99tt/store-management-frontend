import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";

import classes from "./twoLinesCompare.module.css";
import { useCompareOverview } from "../../../talons/useCompareOverview";

const TwoLinesCompare = () => {
    const [option, setOption] = useState<any>(null);

    const { parse2NearestMonthData } = useCompareOverview();

    useEffect(() => {
        parseData();
    }, []);

    const parseData = async () => {
        const data = await parse2NearestMonthData();
        if (!data) return;
        const { currMonthData, prevMonthData } = data;
        setOption({
            tooltip: {
                trigger: "axis",
            },
            legend: {
                data: ["Tháng trước", "Tháng hiện tại"],
            },
            grid: {
                left: "3%",
                right: "4%",
                containLabel: true,
            },
            toolbox: {
                feature: {
                    saveAsImage: {},
                },
            },
            xAxis: {
                type: "category",
                data: [
                    "Thứ 2",
                    "Thứ 3",
                    "Thứ 4",
                    "Thứ 5",
                    "Thứ 6",
                    "Thứ 7",
                    "Chủ nhật",
                ],
            },
            yAxis: {
                type: "value",
            },
            series: [
                {
                    name: "Tháng trước",
                    type: "line",
                    barGap: 0,
                    emphasis: {
                        focus: "series",
                    },
                    data: prevMonthData,
                },
                {
                    name: "Tháng hiện tại",
                    type: "line",
                    barGap: 0,
                    emphasis: {
                        focus: "series",
                    },
                    data: currMonthData,
                },
            ],
        });
    };

    return (
        <div className={classes.root}>
            <ReactEcharts
                style={{ height: 500, width: "100%" }}
                option={option}
            />
        </div>
    );
};

export default TwoLinesCompare;
