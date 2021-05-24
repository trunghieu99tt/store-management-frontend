import { Form, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { FORM_TYPE } from "../../types/app.types";
import { TExpense } from "../../types/expense.types";
import { useExpense } from "./useExpense";
import moment from "moment";
import { randomDate } from "../../utils/helper";
import faker from "faker";
import client from "../../api/client";

const useExpenseForm = ({ view }: { view: FORM_TYPE }) => {
    const [form] = Form.useForm();

    const params: { id: string } = useParams();
    const history = useHistory();

    const [type, setType] = useState<TExpense>("EMPLOYEE_SALARY");
    const [expense, setExpense] = useState<any | null>(null);

    const { addExpense, fetchExpense, updateExpense } = useExpense({ type });

    useEffect(() => {
        // mockData();
    }, []);

    useEffect(() => {
        if (params?.id) {
            handleFetchExpense();
        }
    }, [params.id]);

    const handleFetchExpense = async () => {
        const id = params?.id && ~~params.id;
        if (id === 0) return;
        const data = await fetchExpense(~~id);
        if (!data) {
            history.push("/revenue");
            message.error("Không tồn tại phiếu thu với id này");
        }
        form.setFieldsValue({
            bankAccountNumber: data.bankAccount.accountNumber,
            date: moment(new Date(data.date)),
            staffID: data.staff.id,
        });
        if (data.hasOwnProperty("productID")) setType("SHOPPING");
        else if (data.hasOwnProperty("employeeID")) setType("EMPLOYEE_SALARY");
        else setType("SERVICE");
        setExpense(data);
    };

    const onSubmit = (values: any) => {
        if (view === "ADD") {
            handleAddExpense(values);
        } else if (view === "EDIT") {
            Modal.confirm({
                title: "Lưu",
                content: "Bạn có chắc muốn lưu lại tất cả các thay đổi không ?",
                okText: "Lưu",
                cancelText: "Hủy",
                onOk: () => handleUpdateExpense(values),
            });
        } else {
            history.push(`/expense/edit/${params.id}`);
        }
    };

    const handleAddExpense = async (values: any) => {
        const response = await addExpense(values);
        if (response.status === 201) {
            message.success("Them moi thanh cong");
        } else {
            message.error(response.message);
        }
    };

    const mockData = async () => {
        let additionalInfo = {};

        const types: TExpense[] = ["EMPLOYEE_SALARY", "SERVICE", "SHOPPING"];
        [...Array(1000)].map(async () => {
            const type: TExpense =
                types[Math.floor(Math.random() * types.length)];

            let endpoint = "/expense";

            switch (type) {
                case "EMPLOYEE_SALARY":
                    endpoint = `/expense/employeeSalary`;
                    break;
                case "SERVICE":
                    endpoint = `/expense/service`;
                    break;
                default:
                    endpoint = `/expense/shopping`;
                    break;
            }

            switch (type) {
                case "SHOPPING":
                    const quantity = faker.datatype.number({
                        min: 1,
                        max: 100,
                    });
                    const priceUnit = faker.datatype.number({
                        min: 1,
                        max: 100,
                    });
                    additionalInfo = {
                        quantity,
                        priceUnit,
                        total: quantity * priceUnit,
                    };
                    break;
                case "EMPLOYEE_SALARY":
                    additionalInfo = {
                        staffID: 1,
                        total: faker.datatype.number({
                            min: 1000,
                            max: 1000000,
                        }),
                    };
                    break;
                default:
                    additionalInfo = {
                        total: faker.datatype.number({
                            min: 10000,
                            max: 1000000,
                        }),
                    };
            }

            const values = {
                date: randomDate(
                    new Date("01-01-2021"),
                    new Date("12-31-2021"),
                    0,
                    24
                ),
                type,
                name: faker.lorem.word(),
                bankAccountNumber: 1,
                staffID: 1,
                description: faker.lorem.sentence(),
                paymentMethod: faker.lorem.word(),
                ...additionalInfo,
            };
            await client.post(endpoint, values);
        });
    };

    const handleUpdateExpense = async (values: any) => {
        const response = await updateExpense(values, ~~params.id);
        console.log(`response`, response);
        if (response.status === 200) {
            message.success("Update thành công!");
        } else {
            message.error(response.message);
        }
    };

    const onChange = (values: any, allValues: any) => {
        if (allValues.priceUnit && allValues.quantity) {
            form.setFieldsValue({
                total: allValues.priceUnit * allValues.quantity,
            });
        }
    };

    const handleCancel = () => {
        history.push("/expense");
    };

    const handleChangeType = (value: TExpense) => {
        setType(value);
    };

    return {
        form,
        type,
        expense,
        onSubmit,
        onChange,
        handleCancel,
        handleChangeType,
    };
};

export { useExpenseForm };
