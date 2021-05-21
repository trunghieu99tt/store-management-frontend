import { Form, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { FORM_TYPE } from "../../types/app.types";
import { TUser } from "../../types/user.types";
import { useUser } from "./useUser";

const useUserForm = ({ view }: { view: FORM_TYPE }) => {
    const [form] = Form.useForm();

    const params: { id: string } = useParams();
    const history = useHistory();

    const [type, setType] = useState<TUser>("staff");
    const [user, setUser] = useState<any | null>(null);

    const { addUser, fetchUser, updateUser } = useUser({ type });

    useEffect(() => {
        if (params?.id) {
            handleFetchUser();
        }
    }, [params.id]);

    const handleFetchUser = async () => {
        const id = params?.id && ~~params.id;
        if (id === 0) return;
        const data = await fetchUser(~~id);
        if (!data) {
            history.push("/users");
            message.error("Không tồn tại người dùng với id này");
        }
        setUser(data);
        if (data.hasOwnProperty("department")) setType("staff");
        else setType("manager");
    };

    const onSubmit = (values: any) => {
        if (view === "ADD") {
            handleAddUser(values);
        } else if (view === "EDIT") {
            Modal.confirm({
                title: "Lưu",
                content: "Bạn có chắc muốn lưu lại tất cả các thay đổi không ?",
                okText: "Lưu",
                cancelText: "Hủy",
                onOk: () => handleUpdateUser(values),
            });
        } else {
            history.push(`/user/edit/${params.id}`);
        }
    };

    const handleAddUser = async (values: any) => {
        console.log(`values`, values);
        if (values.password !== values.passwordConfirm) {
            message.error("Mật khẩu không trùng khớp,  xin kiểm tra lại");
        } else {
            const response = await addUser(values);
            if (response.status === 201) {
                message.success("Them moi thanh cong");
            } else {
                message.error(response.message);
            }
        }
    };

    const handleUpdateUser = async (values: any) => {
        const response = await updateUser(values, ~~params.id);
        if (response.status === 200) {
            message.success("Update thành công!");
        } else {
            message.error(response.message);
        }
    };

    const onChange = () => {};

    const handleCancel = () => {
        history.push("/users");
    };

    const handleChangeType = (value: TUser) => {
        setType(value);
    };

    return {
        form,
        type,
        user,
        onSubmit,
        onChange,
        handleCancel,
        handleChangeType,
    };
};

export { useUserForm };
