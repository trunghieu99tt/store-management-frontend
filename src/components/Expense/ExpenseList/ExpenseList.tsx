import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

// utils
import mergeClasses from "../../../utils/mergeClasses";

// talons
import { useExpenseList } from "../../../talons/Expense/useExpenseList";

// components
import { Button, DatePicker, Form, Space, Table, Tag } from "antd";

// icons
import { Delete, Edit3, Eye } from "react-feather";

// types
import { iStaff } from "../../../types/user.types";
import { iBankAccount } from "../../../types/bankAccount.types";

// styles
import defaultClasses from "./expenseList.module.css";
import { formatNumber } from "../../../utils/helper";

interface Props {
    classes?: object;
}

const ExpenseList = ({ classes: propsClasses }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const {
        data,
        pageSize,
        loading,
        totalNumber,

        onDelete,
        handleSearch,
        handleChangeTable,
    } = useExpenseList();

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 150,
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            width: 200,
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
            title: "Ngày tạo",
            dataIndex: "date",
            key: "date",
            width: 200,
            render: (record: Date) => {
                return <p>{new Date(record).toLocaleDateString()}</p>;
            },
        },
        {
            title: "Loại",
            dataIndex: "type",
            key: "type",
            width: 150,
            render: (type: any) => {
                let color = "volcano";

                switch (type) {
                    case "Mua sắm":
                        color = "geekblue";
                        break;
                    case "Trang thiết bị":
                        color = "green";
                        break;
                    case "Trả lương":
                        color = "volcano";
                        break;
                }

                return (
                    <span>
                        <Tag color={color}>{type}</Tag>
                    </span>
                );
            },
        },
        {
            title: "Tổng tiền",
            dataIndex: "total",
            key: "total",
            width: 150,
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
            render: (text: any, record: any) => (
                <Space size="middle">
                    <button className={cn(classes.btn, classes.view)}>
                        <Link to={`/expense/view/${record.id}`}>
                            <Eye />
                        </Link>
                    </button>
                    <button className={cn(classes.btn, classes.edit)}>
                        <Link to={`/expense/edit/${record.id}`}>
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
                <Link to="/expense/add">
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

export default ExpenseList;
