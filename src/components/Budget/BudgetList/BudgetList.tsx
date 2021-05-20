import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

// utils
import mergeClasses from "../../../utils/mergeClasses";

// talons
import { useBudgetList } from "../../../talons/Budget/useBudgetList";

// components
import { Button, DatePicker, Form, Space, Table, Tag } from "antd";

// icons
import { Delete, Edit3, Eye } from "react-feather";

// types
import { iBankAccount } from "../../../types/bankAccount.types";

// styles
import defaultClasses from "./budgetList.module.css";

interface Props {
    classes?: object;
}

const BudgetList = ({ classes: propsClasses }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const {
        data,
        loading,
        totalNumber,

        onDelete,
        handleSearch,
    } = useBudgetList();

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
            title: "Tổng tiền",
            dataIndex: "total",
            key: "total",
            width: 150,
            sorter: (a: any, b: any) => NaN,
        },

        {
            title: "Thao tác",
            key: "action",
            render: (text: any, record: any) => (
                <Space size="middle">
                    <button className={cn(classes.btn, classes.view)}>
                        <Link to={`/budget/view/${record.id}`}>
                            <Eye />
                        </Link>
                    </button>
                    <button className={cn(classes.btn, classes.edit)}>
                        <Link to={`/budget/edit/${record.id}`}>
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
                <Link to="/budget/add">
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
                    total: totalNumber,
                    pageSizeOptions: ["10", "20", "30"],
                }}
                scroll={{ x: "500px" }}
                loading={loading}
            />
        </div>
    );
};

export default BudgetList;
