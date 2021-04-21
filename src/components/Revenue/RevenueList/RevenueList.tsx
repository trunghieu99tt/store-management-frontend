import { Button, DatePicker, Form, Input, Space, Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useRevenueList } from "../../../talons/Revenue/useRevenueList";
import { iRevenue } from "../../../types/revenue.types";
import mergeClasses from "../../../utils/mergeClasses";

// styles
import defaultClasses from "./revenueList.module.css";

interface Props {
    classes?: object;
}

const RevenueList = ({ classes: propsClasses }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const {
        data,
        pageSize,

        onDelete,
        handleSearch,
        handleChangeTable,
    } = useRevenueList();

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            width: 300,
        },

        {
            title: "Tổng tiền",
            dataIndex: "total",
            key: "total",
            width: 300,
        },

        {
            title: "Phương thức thanh toán",
            dataIndex: "paymentMethod",
            key: "paymentMethod",
            width: 300,
        },

        {
            title: "Mã tài khoản ngân hàng",
            dataIndex: "bankAccountID",
            key: "bankAccountID",
            width: 300,
        },

        {
            title: "Thao tác",
            key: "action",
            render: (text: any, record: iRevenue) => (
                <Space size="middle">
                    <Link to={`/student/view/${record.id}`}>
                        <Button type="primary">Xem chi tiết</Button>
                    </Link>
                    <Button
                        type="primary"
                        danger
                        onClick={() => onDelete(record.id)}
                    >
                        Xóa
                    </Button>
                </Space>
            ),
            width: 300,
        },
    ];

    return (
        <div className={classes.root}>
            <div className={classes.header}>
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
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: pageSize,
                    total: data.length,
                }}
                onChange={handleChangeTable}
                scroll={{ x: "500px" }}
            />
        </div>
    );
};

export default RevenueList;
