/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html} that revenue actions logic
 *
 * @kind function.
 *
 * @return {{
 * cartId: string,
 * fetchCart: func,
 * updateItem: func,
 * addItemToCart: func,
 * deleteItemFromCart: func
 *
 * */

const BACKEND_URL = `${process.env.REACT_APP_API_LINK}/revenue`;

const useRevenue = () => {
    const fetchRevenues = async (pageNumber = 1, pageSize = 10) => {
        const response = await fetch(
            `${BACKEND_URL}/?pageSize=${pageSize}&pageSize=${pageNumber}`
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
    };
};

export { useRevenue };
