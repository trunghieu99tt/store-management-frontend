/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html} that contains revenue actions logic
 *
 * @kind function.
 *
 * @return {{
 * fetchRevenues: string,
 * fetchRevenue: func,
 * updateRevenue: func,
 * addRevenue: func,
 * deleteRevenue: func,
 * fetch2NearestMonths: func,
 * fetchRevenuesInRange: func,
 *}}
 * */

import { useData } from "../common/useData";

const BACKEND_URL = `${process.env.REACT_APP_API_LINK}/revenue`;

const useRevenue = () => {
    const { addOne, deleteOne, updateOne } = useData({
        backendURL: BACKEND_URL,
    });

    const fetchRevenues = async (
        pageNumber = 1,
        pageSize = 10,
        day: String | null,
        sortBy = 4,
        isAsc = true
    ) => {
        const response = await fetch(
            `${BACKEND_URL}?pageSize=${pageSize}&pageNumber=${pageNumber}${
                (day !== null && `&day=${day}`) || ""
            }&sortBy=${sortBy}&isAsc=${isAsc}`
        );
        const data = await response.json();
        return data;
    };

    const fetchRevenuesInRange = async (dateFrom: String, dateTo: String) => {
        const response = await fetch(
            `${BACKEND_URL}/statistic?dayStart=${dateFrom}&dayEnd=${dateTo}`
        );
        const data = await response.json();
        return data;
    };

    const fetchRevenue = async (revenueID: number) => {
        const response = await fetch(`${BACKEND_URL}/${revenueID}`);
        const data = await response.json();
        return data.data;
    };

    const fetch2NearestMonths = async () => {
        const response = await fetch(`${BACKEND_URL}/get-2-nearest-months`);
        const data = await response.json();
        return data;
    };

    const addRevenue = async (data: any) => {
        if (!data.staffID) {
            data.staffID = 1;
        }
        const response = await addOne(data);
        return response;
    };

    const updateRevenue = async (data: any, revenueID: number) => {
        if (!data.staffID) {
            data.staffID = 1;
        }
        const response = await updateOne(data, revenueID);
        return response;
    };

    const deleteRevenue = async (revenueID: number) => {
        const response = await deleteOne(revenueID);
        return response;
    };

    return {
        fetchRevenues,
        fetchRevenue,
        addRevenue,
        deleteRevenue,
        updateRevenue,
        fetch2NearestMonths,
        fetchRevenuesInRange,
    };
};

export { useRevenue };
