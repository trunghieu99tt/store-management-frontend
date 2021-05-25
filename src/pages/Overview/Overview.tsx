import React from "react";

// components
import OverviewCard from "../../components/Cards/OverviewCard/OverviewCard";
import TwoLinesCompare from "../../components/CompareChart/TwoLineCompare";

// utils
import mergeClasses from "../../utils/mergeClasses";

// icons
import {
    DotChartOutlined,
    FundOutlined,
    HeatMapOutlined,
    StockOutlined,
} from "@ant-design/icons";

// styles
import defaultClasses from "./overview.module.css";

interface Props {
    classes?: object;
}

const Overview = ({ classes: propsClasses }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const testData = [
        {
            name: "Doanh thu",
            isInc: true,
            icon: <StockOutlined />,
            number: 19858890,
            percent: 0.36,
        },

        {
            name: "Lợi nhuận",
            isInc: false,
            icon: <FundOutlined />,
            number: 2858890,
            percent: 1.36,
        },

        {
            name: "Sản lượng",
            isInc: true,
            icon: <DotChartOutlined />,
            number: 1820,
            percent: 50.2,
        },

        {
            name: "Tỷ suất lợi nhuận",
            isInc: true,
            icon: <HeatMapOutlined />,
            number: 86.3,
            percent: 12.5,
        },
    ];

    return (
        <div className={classes.root}>
            {/* <section className={classes.overviewCards}>
                {testData.map((e, idx) => {
                    return <OverviewCard {...e} key={idx} />;
                })}
            </section> */}

            <section className={classes.compareRevenue}>
                <div>
                    <h4 className={classes.title}>
                        Thống kê doanh thu tháng trước và tháng hiện tại
                    </h4>
                    <TwoLinesCompare />
                </div>
            </section>
        </div>
    );
};

export default Overview;
