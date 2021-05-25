import { Form, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { FORM_TYPE } from "../../types/app.types";
import { TExpense } from "../../types/expense.types";
import { useBudget } from "./useBudget";
import moment from "moment";

const useBudgetForm = ({ view }: { view: FORM_TYPE }) => {
    const [form] = Form.useForm();

    const params: { id: string } = useParams();
    const history = useHistory();

    const [type, setType] = useState<TExpense>("EMPLOYEE_SALARY");
    const [budget, setBudget] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const { addBudget, fetchBudget, updateBudget } = useBudget();

    useEffect(() => {
        if (params?.id) {
            handleFetchBudget();
        }
    }, [params.id]);

    const handleFetchBudget = async () => {
        setLoading(true);
        const id = params?.id && ~~params.id;
        if (id === 0) return;
        const data = await fetchBudget(~~id);
        if (!data) {
            history.push("/budget");
            message.error("Không tồn tại khoản chi với id này");
        }
        form.setFieldsValue({
            date: moment(
                new Date(`${data.month}-01-${data.year}`).toLocaleDateString()
            ),
        });
        setBudget(data);
        setLoading(false);
    };

    const onSubmit = (values: any) => {
        if (view === "ADD") {
            handleAddBudget(values);
        } else if (view === "EDIT") {
            Modal.confirm({
                title: "Lưu",
                content: "Bạn có chắc muốn lưu lại tất cả các thay đổi không ?",
                okText: "Lưu",
                cancelText: "Hủy",
                onOk: () => handleUpdateBudget(values),
            });
        } else {
            history.push(`/budget/edit/${params.id}`);
        }
    };

    const handleAddBudget = async (values: any) => {
        const body = populateMonthAndYearToBody(values);
        const response = await addBudget(body);
        if (response.status === 201) {
            message.success("Them moi thanh cong");
        } else {
            message.error(response.message);
        }
    };

    const handleUpdateBudget = async (values: any) => {
        const body = populateMonthAndYearToBody(values);
        try {
            const response = await updateBudget(body, ~~params.id);
            if (response.status === 200) {
                message.success("Update thành công!");
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error("Ngân sách cho tháng này đã tồn tại");
        }
    };

    const populateMonthAndYearToBody = (values: any) => {
        const date = moment(values.date).toDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        values.month = month;
        values.year = year;
        return {
            ...values,
        };
    };

    const onChange = () => {};

    const handleCancel = () => {
        history.push("/budget");
    };

    const handleChangeType = (value: TExpense) => {
        setType(value);
    };

    return {
        form,
        type,
        budget,
        loading,
        onSubmit,
        onChange,
        handleCancel,
        handleChangeType,
    };
};

export { useBudgetForm };
