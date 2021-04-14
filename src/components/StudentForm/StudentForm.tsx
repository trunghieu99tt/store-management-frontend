import React from "react";
import { FORM_TYPE } from "../../types/app.types";

// components
import {
    Form,
    Input,
    Button,
    Select,
    DatePicker,
    InputNumber,
    Switch,
} from "antd";

import classes from "./studentForm.module.css";
import { useStudentForm } from "../../talons/useStudentForm";

interface Props {
    view: FORM_TYPE;
}

const StudentForm = ({ view: propsView }: Props) => {
    const {
        form,
        onSubmit,
        onChange,
        student,
        view,
        handleCancel,
        checkedValue,
        setCheckedValue,
    } = useStudentForm({
        view: propsView,
    });

    let title = null;
    let buttonText = null;

    switch (view) {
        case "ADD":
            title = "Thêm thông tin sinh viên";
            buttonText = "Thêm";
            break;
        case "EDIT":
            title = "Sửa thông tin sinh viên";
            buttonText = "Lưu thông tin";
            break;
        case "VIEW":
            title = "Thông tin sinh viên";
            buttonText = "Sửa";
            break;
        default:
            title = "Thông tin sinh viên";
            buttonText = "";
    }

    return (
        <div className={classes.root}>
            <h2 className={classes.title}>{title}</h2>

            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                onFinish={onSubmit}
                onValuesChange={onChange}
                form={form}
                initialValues={student || {}}
                key={Math.random()}
            >
                <Form.Item
                    label="Họ và tên"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Xin hãy nhập họ và tên sinh viên",
                        },
                    ]}
                >
                    <Input disabled={view === "VIEW"} />
                </Form.Item>

                <Form.Item
                    label="Mã sinh viên"
                    name="studentId"
                    rules={[
                        {
                            required: true,
                            message: "Xin hãy nhập mã sinh viên",
                        },
                    ]}
                >
                    <Input disabled={view === "VIEW"} />
                </Form.Item>

                <Form.Item
                    label="Khoa"
                    name="department"
                    rules={[
                        {
                            required: true,
                            message: "Xin hãy chọn khoa",
                        },
                    ]}
                >
                    <Select disabled={view === "VIEW"}>
                        <Select.Option value="CNTT">CNTT</Select.Option>
                        <Select.Option value="ATTT">ATTT</Select.Option>
                        <Select.Option value="MKT">MKT</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Số tiền phải đóng"
                    name="fee"
                    rules={[
                        {
                            required: true,
                            message: "Xin hãy nhập số tiền sinh viên phải đóng",
                        },
                    ]}
                >
                    <InputNumber
                        disabled={view === "VIEW"}
                        formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value: any) =>
                            (value && value.replace(/\$\s?|(,*)/g, "")) || ""
                        }
                        min={1}
                    />
                </Form.Item>
                <Form.Item label="Ngày đóng tiền" name="paymentDate">
                    <DatePicker disabled={view === "VIEW"} />
                </Form.Item>
                <Form.Item label="Số tiền đã đóng" name="paid">
                    <InputNumber
                        disabled={view === "VIEW"}
                        // Đây là hàm để format lại giá trị của số
                        formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value: any) =>
                            (value && value.replace(/\$\s?|(,*)/g, "")) || ""
                        }
                        min={1}
                    />
                </Form.Item>
                <Form.Item label="Còn nợ" name="owe">
                    <InputNumber
                        disabled={view === "VIEW"}
                        formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value: any) =>
                            (value && value.replace(/\$\s?|(,*)/g, "")) || ""
                        }
                        min={0}
                    />
                </Form.Item>
                <Form.Item label="Đã đóng học" name="ok">
                    <Switch
                        disabled={view === "VIEW"}
                        checked={checkedValue}
                        onChange={(value) => {
                            form.setFieldsValue({
                                ok: value,
                            });
                            setCheckedValue(value);
                        }}
                    />
                </Form.Item>
                <Form.Item className={classes.btnGroup}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className={classes.btn}
                    >
                        {buttonText}
                    </Button>
                    <Button
                        type="primary"
                        className={classes.btn}
                        onClick={handleCancel}
                    >
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default StudentForm;
