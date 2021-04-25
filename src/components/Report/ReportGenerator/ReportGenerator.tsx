import React, { useRef } from "react";

// talons
import { useGenerateReport } from "../../../talons/Report/useGenerateReport";

// components
import { Form, DatePicker, Button, Table, Empty } from "antd";

// styles
import classes from "./reportGenerator.module.css";
import TextArea from "antd/lib/input/TextArea";
import { FORM_TYPE } from "../../../types/app.types";
import ReactToPrint from "react-to-print";
import PrintPage from "../../Print/PrintPage";
import ReportDetail from "../ReportDetail";

interface Props {
    view: FORM_TYPE;
}

const { RangePicker } = DatePicker;

const ReportGenerator = ({ view }: Props) => {
    const {
        data,
        loading,
        handleGenerateReport,
        handleGetInfoForReport,
    } = useGenerateReport({
        view,
    });

    const printComponentRef = useRef(null);

    const columns = [
        {
            title: "Mã",
            dataIndex: "id",
            width: 50,
        },
        {
            title: "Ngày",
            dataIndex: "date",
            width: 100,
        },
        {
            title: "Tổng thu",
            dataIndex: "totalRevenue",
            width: 100,
        },
        {
            title: "Tổng chi",
            dataIndex: "totalExpense",
            width: 100,
        },
        {
            title: "Lợi nhuận",
            dataIndex: "profit",
            width: 100,
        },
    ];

    return (
        <div className={classes.root}>
            {view !== "VIEW" && (
                <header className={classes.header}>
                    <Form layout="inline" onFinish={handleGetInfoForReport}>
                        <Form.Item
                            label="Lấy báo cáo theo khoảng ngày"
                            name="dateRange"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Xin hãy chọn khoảng để xem báo cáo",
                                },
                            ]}
                        >
                            <RangePicker />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Trích xuất
                            </Button>
                        </Form.Item>
                    </Form>
                </header>
            )}

            <section className={classes.main}>
                {(data && (
                    <Table
                        columns={columns}
                        dataSource={data?.row}
                        loading={loading}
                        pagination={false}
                        scroll={{ y: 300 }}
                        bordered
                        title={() => (
                            <p>
                                Báo cáo thống kê từ ngày{" "}
                                {new Date(
                                    (data && data.dateFrom) ||
                                        (data && data.reportFrom)
                                ).toLocaleDateString()}
                                đến{" "}
                                {new Date(
                                    (data && data.dateTo) ||
                                        (data && data.reportTo)
                                ).toLocaleDateString()}
                            </p>
                        )}
                        footer={() => {
                            if (!data) return <p>Loading...</p>;
                            return (
                                <div className={classes.summary}>
                                    <div className={classes.summaryInfo}>
                                        <p>Tổng kết : </p>
                                        <p>
                                            Tổng chi:{" "}
                                            <strong>{data.expense}</strong>
                                        </p>
                                        <p>
                                            Tổng thu:{" "}
                                            <strong>{data.revenue}</strong>
                                        </p>
                                        <p>
                                            Lợi nhuận:{" "}
                                            <strong>{data.profit}</strong>
                                        </p>
                                        <p>
                                            Đơn vị: <strong>VND</strong>
                                        </p>
                                    </div>

                                    <Form
                                        onFinish={handleGenerateReport}
                                        key={Math.random()}
                                    >
                                        <Form.Item
                                            label="Mô tả báo cáo"
                                            name="description"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Xin hãy nhập mô tả cho báo cáo",
                                                },
                                            ]}
                                        >
                                            <TextArea
                                                disabled={view === "VIEW"}
                                                defaultValue={data.description}
                                            />
                                        </Form.Item>
                                        {view === "VIEW" && (
                                            <div className={classes.staffInfo}>
                                                <p>Nhân viên lập báo cáo: </p>
                                                <p>Ten: {data.staff.name}</p>
                                                <p>
                                                    {" "}
                                                    Chức vụ: {data.staff.name}
                                                </p>
                                                <p>
                                                    Số điện thoại:{" "}
                                                    {data.staff.phoneNumber}
                                                </p>
                                                <p>
                                                    Phòng ban:{" "}
                                                    {data.staff.department}
                                                </p>
                                                <p>
                                                    Địa chỉ email :{" "}
                                                    {data.staff.email}
                                                </p>
                                            </div>
                                        )}
                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                            >
                                                Lưu báo cáo
                                            </Button>
                                            {view === "VIEW" && (
                                                <React.Fragment>
                                                    <div
                                                        className={
                                                            classes.print
                                                        }
                                                    >
                                                        <ReactToPrint
                                                            trigger={() => (
                                                                <Button
                                                                    type="primary"
                                                                    className={
                                                                        classes.pdfBtn
                                                                    }
                                                                >
                                                                    Xuất PDF
                                                                </Button>
                                                            )}
                                                            content={() =>
                                                                printComponentRef.current
                                                            }
                                                        />
                                                        <PrintPage
                                                            ref={
                                                                printComponentRef
                                                            }
                                                        >
                                                            <ReportDetail
                                                                data={data}
                                                            />
                                                        </PrintPage>
                                                    </div>
                                                </React.Fragment>
                                            )}
                                        </Form.Item>
                                    </Form>
                                </div>
                            );
                        }}
                    />
                )) || <Empty />}
            </section>
        </div>
    );
};

export default ReportGenerator;
