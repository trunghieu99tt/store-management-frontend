import React, { useRef } from "react";

// talons
import { useRevenueStatistic } from "../../../talons/Revenue/useRevenueStatistic";

// utils
import mergeClasses from "../../../utils/mergeClasses";
import { formatNumber } from "../../../utils/helper";

// components
import { Form, Button, DatePicker, Empty } from "antd";
import ReactToPrint from "react-to-print";
import PrintPage from "../../Print/PrintPage";
import RevenueReport from "../RevenueReport";
import SmoothedLineChart from "../../CompareChart/SmoothedLineChart";

// styles
import defaultClasses from "./revenueStatistic.module.css";

interface Props {
    classes?: object;
}

const { RangePicker } = DatePicker;

const RevenueStatistic = ({ classes: propsClasses }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const { data, largest, smallest, total, option, handleGenerateStatistic } =
        useRevenueStatistic();

    const printComponentRef = useRef(null);

    return (
        <div className={classes.root}>
            <header className={classes.header}>
                <h2 className={classes.heading}>Thống kê doanh thu</h2>
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
                            <span>{formatNumber(largest?.amount || "")} </span>
                            đạt được vào ngày:
                            <span> {largest?.day}</span>
                        </li>
                        <li className={classes.statisticListItem}>
                            <strong>Tổng doanh thu : </strong>
                            <span> {formatNumber(total)}</span>
                        </li>
                        <div className={classes.print}>
                            <ReactToPrint
                                trigger={() => (
                                    <Button
                                        type="primary"
                                        className={classes.pdfBtn}
                                    >
                                        Xuất PDF
                                    </Button>
                                )}
                                content={() => printComponentRef.current}
                            />
                            <PrintPage ref={printComponentRef}>
                                <RevenueReport
                                    data={{
                                        largest,
                                        smallest,
                                        total,
                                    }}
                                    option={option}
                                    classes={classes}
                                />
                            </PrintPage>
                        </div>
                    </ul>
                </footer>
            )}
        </div>
    );
};

export default RevenueStatistic;
