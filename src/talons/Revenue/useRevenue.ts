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

import client from "../../api/client";
import { useData } from "../common/useData";

const BACKEND_URL = `${process.env.REACT_APP_API_LINK}/revenue`;

const useRevenue = () => {
    const { addOne, deleteOne, updateOne, fetchList, fetchOne } = useData({
        endpoint: "/revenue",
    });

    const fetchRevenues = async (
        pageNumber = 1,
        pageSize = 10,
        day: String | null,
        sortBy = 4,
        isAsc = true
    ) => {
        const params: any = {
            pageSize,
            pageNumber,
            sortBy,
            isAsc,
        };
        if (day !== null) params.day = day;
        const response = await fetchList(params);
        return response;
    };

    const fetchRevenuesInRange = async (dateFrom: String, dateTo: String) => {
        const response = await client.get(
            `${BACKEND_URL}/statistic?dayStart=${dateFrom}&dayEnd=${dateTo}`
        );
        return response.data;
    };

    const fetchRevenue = async (revenueID: number) => {
        const response = await fetchOne(revenueID);
        return response.data;
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
        addRevenue,
        fetchRevenue,
        fetchRevenues,
        deleteRevenue,
        updateRevenue,
        fetch2NearestMonths,
        fetchRevenuesInRange,
    };
};

export { useRevenue };
