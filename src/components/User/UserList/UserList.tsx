import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

// utils
import mergeClasses from "../../../utils/mergeClasses";

// talons
import { useUserList } from "../../../talons/User/useUserList";

// components
import { Button, DatePicker, Form, Input, Space, Table, Tag } from "antd";

// icons
import { Delete, Edit3, Eye } from "react-feather";

// styles
import defaultClasses from "./userList.module.css";

interface Props {
    classes?: object;
}

const UserList = ({ classes: propsClasses }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const {
        data,
        pageSize,
        loading,
        totalNumber,

        onDelete,
        handleSearch,
    } = useUserList();

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
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: 200,
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
            width: 200,
        },
        {
            title: "Số điện thoại",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            width: 200,
        },
        {
            title: "Quyền",
            dataIndex: "role",
            key: "role",
            width: 150,
            render: (role: any) => {
                let color = "volcano";

                switch (role) {
                    case "staff":
                        color = "geekblue";
                        break;
                    case "manager":
                        color = "green";
                        break;
                }

                return (
                    <span>
                        <Tag color={color}>{role}</Tag>
                    </span>
                );
            },
        },

        {
            title: "Thao tác",
            key: "action",
            render: (text: any, record: any) => (
                <Space size="middle">
                    <button className={cn(classes.btn, classes.view)}>
                        <Link to={`/user/view/${record.id}`}>
                            <Eye />
                        </Link>
                    </button>
                    <button className={cn(classes.btn, classes.edit)}>
                        <Link to={`/user/edit/${record.id}`}>
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
                <Link to="/user/add">
                    <Button type="primary">Thêm mới</Button>
                </Link>

                <div className={classes.search}>
                    <Form layout="inline" onFinish={handleSearch}>
                        <Form.Item label="Tìm kiếm theo tên" name="name">
                            <Input />
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

export default UserList;
