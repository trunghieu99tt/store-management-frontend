import { Form, message } from "antd";
import { useRecoilState } from "recoil";
import { Modal } from "antd";
import { studentState } from "../states/app.state";

import { FORM_TYPE, iStudent } from "../types/app.types";
import { useHistory, useParams } from "react-router";
import { useState } from "react";

import moment from "moment";

const useStudentForm = ({ view: propsView }: { view: FORM_TYPE }) => {
    const [form] = Form.useForm();

    const params: { id: string } = useParams();

    const [students, setStudents] = useRecoilState(studentState);

    let data =
        (params?.id && students.find((item) => item.id === params.id)) || null;

    const student: iStudent | null = data && {
        ...data,
        paymentDate:
            data?.paymentDate && moment(data.paymentDate, "YYYY-MM-DD"),
    };

    const [view, setView] = useState<FORM_TYPE>(propsView);
    const [checkedValue, setCheckedValue] = useState<boolean>(
        student?.ok || false
    );

    const history = useHistory();

    const convertedData = (values: iStudent) => {
        return {
            ...values,
            paymentDate: values?.paymentDate?.format("YYYY-MM-DD") || null,
            ok: (values?.ok && true) || false,
        };
    };

    const onSubmit = (values: iStudent) => {
        const student = convertedData(values);
        if (view === "ADD") {
            handleAddStudent(student);
        } else if (view === "EDIT") {
            Modal.confirm({
                title: "Lưu",
                content: "Bạn có chắc muốn lưu lại tất cả các thay đổi không ?",
                okText: "Lưu",
                cancelText: "Hủy",
                onOk: () => handleUpdateStudent(student),
            });
        } else {
            setView("EDIT");
        }
    };

    const onChange = (value: any, allValues: Partial<iStudent>) => {
        if (allValues.fee) {
            let res = allValues.fee;
            if (allValues.paid) {
                res = Math.max(0, allValues.fee - allValues.paid);
            }
            form.setFieldsValue({
                owe: res,
            });
        } else {
            form.setFieldsValue({
                owe: 0,
            });
        }
    };

    const handleAddStudent = (values: iStudent) => {
        values.id = Date.now().toString();
        const index = students.findIndex(
            (e) => e.studentId === values.studentId
        );
        if (index !== -1) {
            message.error("Mã sinh viên đã tồn tại trong hệ thống !");
        } else {
            const newStudents = [...students, values];
            setStudents(newStudents);
            message.success("Thêm mới sinh viên thành công!");
        }
    };

    const handleUpdateStudent = (values: iStudent) => {
        const { id } = params;
        const filteredStudent =
            students?.filter((item: iStudent) => item.id !== id) || [];
        const index = filteredStudent.findIndex((e) => e.studentId === id);
        if (index !== -1) {
            message.error("Mã sinh viên đã tồn tại trong hệ thống !");
        } else {
            values.id = id;
            const newTodoList = [...filteredStudent, values];
            setStudents(newTodoList);
            message.success("Sửa thông tin sinh viên thành công!");
        }
    };

    const handleCancel = () => {
        history.push("/student/list");
    };

    return {
        view,
        form,
        student,
        onSubmit,
        onChange,
        checkedValue,
        setCheckedValue,
        handleCancel,
        handleAddStudent,
        handleUpdateTodo: handleUpdateStudent,
    };
};

export { useStudentForm };
