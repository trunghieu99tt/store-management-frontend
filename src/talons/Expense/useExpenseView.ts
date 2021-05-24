import { message } from "antd";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { iExpense } from "../../types/expense.types";
import { useExpense } from "./useExpense";

/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html}
 * that contains bank account detail component
 *
 * @kind function.
 *
 * @return {{
 * params: any,
 * revenue: iRevenue,
 * onGoBack: func,
 * onGoToEdit: func,
 *}}
 * */
const useExpenseView = () => {
    const history = useHistory();
    const params: { id: string } = useParams();

    const { fetchExpense } = useExpense({ type: "BASE" });
    const [expense, setExpense] = useState<iExpense | any>(null);

    useEffect(() => {
        if (params?.id) {
            handleFetchExpense();
        }
    }, [params.id]);

    const handleFetchExpense = async () => {
        if (params?.id) {
            const id = ~~params.id;
            const data = await fetchExpense(id);
            if (!data) {
                history.push("/expense");
                message.error("Không tồn tại phiếu thu với id này");
            }
            setExpense(data);
        }
    };

    const onGoBack = () => history.goBack();

    const onGoToEdit = () => history.push(`/expense/edit/${params.id}`);

    return {
        params,
        expense: expense,

        onGoBack,
        onGoToEdit,
    };
};

export { useExpenseView };
