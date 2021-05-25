import { message } from "antd";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { iBudget } from "../../types/budget.types";
import { useBudget } from "./useBudget";

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

const useBudgetView = () => {
    const history = useHistory();
    const params: { id: string } = useParams();

    const { fetchBudget } = useBudget();
    const [budget, setBudget] = useState<iBudget | any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (params?.id) {
            handleFetchExpense();
        }
    }, [params.id]);

    const handleFetchExpense = async () => {
        if (params?.id) {
            setLoading(true);
            const id = ~~params.id;
            const data = await fetchBudget(id);
            if (!data) {
                history.push("/budget");
                message.error("Không tồn tại ngân sách với id này");
            }
            setBudget(data);
            setLoading(false);
        }
    };

    const onGoBack = () => history.goBack();

    const onGoToEdit = () => history.push(`/budget/edit/${params.id}`);

    return {
        params,
        budget,
        loading,

        onGoBack,
        onGoToEdit,
    };
};

export { useBudgetView };
