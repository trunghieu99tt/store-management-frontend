import React from "react";
import { Table } from "antd";
import { iCustomReport } from "../../../types/report.types";

import classes from "./reportDetail.module.css";

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
        },
        {
            title: "Tổng chi",
            dataIndex: "totalExpense",
            width: 100,
        },
        {
            title: "Lợi nhuận",
            dataIndex: "profit",
            width: 100,
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
                        <div className={classes.summaryInfo}>
                            <p>Tổng kết : </p>
                            <p>
                                Tổng chi: <strong>{data.expense}</strong>
                            </p>
                            <p>
                                Tổng thu: <strong>{data.revenue}</strong>
                            </p>
                            <p>
                                Lợi nhuận: <strong>{data.profit}</strong>
                            </p>
                            <p>
                                Đơn vị: <strong>VND</strong>
                            </p>
                        </div>

                        <div>Mô tả : {data.description}</div>

                        <div className={classes.staffInfo}>
                            <p>Nhân viên lập báo cáo: </p>
                            <p>
                                Ten: <strong>{data.staff.name}</strong>
                            </p>
                            <p>
                                {" "}
                                Chức vụ:
                                <strong>{data.staff.role}</strong>
                            </p>
                            <p>
                                Số điện thoại:{" "}
                                <strong>{data.staff.phoneNumber}</strong>
                            </p>
                            <p>
                                Phòng ban:{" "}
                                <strong>{data.staff.department}</strong>
                            </p>
                            <p>
                                Địa chỉ email :{" "}
                                <strong>{data.staff.email}</strong>
                            </p>
                        </div>
                    </div>
                );
            }}
        />
    );
};

export default ReportDetail;
