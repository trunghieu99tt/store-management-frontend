import { Form, message, Modal } from "antd";
import { values } from "lodash";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { FORM_TYPE } from "../../types/app.types";
import { TExpense } from "../../types/expense.types";
import { useExpense } from "./useExpense";

const useExpenseForm = ({ view }: { view: FORM_TYPE }) => {
    const [form] = Form.useForm();

    const params: { id: string } = useParams();
    const history = useHistory();

    const [type, setType] = useState<TExpense>("EMPLOYEE_SALARY");
    const [expense, setExpense] = useState<any | null>(null);

    const { addExpense, fetchExpense, updateExpense } = useExpense({ type });

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
        setExpense(data);
        form.setFieldsValue({
            bankAccountNumber: data.bankAccount.accountNumber,
            createdAt: new Date(data.date).toLocaleDateString(),
            staffID: data.staff.id,
        });

        if (data.hasOwnProperty("productID")) setType("SHOPPING");
        else if (data.hasOwnProperty("employeeID")) setType("EMPLOYEE_SALARY");
        else setType("SERVICE");
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

    const handleUpdateExpense = async (values: any) => {
        const response = await updateExpense(values, ~~params.id);
        console.log(`response`, response);
        if (response.status === 200) {
            message.success("Update thành công!");
        } else {
            message.error(response.message);
        }
    };

    const onChange = () => {};

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
