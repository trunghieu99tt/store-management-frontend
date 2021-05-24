import { message } from "antd";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { iRevenue } from "../../types/revenue.types";
import { useRevenue } from "./useRevenue";

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
const useRevenueView = () => {
    const history = useHistory();
    const params: { id: string } = useParams();

    const { fetchRevenue } = useRevenue();
    const [revenue, setRevenue] = useState<iRevenue | any>(null);

    useEffect(() => {
        if (params?.id) {
            handleFetchRevenue();
        }
    }, [params.id]);

    const handleFetchRevenue = async () => {
        if (params?.id) {
            const id = ~~params.id;
            const data = await fetchRevenue(id);
            if (!data) {
                history.push("/revenue");
                message.error("Không tồn tại phiếu thu với id này");
            }
            setRevenue(data);
        }
    };

    const onGoBack = () => history.goBack();

    const onGoToEdit = () => history.push(`/revenue/edit/${params.id}`);

    return {
        params,
        revenue,

        onGoBack,
        onGoToEdit,
    };
};

export { useRevenueView };
