/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html} that provides report action logic
 * @kind function.
 *
 *
 * @return {{
 * fetchReport: func,
 * fetchReports: func,
 * generateReport: func,
 * getInformationForReport: func
 * }}
 *
 * */

import { useData } from "../common/useData";

const BACKEND_URL = `${process.env.REACT_APP_API_LINK}/report`;

const useReport = () => {
    const { addOne, fetchList, fetchOne } = useData({
        endpoint: "report",
        additionalEndpoint: "/report/generate",
    });

    const fetchReports = async (pageNumber = 1, pageSize = 10) => {
        const response = await fetchList({
            pageSize,
            pageNumber,
        });

        return response;
    };

    const fetchReport = async (id: number) => {
        const response = await fetch(`${BACKEND_URL}/${id}`);
        const data = await response.json();
        return data;
    };

    const getInformationForReport = async (data: any) => {
        const { dateFrom, dateTo, staffID } = data;
        const response = await fetch(
            `${BACKEND_URL}/generate?dateFrom=${dateFrom}&dateTo=${dateTo}&staffID=${staffID}`
        );
        const responseData = await response.json();
        return responseData;
    };

    const generateReport = async (data: any) => {
        const response = await addOne(data);
        return response;
    };

    return {
        fetchReport,
        fetchReports,
        generateReport,
        getInformationForReport,
    };
};

export { useReport };
