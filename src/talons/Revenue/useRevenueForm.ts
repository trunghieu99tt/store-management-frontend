import { Form, message } from "antd";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { FORM_TYPE } from "../../types/app.types";
import { iRevenue, iRevenueDTO } from "../../types/revenue.types";
import { randomDate } from "../../utils/helper";
import { useRevenue } from "./useRevenue";
import faker from "faker";
import moment from "moment";

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
        form.setFieldsValue({
            bankAccountNumber: data.bankAccount.accountNumber,
            createdAt: moment(new Date(data.createdAt)),
        });
        setRevenue(data);
    };

    useEffect(() => {
        if (params?.id) {
            handleFetchRevenue();
        }
    }, [params.id]);

    useEffect(() => {
        // mockData();
    }, []);

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

    const mockData = async () => {
        [...Array(1000)].map(async () => {
            const quantity = faker.datatype.number({
                min: 1,
                max: 1000,
            });
            const priceUnit = faker.datatype.number({
                min: 1,
                max: 100000,
            });
            const total = quantity * priceUnit;
            const values = {
                createdAt: randomDate(
                    new Date("01-01-2021"),
                    new Date("12-31-2021"),
                    0,
                    24
                ),
                name: faker.lorem.word(),
                bankAccountNumber: 1,
                description: faker.lorem.sentence(),
                paymentMethod: faker.lorem.word(),
                quantity,
                priceUnit,
                total,
            };
            await addRevenue(values);
        });
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
