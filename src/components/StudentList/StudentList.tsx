import React, { useEffect, useState } from "react";

import { Table, Tag, Space, Button, Input, Form, Modal } from "antd";

import classes from "./studentList.module.css";
import { iStudent } from "../../types/app.types";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { studentState } from "../../states/app.state";

interface Props {}

const StudentList = (props: Props) => {
    const columns = [
        {
            title: "Họ và tên",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Mã sinh viên",
            dataIndex: "studentId",
            key: "studentId",
        },
        {
            title: "Khoa",
            dataIndex: "department",
            key: "department",
        },
        {
            title: "Tình trạng",
            key: "ok",
            dataIndex: "ok",
            render: (ok: boolean) => {
                const color = ok ? "green" : "red";
                const text = ok ? "Đã đóng tiền" : "Chưa đóng tiền";
                return <Tag color={color}>{text}</Tag>;
            },
        },
        {
            title: "Action",
            key: "action",
            render: (text: any, record: iStudent) => (
                <Space size="middle">
                    <Link to={`/student/view/${record.id}`}>
                        <Button type="primary">Xem chi tiết</Button>
                    </Link>
                    <Button
                        type="primary"
                        danger
                        onClick={() => onDelete(record.id)}
                    >
                        Xóa{" "}
                    </Button>
                </Space>
            ),
        },
    ];

    const pageSize = 1;
    const [students, setStudents] = useRecoilState(studentState);
    const [data, setData] = useState<iStudent[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        if (data.length === 0) setData(students);
    }, [students]);

    const handleSearch = (values: any) => {
        const { studentId } = values;
        const newData =
            students?.filter((item) => item.studentId.includes(studentId)) ||
            [];
        setData(newData);
    };

    const handleChangeTable = (pagination: any) => {
        setCurrentPage(pagination.current);
    };

    const onDelete = (id: string) => {
        Modal.error({
            title: "Xóa?",
            content: "Bạn có chắc muốn xóa học sinh này không ?",
            okText: "Xác nhận xóa",
            cancelText: "Hủy",
            onOk: () => handleDelete(id),
        });
    };

    const handleDelete = (id: string) => {
        const newStudents = students.filter((item) => item.id !== id);
        setStudents(newStudents);
        setData(newStudents);
        setCurrentPage(1);
    };

    const from = pageSize * (currentPage - 1);
    const to = pageSize * currentPage;
    const currentShowData = data?.slice(from, Math.min(to, data.length));

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Form layout="inline" onFinish={handleSearch}>
                    <Form.Item
                        label="Tìm kiếm theo mã sinh viên"
                        name="studentId"
                    >
                        <Input></Input>
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
                dataSource={currentShowData}
                pagination={{
                    pageSize: pageSize,
                    total: data.length,
                }}
                onChange={handleChangeTable}
            />
        </div>
    );
};

export default StudentList;
