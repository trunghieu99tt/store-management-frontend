import { Button, DatePicker, Form, Space, Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useReportList } from "../../../talons/Report/useReportList";
import { iCustomReport } from "../../../types/report.types";
import { iStaff } from "../../../types/user.types";

import classes from "./reportList.module.css";

interface Props {}

const ReportList = (props: Props) => {
    const { data, pageSize, loading, totalNumber, handleSearch } =
        useReportList();

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Ngày tạo",
            dataIndex: "reportDate",
            key: "reportDate",
            width: 300,
            render: (record: Date) => {
                return <p>{new Date(record).toLocaleDateString()}</p>;
            },
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            width: 300,
        },

        {
            title: "Người tạo",
            dataIndex: "staff",
            key: "staff",
            width: 300,
            render: (record: iStaff) => {
                return (
                    <p>
                        {record.id} - {record.name}
                    </p>
                );
            },
        },

        {
            title: "Thao tác",
            key: "action",
            render: (text: any, record: iCustomReport) => (
                <Space size="middle">
                    <Link to={`/report/${record.id}`}>
                        <Button type="primary">Xem</Button>
                    </Link>
                </Space>
            ),
            width: 300,
        },
    ];

    return (
        <div className={classes.root}>
            <header className={classes.header}>
                <Link to="/report/generate">
                    <Button type="primary">Tạo báo cáo</Button>
                </Link>

                <div className={classes.search}>
                    <Form layout="inline" onFinish={handleSearch}>
                        <Form.Item label="Tìm kiếm theo ngày" name="createdAt">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Tìm kiếm
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </header>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: pageSize,
                    total: totalNumber,
                    pageSizeOptions: ["10", "20", "30"],
                }}
                scroll={{ x: "500px" }}
                loading={loading}
            />
        </div>
    );
};

export default ReportList;
