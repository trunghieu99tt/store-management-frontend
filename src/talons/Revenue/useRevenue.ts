/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html} that revenue actions logic
 *
 * @kind function.
 *
 * @return {{
 * fetchRevenues: string,
 * fetchRevenue: func,
 * updateRevenue: func,
 * addRevenue: func,
 * deleteRevenue: func
 *
 * */

const BACKEND_URL = `${process.env.REACT_APP_API_LINK}/revenue`;

const useRevenue = () => {
    const fetchRevenues = async (
        pageNumber = 1,
        pageSize = 10,
        day: String | null
    ) => {
        const response = await fetch(
            `${BACKEND_URL}/?pageSize=${pageSize}&pageNumber=${pageNumber}${
                (day !== null && `&day=${day}`) || ""
            }`
        );
        const data = await response.json();
        return data;
    };

    const fetchRevenue = async (revenueID: number) => {
        const response = await fetch(`${BACKEND_URL}/${revenueID}`);
        const data = await response.json();
        return data.data;
    };

    const addRevenue = async (data: any, type = "json") => {
        if (!data.staffID) {
            data.staffID = 1;
        }

        const response = await fetch(`${BACKEND_URL}/`, {
            method: "POST",
            body: type === "json" ? JSON.stringify(data) : data,
            headers: {
                "Content-Type": "application/json",
            },
        });
        const responseData = await response.json();
        return responseData;
    };

    const updateRevenue = async (data: any, revenueID: number) => {
        if (!data.staffID) {
            data.staffID = 1;
        }

        const response = await fetch(`${BACKEND_URL}/${revenueID}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const responseData = await response.json();
        return responseData;
    };

    const deleteRevenue = async (revenueID: number) => {
        const response = await fetch(`${BACKEND_URL}/${revenueID}`, {
            method: "DELETE",
        });
        const data = await response.json();
        return data;
    };

    return {
        fetchRevenues,
        fetchRevenue,
        addRevenue,
        deleteRevenue,
        updateRevenue,
    };
};

export { useRevenue };
