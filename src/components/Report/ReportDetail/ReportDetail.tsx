import React from "react";

// components
import ReportStaffInfo from "../ReportStaffInfo";
import ReportSummary from "../ReportSummary";
import { Table } from "antd";

// styles
import classes from "./reportDetail.module.css";

// types
import { iCustomReport } from "../../../types/report.types";
import { formatNumber } from "../../../utils/helper";

interface Props {
    data: iCustomReport;
}

const ReportDetail = ({ data }: Props) => {
    const columns = [
        {
            title: "Mã",
            dataIndex: "id",
            width: 50,
        },
        {
            title: "Ngày",
            dataIndex: "date",
            width: 100,
        },
        {
            title: "Tổng thu",
            dataIndex: "totalRevenue",
            width: 100,
            render: (value: number) => {
                return <strong>{formatNumber(value)} VND</strong>;
            },
        },
        {
            title: "Tổng chi",
            dataIndex: "totalExpense",
            width: 100,
            render: (value: number) => {
                return <strong>{formatNumber(value)} VND</strong>;
            },
        },
        {
            title: "Lợi nhuận",
            dataIndex: "profit",
            width: 100,
            render: (value: number) => {
                return <strong>{formatNumber(value)} VND</strong>;
            },
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data?.row}
            pagination={false}
            bordered
            title={() => (
                <strong>
                    Báo cáo thống kê từ ngày{" "}
                    {new Date(
                        (data && data.dateFrom) || (data && data.reportFrom)
                    ).toLocaleDateString()}
                    đến{" "}
                    {new Date(
                        (data && data.dateTo) || (data && data.reportTo)
                    ).toLocaleDateString()}
                </strong>
            )}
            footer={() => {
                if (!data) return <p>Loading...</p>;
                return (
                    <div className={classes.summary}>
                        <ReportSummary
                            data={{
                                budget: (data && data.budget) || 0,
                                expense: data.expense || 0,
                                profit: data.profit || 0,
                            }}
                        />
                        <div>Mô tả : {data.description}</div>

                        <ReportStaffInfo data={data.staff} />
                    </div>
                );
            }}
        />
    );
};

export default ReportDetail;
