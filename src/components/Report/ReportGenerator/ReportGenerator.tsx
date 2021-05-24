import React, { useRef } from "react";

// talons
import { useGenerateReport } from "../../../talons/Report/useGenerateReport";

// components
import { Form, DatePicker, Button, Table, Empty } from "antd";
import ReactToPrint from "react-to-print";
import PrintPage from "../../Print/PrintPage";
import ReportDetail from "../ReportDetail";
import TextArea from "antd/lib/input/TextArea";
import ReportStaffInfo from "../ReportStaffInfo";
import ReportSummary from "../ReportSummary";

// styles
import classes from "./reportGenerator.module.css";

// types
import { FORM_TYPE } from "../../../types/app.types";
import { formatNumber } from "../../../utils/helper";

interface Props {
    view: FORM_TYPE;
}

const { RangePicker } = DatePicker;

const ReportGenerator = ({ view }: Props) => {
    const { data, loading, handleGenerateReport, handleGetInfoForReport } =
        useGenerateReport({
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
            render: (value: number) => {
                return <p>{formatNumber(value)} VND</p>;
            },
        },
        {
            title: "Tổng chi",
            dataIndex: "totalExpense",
            width: 100,
            render: (value: number) => {
                return <p>{formatNumber(value)} VND</p>;
            },
        },
        {
            title: "Lợi nhuận",
            dataIndex: "profit",
            width: 100,
            render: (value: number) => {
                return <p>{formatNumber(value)} VND</p>;
            },
        },
    ];

    return (
        <div className={classes.root}>
            {view !== "VIEW" && (
                <header className={classes.header}>
                    <Form layout="inline" onFinish={handleGetInfoForReport}>
                        <Form.Item
                            label="Tạo báo cáo theo tháng"
                            name="range"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Xin hãy chọn tháng để xem báo cáo",
                                },
                            ]}
                        >
                            <RangePicker />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Tạo báo cáo
                            </Button>
                        </Form.Item>
                    </Form>
                </header>
            )}

            <section className={classes.main}>
                {(data && (data.revenue !== 0 || data.expense !== 0) && (
                    <Table
                        columns={columns}
                        dataSource={data?.row}
                        loading={loading}
                        pagination={false}
                        scroll={{ y: 300 }}
                        bordered
                        title={() => (
                            <strong>
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
                            </strong>
                        )}
                        footer={() => {
                            if (!data) return <p>Loading...</p>;
                            return (
                                <React.Fragment>
                                    <div className={classes.summary}>
                                        <ReportSummary
                                            data={{
                                                budget:
                                                    (data && data.budget) || 0,
                                                expense: data.expense || 0,
                                                profit: data.profit || 0,
                                                revenue: data.revenue || 0,
                                            }}
                                        />

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
                                                    defaultValue={
                                                        data.description
                                                    }
                                                />
                                            </Form.Item>
                                            {view === "VIEW" && (
                                                <ReportStaffInfo
                                                    data={data.staff}
                                                />
                                            )}
                                            <Form.Item>
                                                {view !== "VIEW" && (
                                                    <Button
                                                        type="primary"
                                                        htmlType="submit"
                                                    >
                                                        Lưu báo cáo
                                                    </Button>
                                                )}
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
                                </React.Fragment>
                            );
                        }}
                    />
                )) || <Empty description="Không thể truy xuất data" />}
            </section>
        </div>
    );
};

export default ReportGenerator;
