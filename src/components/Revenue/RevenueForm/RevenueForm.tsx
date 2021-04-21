import React from "react";

// utils
import mergeClasses from "../../../utils/mergeClasses";

// components
import { Button, DatePicker, Form, Input, InputNumber, Switch } from "antd";

// styles
import defaultClasses from "./revenue.module.css";

// types'
import { FORM_TYPE } from "../../../types/app.types";
import { useRevenueForm } from "../../../talons/Revenue/useRevenueForm";

interface Props {
    classes?: object;
    view: FORM_TYPE;
}

const RevenueForm = ({ classes: propsClasses, view }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const { form, handleCancel, onChange, onSubmit } = useRevenueForm();

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
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input name for revenue",
                        },
                    ]}
                >
                    <Input />
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
