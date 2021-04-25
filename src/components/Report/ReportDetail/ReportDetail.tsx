import { Form, Table } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
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
                <p>
                    Báo cáo thống kê từ ngày{" "}
                    {new Date(
                        (data && data.dateFrom) || (data && data.reportFrom)
                    ).toLocaleDateString()}
                    đến{" "}
                    {new Date(
                        (data && data.dateTo) || (data && data.reportTo)
                    ).toLocaleDateString()}
                </p>
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

                        <Form key={Math.random()}>
                            <Form.Item
                                label="Mô tả báo cáo"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Xin hãy nhập mô tả cho báo cáo",
                                    },
                                ]}
                            >
                                <TextArea
                                    disabled
                                    defaultValue={data.description}
                                />
                            </Form.Item>
                            <div className={classes.staffInfo}>
                                <p>Nhân viên lập báo cáo: </p>
                                <p>Ten: {data.staff.name}</p>
                                <p> Chức vụ: {data.staff.name}</p>
                                <p>Số điện thoại: {data.staff.phoneNumber}</p>
                                <p>Phòng ban: {data.staff.department}</p>
                                <p>Địa chỉ email : {data.staff.email}</p>
                            </div>
                        </Form>
                    </div>
                );
            }}
        />
    );
};

export default ReportDetail;
