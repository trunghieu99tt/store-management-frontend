/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html} that contains data actions logic
 *
 * @kind function.
 *
 * @return {{
 * fetchOne: func,
 * fetchList: func,
 * addOne: func,
 * updateOne: func,
 * deleteOne: func,
 * }}
 */

interface Props {
    backendURL: string;
    additionalBackendURL?: string;
}

const useData = ({ backendURL, additionalBackendURL }: Props) => {
    const fetchList = async () => {
        const response = await fetch(`${backendURL}`);
        const data = await response.json();
        return data;
    };

    const fetchOne = async (expenseID: number) => {
        const response = await fetch(`${backendURL}/${expenseID}`);
        const data = await response.json();
        return data.data;
    };

    const addOne = async (data: any) => {
        const response = await fetch(`${additionalBackendURL || backendURL}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const responseData = await response.json();
        return responseData;
    };

    const updateOne = async (data: any, id: number) => {
        const response = await fetch(
            `${additionalBackendURL || backendURL}/${id}`,
            {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const responseData = await response.json();
        return responseData;
    };

    const deleteOne = async (id: number) => {
        const response = await fetch(`${backendURL}/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();
        return data;
    };

    return {
        addOne,
        fetchOne,
        fetchList,
        updateOne,
        deleteOne,
    };
};

export { useData };
