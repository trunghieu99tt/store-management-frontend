import React from "react";

// talons
import { useRevenueForm } from "../../../talons/Revenue/useRevenueForm";

// utils
import mergeClasses from "../../../utils/mergeClasses";

// components
import { Button, Form, Input, InputNumber, Switch } from "antd";

// styles
import defaultClasses from "./revenueForm.module.css";

// types'
import { FORM_TYPE } from "../../../types/app.types";

interface Props {
    classes?: object;
    view: FORM_TYPE;
}

const RevenueForm = ({ classes: propsClasses, view }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const { form, revenue, handleCancel, onChange, onSubmit } = useRevenueForm({
        view,
    });

    console.log(`revenue`, revenue);

    let title = null;
    let buttonText = null;

    switch (view) {
        case "ADD":
            title = "Thêm thông tin doanh thu";
            buttonText = "Thêm";
            break;
        case "EDIT":
            title = "Sửa thông tin doanh thu";
            buttonText = "Lưu thông tin";
            break;
        case "VIEW":
            title = "Thông tin chi tiết doanh thu";
            buttonText = "Sửa";
            break;
        default:
            title = "Thông tin doanh thu";
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
                initialValues={revenue || {}}
                key={Math.random()}
            >
                {view !== "ADD" && (
                    <Form.Item label="Ngày tạo" name="createdAt">
                        <Input disabled />
                    </Form.Item>
                )}
                <Form.Item
                    label="Tên"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Xin hãy nhập tên cho phiếu thu",
                        },
                    ]}
                >
                    <Input disabled={view === "VIEW"} />
                </Form.Item>
                <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: "Xin hãy nhập mô tả cho phiếu thu",
                        },
                    ]}
                >
                    <Input disabled={view === "VIEW"} />
                </Form.Item>
                <Form.Item
                    label="Số lượng"
                    name="quantity"
                    rules={[
                        {
                            required: true,
                            message: "Xin hãy nhập số lượng",
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
                        min={0}
                    />
                </Form.Item>{" "}
                <Form.Item
                    label="Đơn giá"
                    name="priceUnit"
                    rules={[
                        {
                            required: true,
                            message: "Xin hãy nhập đơn giá",
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
                        min={0}
                    />
                </Form.Item>
                <Form.Item
                    label="Tổng tiền"
                    name="total"
                    rules={[
                        {
                            required: true,
                            message: "Please input name for revenue",
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
                        min={0}
                    />
                </Form.Item>
                <Form.Item
                    label="Số tài khoản ngân hàng"
                    name="bankAccountNumber"
                    rules={[
                        {
                            required: true,
                            message: "Xin hãy nhập số tài khoản ngân hàng",
                        },
                    ]}
                >
                    <Input disabled={view === "VIEW"} />
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

export default RevenueForm;
