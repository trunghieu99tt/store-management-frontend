import { Form, message } from "antd";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { FORM_TYPE } from "../../types/app.types";
import { iRevenue, iRevenueDTO } from "../../types/revenue.types";
import { useRevenue } from "./useRevenue";

/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html} that revenue form  logic
 *
 * @kind function.
 *
 * @return {{
 * form: formRef
 * revenue: iRevenue
 * onSubmit: func,
 * onChange: func,
 * handleCancel: func
 * }}
 * */

const useRevenueForm = ({ view: propsView }: { view: FORM_TYPE }) => {
    const [form] = Form.useForm();

    const params: { id: string } = useParams();
    const history = useHistory();

    const [revenue, setRevenue] = useState<iRevenue | null>(null);

    const { fetchRevenue, addRevenue, updateRevenue } = useRevenue();

    const handleFetchRevenue = async () => {
        const id = params?.id && ~~params.id;
        if (id === 0) return;
        const data = await fetchRevenue(~~id);
        if (!data) {
            history.push("/revenue");
            message.error("Không tồn tại phiếu thu với id này");
        }
        setRevenue(data);
        form.setFieldsValue({
            bankAccountNumber: data.bankAccount.accountNumber,
            createdAt: new Date(data.createdAt).toLocaleDateString(),
        });
    };

    useEffect(() => {
        if (params?.id) {
            handleFetchRevenue();
        }
    }, [params.id]);

    const onSubmit = (values: iRevenueDTO) => {
        if (propsView === "ADD") {
            handleAddRevenue(values);
        } else if (propsView === "EDIT") {
            Modal.confirm({
                title: "Lưu",
                content: "Bạn có chắc muốn lưu lại tất cả các thay đổi không ?",
                okText: "Lưu",
                cancelText: "Hủy",
                onOk: () => handleUpdateRevenue(values),
            });
        } else {
            history.push(`/revenue/edit/${params.id}`);
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
        history.push("/revenue");
    };

    const handleAddRevenue = async (values: iRevenueDTO) => {
        const response = await addRevenue(values);
        if (response.status === 201) {
            message.success("Them moi thanh cong");
        } else {
            message.error(response.message);
        }
    };

    const handleUpdateRevenue = async (values: iRevenueDTO) => {
        const response = await updateRevenue(values, ~~params.id);
        if (response.status === 200) {
            message.success("Update thành công!");
        } else {
            message.error(response.message);
        }
    };

    return {
        form,
        revenue,

        onSubmit,
        onChange,
        handleCancel,
    };
};
export { useRevenueForm };
