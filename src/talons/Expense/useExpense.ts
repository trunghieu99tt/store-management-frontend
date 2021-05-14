/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html} that expense list logic
 *
 * @kind function.
 *
 * @return {{
 *}}
 * */

import { TExpense } from "../../types/expense.types";
import { useData } from "../common/useData";

const BASE_BACKEND_URL = `${process.env.REACT_APP_API_LINK}/expense`;

const useExpense = ({ type }: { type: TExpense }) => {
    let BACKEND_URL = BASE_BACKEND_URL;

    switch (type) {
        case "EMPLOYEE_SALARY":
            BACKEND_URL = `${BASE_BACKEND_URL}/employeeSalary`;
            break;
        case "SERVICE":
            BACKEND_URL = `${BASE_BACKEND_URL}/service`;
            break;
        case "SHOPPING":
            BACKEND_URL = `${BASE_BACKEND_URL}/shopping`;
            break;
    }

    const { fetchList, fetchOne, addOne, updateOne, deleteOne } = useData({
        backendURL: BASE_BACKEND_URL,
        additionalBackendURL: BACKEND_URL,
    });

    const fetchExpenses = async () => {
        const response = await fetchList();
        return response;
    };

    const fetchExpense = async (expenseID: number) => {
        const response = await fetchOne(expenseID);
        return response;
    };

    const addExpense = async (data: any) => {
        if (!data.staffID) {
            data.staffID = 1;
        }
        const response = await addOne(data);
        return response;
    };

    const updateExpense = async (data: any, expenseID: number) => {
        if (!data.staffID) {
            data.staffID = 1;
        }
        const response = await updateOne(data, expenseID);
        return response;
    };

    const deleteExpense = async (expenseID: number) => {
        const response = await deleteOne(expenseID);
        return response;
    };

    const fetchExpenseInRange = async (dateFrom: String, dateTo: String) => {
        const response = await fetch(
            `${BASE_BACKEND_URL}/statistic?dayStart=${dateFrom}&dayEnd=${dateTo}`
        );
        const data = await response.json();
        return data;
    };

    return {
        addExpense,
        fetchExpense,
        fetchExpenses,
        updateExpense,
        deleteExpense,
        fetchExpenseInRange,
    };
};

export { useExpense };
