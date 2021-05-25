import React from "react";

// talons
import { useExpenseForm } from "../../../talons/Expense/useExpenseForm";

// utils
import mergeClasses from "../../../utils/mergeClasses";

// components
import { DatePicker, Form, Input, InputNumber, Select, Spin } from "antd";

// types
import { FORM_TYPE } from "../../../types/app.types";

// styles
import defaultClasses from "./expenseForm.module.css";

interface Props {
    classes?: object;
    view: FORM_TYPE;
}

const ExpenseForm = ({ classes: propsClasses, view }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const {
        form,
        type,
        expense,
        loading,
        handleCancel,
        onSubmit,
        onChange,
        handleChangeType,
    } = useExpenseForm({
        view,
    });

    let title = null;
    let buttonText = null;

    switch (view) {
        case "ADD":
            title = "Thêm thông tin phiếu chi";
            buttonText = "Thêm";
            break;
        case "EDIT":
            title = "Sửa thông tin phiếu chi";
            buttonText = "Lưu thông tin";
            break;
        case "VIEW":
            title = "Thông tin chi tiết phiếu chi";
            buttonText = "Sửa";
            break;
        default:
            title = "Thông tin phiếu chi";
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
                    initialValues={expense || {}}
                    key={Math.random()}
                >
                    <Form.Item label="Ngày" name="date">
                        <DatePicker />
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
                        <Input disabled={view === "VIEW"} />
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
                        <Input disabled={view === "VIEW"} />
                    </Form.Item>
                    <Form.Item
                        label="Phương thức thanh toán"
                        name="paymentMethod"
                        rules={[
                            {
                                required: true,
                                message: "Please input payment method",
                            },
                        ]}
                    >
                        <Input disabled={view === "VIEW"} />
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
                    <Form.Item label="Kiểu phiếu chi" name="type">
                        <Select
                            disabled={view !== "ADD"}
                            defaultValue={type}
                            onChange={handleChangeType}
                        >
                            <Select.Option value="SERVICE">
                                Dịch vụ
                            </Select.Option>
                            <Select.Option value="EMPLOYEE_SALARY">
                                Lương nhân viên
                            </Select.Option>
                            <Select.Option value="SHOPPING">
                                Mua sắm
                            </Select.Option>
                        </Select>
                    </Form.Item>

                    {type === "SHOPPING" && (
                        <React.Fragment>
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
                                        `${value}`.replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                        )
                                    }
                                    parser={(value: any) =>
                                        (value &&
                                            value.replace(/\$\s?|(,*)/g, "")) ||
                                        ""
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
                                        `${value}`.replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                        )
                                    }
                                    parser={(value: any) =>
                                        (value &&
                                            value.replace(/\$\s?|(,*)/g, "")) ||
                                        ""
                                    }
                                    min={0}
                                />
                            </Form.Item>
                        </React.Fragment>
                    )}

                    {type === "EMPLOYEE_SALARY" && (
                        <Form.Item
                            label="So hieu nhan vien"
                            name="staffID"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input user ID",
                                },
                            ]}
                        >
                            <Input disabled={view === "VIEW"} />
                        </Form.Item>
                    )}

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
                            disabled={view === "VIEW" || type === "SHOPPING"}
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

export default ExpenseForm;
