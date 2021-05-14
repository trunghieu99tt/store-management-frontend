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

const BACKEND_URL = `${process.env.REACT_APP_API_LINK}/report`;

const useReport = () => {
    const fetchReports = async (pageNumber = 1, pageSize = 10) => {
        const response = await fetch(
            `${BACKEND_URL}?pageSize=${pageSize}&pageNumber=${pageNumber}`
        );
        const data = await response.json();
        return data;
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
        const response = await fetch(`${BACKEND_URL}/generate`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const responseData = await response.json();
        return responseData;
    };

    return {
        fetchReport,
        fetchReports,
        generateReport,
        getInformationForReport,
    };
};

export { useReport };
