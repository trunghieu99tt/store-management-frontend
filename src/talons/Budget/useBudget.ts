/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html}
 * that provides budget  logic
 *
 * @kind function.
 *
 * @return {{
 *}}
 * */

import { useData } from "../common/useData";

const BASE_BACKEND_URL = `${process.env.REACT_APP_API_LINK}/budget`;

const useBudget = () => {
    const { fetchList, fetchOne, addOne, updateOne, deleteOne } = useData({
        endpoint: BASE_BACKEND_URL,
    });

    const fetchBudgets = async () => {
        const response = await fetchList();
        return response;
    };

    const fetchBudget = async (budgetID: number) => {
        const response = await fetchOne(budgetID);
        return response;
    };

    const addBudget = async (data: any) => {
        if (!data.managerID) {
            data.managerID = 1;
        }
        const response = await addOne(data);
        return response;
    };

    const updateBudget = async (data: any, budgetID: number) => {
        if (!data.staffID) {
            data.staffID = 1;
        }
        const response = await updateOne(data, budgetID);
        return response;
    };

    const deleteBudget = async (budgetID: number) => {
        const response = await deleteOne(budgetID);
        return response;
    };

    const fetchBudgetInRange = async (dateFrom: String, dateTo: String) => {
        const response = await fetch(
            `${BASE_BACKEND_URL}/statistic?dayStart=${dateFrom}&dayEnd=${dateTo}`
        );
        const data = await response.json();
        return data;
    };

    return {
        addBudget,
        fetchBudget,
        fetchBudgets,
        updateBudget,
        deleteBudget,
        fetchBudgetInRange,
    };
};

export { useBudget };
