import { Button, DatePicker, Form, Space, Table, Tag } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useExpenseList } from "../../../talons/Expense/useExpenseList";
import { iBankAccount } from "../../../types/bankAccount.types";
import { iStaff } from "../../../types/user.types";
import mergeClasses from "../../../utils/mergeClasses";

import defaultClasses from "./expenseList.module.css";

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
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            width: 300,
            sorter: (a: any, b: any) => NaN,
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
            dataIndex: "date",
            key: "date",
            width: 300,
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
                    <Link to={`/expense/view/${record.id}`}>
                        <Button type="primary">Xem</Button>
                    </Link>
                    <Link to={`/expense/edit/${record.id}`}>
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
            <Link to="/expense/add">
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
