import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

// talons
import { useRevenueList } from "../../../talons/Revenue/useRevenueList";

// utils
import mergeClasses from "../../../utils/mergeClasses";

// components
import { Button, DatePicker, Form, Space, Table } from "antd";

// icons
import { Eye, Edit3, Delete } from "react-feather";

// styles
import defaultClasses from "./revenueList.module.css";

// types
import { iRevenue } from "../../../types/revenue.types";
import { iBankAccount } from "../../../types/bankAccount.types";
import { iStaff } from "../../../types/user.types";
import { formatNumber } from "../../../utils/helper";

interface Props {
    classes?: object;
}

const RevenueList = ({ classes: propsClasses }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const {
        data,
        pageSize,
        loading,
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
            width: 100,
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            width: 250,
            sorter: (a: any, b: any) => NaN,
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            width: 250,
            render: (record: string) => {
                if (record.length > 50) return <p>{record.slice(0, 50)}...</p>;
                return <p>{record}</p>;
            },
        },
        {
            title: "Ngày",
            dataIndex: "createdAt",
            key: "createdAt",
            width: 200,
            render: (record: Date) => {
                return <p>{new Date(record).toLocaleDateString()}</p>;
            },
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            width: 150,
            sorter: (a: any, b: any) => NaN,
            render: (value: number) => {
                return <strong>{formatNumber(value)}</strong>;
            },
        },
        {
            title: "Đơn giá",
            dataIndex: "priceUnit",
            key: "priceUnit",
            width: 150,
            sorter: (a: any, b: any) => NaN,
            render: (value: number) => {
                return <strong>{formatNumber(value)}</strong>;
            },
        },
        {
            title: "Tổng tiền (VND)",
            dataIndex: "total",
            key: "total",
            width: 200,
            sorter: (a: any, b: any) => NaN,
            render: (value: number) => {
                return <strong>{formatNumber(value)}</strong>;
            },
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
                    <button className={cn(classes.btn, classes.view)}>
                        <Link to={`/revenue/view/${record.id}`}>
                            <Eye />
                        </Link>
                    </button>
                    <button className={cn(classes.btn, classes.edit)}>
                        <Link to={`/revenue/edit/${record.id}`}>
                            <Edit3 />
                        </Link>
                    </button>
                    <button
                        className={cn(classes.btn, classes.delete)}
                        onClick={() => onDelete(record.id)}
                    >
                        <Delete />
                    </button>
                </Space>
            ),
            width: 200,
            fixed: "right" as "right",
        },
    ];

    return (
        <div className={classes.root}>
            <header className={classes.header}>
                <Link to="/revenue/add">
                    <Button type="primary">Thêm mới</Button>
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
                onChange={handleChangeTable}
                scroll={{ x: "500px" }}
                loading={loading}
            />
        </div>
    );
};

export default RevenueList;
