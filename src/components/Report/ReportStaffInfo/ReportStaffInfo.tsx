import React from "react";
import { iStaff } from "../../../types/user.types";
import mergeClasses from "../../../utils/mergeClasses";

import defaultClasses from "./reportStaffInfo.module.css";

interface Props {
    classes?: object;
    data: iStaff;
}

const ReportStaffInfo = ({ classes: propsClasses, data }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    return (
        <section className={classes.root}>
            <p>Nhân viên lập báo cáo: </p>
            <p>Tên: {data.name}</p>
            <p> Chức vụ: {data.role}</p>
            <p>Số điện thoại: {data.phoneNumber}</p>
            <p>Phòng ban: {data.department}</p>
            <p>Địa chỉ email : {data.email}</p>
        </section>
    );
};

export default ReportStaffInfo;
