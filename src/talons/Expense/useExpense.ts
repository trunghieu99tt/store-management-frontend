/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html} that expense list logic
 *
 * @kind function.
 *
 * @return {{
 *}}
 * */

import client from "../../api/client";
import { TExpense } from "../../types/expense.types";
import { useData } from "../common/useData";

const BASE_BACKEND_URL = `${process.env.REACT_APP_API_LINK}/expense`;

const useExpense = ({ type = "EMPLOYEE_SALARY" }: { type: TExpense }) => {
    let ADDITIONAL_ENDPOINT = "/expense";

    switch (type) {
        case "EMPLOYEE_SALARY":
            ADDITIONAL_ENDPOINT = `/expense/employeeSalary`;
            break;
        case "SERVICE":
            ADDITIONAL_ENDPOINT = `/expense/service`;
            break;
        case "SHOPPING":
            ADDITIONAL_ENDPOINT = `/expense/shopping`;
            break;
    }

    const { fetchList, fetchOne, addOne, updateOne, deleteOne } = useData({
        endpoint: "/expense",
        additionalEndpoint: ADDITIONAL_ENDPOINT,
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
        const response = await client.get(
            `${BASE_BACKEND_URL}/statistic?dayStart=${dateFrom}&dayEnd=${dateTo}`
        );
        return response.data;
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
