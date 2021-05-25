import React from "react";

// talons
import { useBudgetForm } from "../../../talons/Budget/useBudgetForm";

// utils
import mergeClasses from "../../../utils/mergeClasses";

// components
import { DatePicker, Form, Input, InputNumber, Spin } from "antd";

// types
import { FORM_TYPE } from "../../../types/app.types";

// styles
import defaultClasses from "./budgetForm.module.css";

interface Props {
    classes?: object;
    view: FORM_TYPE;
}

const BudgetForm = ({ classes: propsClasses, view }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const { form, budget, handleCancel, onSubmit, onChange, loading } =
        useBudgetForm({
            view,
        });

    let title = null;
    let buttonText = null;

    switch (view) {
        case "ADD":
            title = "Thêm thông tin ngân sách";
            buttonText = "Thêm";
            break;
        case "EDIT":
            title = "Sửa thông tin ngân sách";
            buttonText = "Lưu thông tin";
            break;
        case "VIEW":
            title = "Thông tin chi tiết ngân sách";
            buttonText = "Sửa";
            break;
        default:
            title = "Thông tin ngân sách";
            buttonText = "";
    }

    return (
        <div className={classes.root}>
            <h2 className={classes.title}>{title}</h2>

            {(loading && (
                <div className={classes.loading}>
                    <Spin />
                </div>
            )) || (
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={onSubmit}
                    onValuesChange={onChange}
                    form={form}
                    initialValues={budget || {}}
                    key={Math.random()}
                >
                    <Form.Item
                        label="Ngân sách cho tháng"
                        name="date"
                        rules={[
                            {
                                required: true,
                                message: "Xin hãy nhập tháng cho ngân sách",
                            },
                        ]}
                    >
                        <DatePicker picker="month" />
                    </Form.Item>
                    <Form.Item
                        label="Tên"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input name",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: "Please input description",
                            },
                        ]}
                    >
                        <Input />
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
                                (value && value.replace(/\$\s?|(,*)/g, "")) ||
                                ""
                            }
                            min={0}
                        />
                    </Form.Item>
                    <div className={classes.btnGroup}>
                        <button type="submit" className={classes.btn}>
                            {buttonText}
                        </button>
                        <button className={classes.btn} onClick={handleCancel}>
                            Hủy
                        </button>
                    </div>
                </Form>
            )}
        </div>
    );
};

export default BudgetForm;
