import { useReport } from "./useReport";

import moment from "moment";
import { message } from "antd";
import { useEffect, useState } from "react";
import { iCustomReport, iReport } from "../../types/report.types";
import { iExpense } from "../../types/expense.types";
import { iRevenue } from "../../types/revenue.types";
import { FORM_TYPE } from "../../types/app.types";
import { useHistory, useParams } from "react-router";

type Props = {
    view: FORM_TYPE;
};

const useGenerateReport = ({ view }: Props) => {
    const { fetchReport, generateReport, getInformationForReport } =
        useReport();

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<iReport | null>(null);
    const [customData, setCustomData] = useState<iCustomReport | null>(null);
    const params: { id: string } = useParams();
    const history = useHistory();

    useEffect(() => {
        if (params?.id) {
            handleGetReport(params.id);
        }
    }, [params.id]);

    const parseFromReportToCustomReport = (data: iReport) => {
        const result: iCustomReport = {
            dateFrom: data.dateFrom || data.reportFrom,
            dateTo: data.dateTo || data.reportTo,
            description: data.description,
            expense: data.expense,
            revenue: data.revenue,
            staffID: data.staffID,
            reportDate: new Date(),
            profit: 0,
            row: [],
            staff: data?.staff,
            budget: data.budget,
        };
        const { expenses, revenues } = data;
        const tempRow: any = {};
        expenses.forEach((expense: iExpense) => {
            const { date, total } = expense;
            const createdAt = new Date(date).toLocaleDateString();
            if (tempRow.hasOwnProperty(createdAt)) {
                tempRow[createdAt].expenses += total;
            } else {
                tempRow[createdAt] = {
                    expenses: total,
                    revenues: 0,
                };
            }
        });

        revenues.forEach((revenue: iRevenue) => {
            const { createdAt, total } = revenue;
            const date = new Date(createdAt).toLocaleDateString();
            if (tempRow.hasOwnProperty(date)) {
                tempRow[date].revenues += total;
            } else {
                tempRow[date] = {
                    expenses: 0,
                    revenues: total,
                };
            }
        });

        result.row =
            tempRow &&
            Object.entries(tempRow)
                .map(([key, value], idx) => {
                    const { expenses, revenues } = value as any;
                    const profit = revenues - expenses;
                    result.profit += profit;
                    return {
                        id: idx + 1,
                        date: key,
                        totalExpense: expenses,
                        totalRevenue: revenues,
                        profit,
                    };
                })
                .sort((a: any, b: any) => {
                    const { date: dateA } = a;
                    const { date: dateB } = b;
                    return dateA.localeCompare(dateB);
                });

        return result;
    };

    const handleGetInfoForReport = async (values: any) => {
        const dateFrom = moment(values.range[0]).toDate().toLocaleDateString();
        const dateTo = moment(values.range[1]).toDate().toLocaleDateString();

        const dataDTO = {
            dateFrom,
            dateTo,
            staffID: 1,
        };
        setLoading(true);
        const response = await getInformationForReport(dataDTO);
        if (response.status === 200) {
            const temp = parseFromReportToCustomReport(response.data);
            setCustomData(temp);
            setData(response.data);
        } else {
            message.error(response.message);
        }

        setLoading(false);
    };

    const handleGenerateReport = async (values: any) => {
        setLoading(true);

        const description = values?.description || "";
        const response = await generateReport({
            ...data,
            description,
        });
        if (response.status === 201) {
            message.success("Tạo báo cáo thành công");
            history.push(`/report/${response.data.id}`);
        } else {
            message.error(response.message);
        }

        setLoading(false);
    };

    const handleGetReport = async (id: string) => {
        setLoading(true);
        console.log(`loading`, loading);
        const response = await fetchReport(~~id);
        if (response.status === 200) {
            const temp = parseFromReportToCustomReport(response.data);
            setLoading(false);
            setCustomData(temp);
        } else {
            message.error(response.message);
            history.push("/report");
        }
        setLoading(false);
        console.log(`loading`, loading);
    };

    return {
        loading,
        data: customData,
        handleGenerateReport,
        handleGetInfoForReport,
    };
};

export { useGenerateReport };
