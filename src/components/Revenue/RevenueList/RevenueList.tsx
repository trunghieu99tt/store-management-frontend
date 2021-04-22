import React from "react";
import { Link } from "react-router-dom";

// talons
import { useRevenueList } from "../../../talons/Revenue/useRevenueList";

// utils
import mergeClasses from "../../../utils/mergeClasses";

// components
import { Button, DatePicker, Form, Space, Table } from "antd";

// styles
import defaultClasses from "./revenueList.module.css";

// types
import { iRevenue } from "../../../types/revenue.types";
import { iBankAccount } from "../../../types/bankAccount.types";
import { iStaff } from "../../../types/user.types";

interface Props {
    classes?: object;
}

const RevenueList = ({ classes: propsClasses }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const {
        data,
        pageSize,
        totalNumber,

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
            title: "Tên",
            dataIndex: "name",
            key: "name",
            width: 300,
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            width: 300,
            render: (record: string) => {
                if (record.length > 50) return <p>{record.slice(0, 50)}...</p>;
                return <p>{record}</p>;
            },
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            width: 300,
            render: (record: Date) => {
                return <p>{new Date(record).toLocaleDateString()}</p>;
            },
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            width: 150,
        },
        {
            title: "Đơn giá",
            dataIndex: "priceUnit",
            key: "priceUnit",
            width: 150,
        },
        {
            title: "Tổng tiền",
            dataIndex: "total",
            key: "total",
            width: 150,
        },

        {
            title: "Số tài khoản ngân hàng",
            dataIndex: "bankAccount",
            key: "bankAccount",
            width: 300,
            render: (record: iBankAccount) => {
                return <p>{record.accountNumber}</p>;
            },
        },
        {
            title: "Nhân viên ",
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
            render: (text: any, record: iRevenue) => (
                <Space size="middle">
                    <Link to={`/revenue/view/${record.id}`}>
                        <Button type="primary">Xem</Button>
                    </Link>
                    <Link to={`/revenue/edit/${record.id}`}>
                        <Button type="primary">Sửa</Button>
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
            <Link to="/revenue/add">
                <Button type="primary">Thêm mới</Button>
            </Link>

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
                    total: totalNumber,
                }}
                onChange={handleChangeTable}
                scroll={{ x: "500px" }}
            />
        </div>
    );
};

export default RevenueList;
