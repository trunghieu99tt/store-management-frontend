import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// talons
import { useRecoilState } from "recoil";

// components
import { Table, Tag, Space, Button, Input, Form, Modal } from "antd";

// styles
import classes from "./studentList.module.css";

// states
import { studentState } from "../../states/app.state";

//types
import { iStudent } from "../../types/app.types";

interface Props {}

const StudentList = (props: Props) => {
    const columns = [
        {
            title: "Họ và tên",
            dataIndex: "name",
            key: "name",
            width: 300,
        },
        {
            title: "Mã sinh viên",
            dataIndex: "studentId",
            key: "studentId",
            width: 300,
        },
        {
            title: "Khoa",
            dataIndex: "department",
            key: "department",
            width: 300,
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
            width: 300,
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
            width: 300,
        },
    ];

    // Số bản ghi ở mỗi trang
    const pageSize = 20;
    const [students, setStudents] = useRecoilState(studentState);
    const [data, setData] = useState<iStudent[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        if (data.length === 0) setData(students);
    }, [students]);

    /**
     * Hàm thực thi nhiệm vụ search
     */
    const handleSearch = (values: any) => {
        const { studentId } = values;

        // Trả về 1 list gồm danh sách sinh viên có mã sinh viên chứa từ khóa vừa nhập
        // (chú ý ở đây có phân biệt chữ hoa chữ thường)
        const newData =
            students?.filter((item) => item.studentId.includes(studentId)) ||
            [];
        setData(newData);
    };

    /**
     *  Hàm này được gọi mỗi khi có sự thay đổi trong table (ví dụ như sort, thay đổi trang)
     */
    const handleChangeTable = (pagination: any) => {
        // Ở đây chúng ta chỉ quan tâm sự thay đổi về trang
        setCurrentPage(pagination.current);
    };

    /**
     * Hàm thực hiện xác  nhận xóa
     */
    const onDelete = (id: string) => {
        Modal.error({
            title: "Xóa?",
            content: "Bạn có chắc muốn xóa học sinh này không ?",
            okText: "Xác nhận xóa",
            cancelText: "Hủy",
            onOk: () => handleDelete(id),
        });
    };

    /**
     * Hàm xóa
     */
    const handleDelete = (id: string) => {
        // Đơn giản nhất là lọc bỏ sinh viên nào có id trùng với id của sinh viên cần bị xóa
        const newStudents = students.filter((item) => item.id !== id);

        // Update lại danh sách sinh viên toàn cục, danh sách sinh viên cục bộ
        // Set lại trang trở về 1
        setStudents(newStudents);
        setData(newStudents);
        setCurrentPage(1);
    };

    // Phục vụ phân trang
    const from = pageSize * (currentPage - 1);
    const to = pageSize * currentPage;

    // Cắt mảng dữ liệu từ from tới to để hiển thị
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
                scroll={{ x: "500px" }}
            />
        </div>
    );
};

export default StudentList;
