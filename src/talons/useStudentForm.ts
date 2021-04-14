import { Form, message } from "antd";
import { useRecoilState } from "recoil";
import { Modal } from "antd";
import { studentState } from "../states/app.state";

import { FORM_TYPE, iStudent } from "../types/app.types";
import { useHistory, useParams } from "react-router";
import { useState } from "react";

import moment from "moment";

/**
 *
 * Đây là file dùng để quản lí toàn bộ logic của student form component
 *
 * @param view: FORM_TYPE: View hiện tại của form là gì : gồm có edit, add và view
 * @returns
 */

const useStudentForm = ({ view: propsView }: { view: FORM_TYPE }) => {
    const [form] = Form.useForm();

    /**
     * cái này là để lấy ra params từ url
     * ví dụ: add/view/1234 -> params = {id: 1234}
     * cái này đã được định nghĩa trong phần route ở file App.tsx
     * <Route
                    path="/student/view/:id"
                    component={() => <StudentForm view="VIEW" />}
                ></Route>
     */
    const params: { id: string } = useParams();

    // quản lí state toàn cục chứa danh sách toàn bộ các students
    const [students, setStudents] = useRecoilState(studentState);

    // Nếu view đang ở chế độ view hoặc edit -> lấy ra student hiện tại ứng với id
    let data =
        (params?.id && students.find((item) => item.id === params.id)) || null;

    // Đổi định dạng của paymentDate từ string -> moment
    // vì trong form của chúng ta datetime input chỉ nhận vào giá trị momment
    const student: iStudent | null = data && {
        ...data,
        paymentDate:
            data?.paymentDate && moment(data.paymentDate, "YYYY-MM-DD"),
    };

    // quản lí view của form
    const [view, setView] = useState<FORM_TYPE>(propsView);

    // quản lí giá trị của switch button  "đã đóng học hay chưa"
    const [checkedValue, setCheckedValue] = useState<boolean>(
        student?.ok || false
    );

    // quản lí lịch sử, giúp điều hướng
    const history = useHistory();

    /**
     * Hàm chuyển đổi lại toàn bộ giá trị nhận được từ form
     * + Chuyển giá trị nhận được từ datetime input (đang ở dạng momment) sang dạng string dạng  YYYY-MM_DD
     * + Set giá trị cho trạng thái đóng tiền (biến ok)
     */
    const convertedData = (values: iStudent) => {
        return {
            ...values,
            paymentDate: values?.paymentDate?.format("YYYY-MM-DD") || null,
            ok: (values?.ok && true) || false,
        };
    };

    /**
     *
     * Hàm thực hiện xử lí khi submit form
     */
    const onSubmit = (values: iStudent) => {
        // Tạo một đối tượng student mới từ giá trị nhận được từ form
        const student = convertedData(values);

        // Nếu view hiện tại là add thì  thực hiện add
        if (view === "ADD") {
            handleAddStudent(student);

            // Nếu view hiện tại là edit thì hiển thị 1 modal để hỏi lại người dùng xem có lưu thay đổi hay không
            // Nếu có thì thực hiện update
        } else if (view === "EDIT") {
            Modal.confirm({
                title: "Lưu",
                content: "Bạn có chắc muốn lưu lại tất cả các thay đổi không ?",
                okText: "Lưu",
                cancelText: "Hủy",
                onOk: () => handleUpdateStudent(student),
            });

            // Nếu view hiện tại là view thì submit button sẽ là nút điều hướng chuyển sang edit
        } else {
            setView("EDIT");
        }
    };

    /**
     * Hàm onChange sẽ được kích hoạt khi có bất kì thay  đổi nào ở phía form
     */
    const onChange = (value: any, allValues: Partial<iStudent>) => {
        // Ở đây chúng ta sẽ tính luôn khoản tiền sinh viên còn nợ
        // Nếu giá trị của trường "học phí" (fee) khác null
        if (allValues.fee) {
            let res = allValues.fee;

            // Nếu giá trị của trường "đã trả" (paid) khác null
            if (allValues.paid) {
                // Số tiền còn nợ sẽ = đã trả - học phí (đương nhiên nếu đã trả > học phí thì nợ vẫn phải = 0)
                res = Math.max(0, allValues.fee - allValues.paid);
            }

            // Set giá trị cho trường "còn nợ "(owe)
            form.setFieldsValue({
                owe: res,
            });
        } else {
            form.setFieldsValue({
                owe: 0,
            });
        }
    };

    // Thực hiện thêm mới sinh viên
    const handleAddStudent = (values: iStudent) => {
        // Tạo 1 id cho sinh viên này chính bằng thời gian hiện tại
        values.id = Date.now().toString();

        // Kiểm tra xem có sinh viên nào có mã sinh viên trùng với mã sinh viên vừa nhập hay không
        // Nếu có index sẽ trả về giá trị khác - 1
        const index = students.findIndex(
            (e) => e.studentId === values.studentId
        );
        if (index !== -1) {
            message.error("Mã sinh viên đã tồn tại trong hệ thống !");
        } else {
            // Nếu không có thì thêm học  sinh mới và thông báo thành công
            const newStudents = [...students, values];

            // Hàm update lại giá trị của biến toàn cục quản lí toàn bộ danh sách sinh viên
            setStudents(newStudents);
            message.success("Thêm mới sinh viên thành công!");
        }
    };

    // Thực hiện update thông tin sinh viên
    const handleUpdateStudent = (values: iStudent) => {
        // Lấy id từ params
        const { id } = params;

        // 1. Lọc ra danh sách sinh viên không chứa sinh viên hiện tại đang update
        const filteredStudent =
            students?.filter((item: iStudent) => item.id !== id) || [];

        // 2. Tìm xem trong danh sách vừa lọc được có sinh viên nào có mã trùng với mã sinh viên nhập trong form không
        // Nếu có index sẽ trả về giá trị khác - 1
        const index = filteredStudent.findIndex(
            (e) => e.studentId === values.studentId
        );

        // 3. Kiểm tra
        if (index !== -1) {
            message.error("Mã sinh viên đã tồn tại trong hệ thống !");
        } else {
            // Thêm id cho giá trị trả về từ form là id của sinh viên đang được chỉnh sửa
            values.id = id;

            // Thêm lại vào list sinh viên
            const newTodoList = [...filteredStudent, values];

            // Hàm update lại giá trị của biến toàn cục quản lí toàn bộ danh sách sinh viên
            setStudents(newTodoList);
            message.success("Sửa thông tin sinh viên thành công!");
        }
    };

    /**
     * Hàm thực hiện khi bấm nút hủy, quay trở về danh sách
     */
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
