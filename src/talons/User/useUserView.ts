import { message } from "antd";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { iExpense } from "../../types/expense.types";
import { iUser } from "../../types/user.types";
import { useUser } from "./useUser";

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
const useUserView = () => {
    const history = useHistory();
    const params: { id: string } = useParams();

    const { fetchUser } = useUser({ type: "staff" });
    const [user, setUser] = useState<iUser | any>(null);

    useEffect(() => {
        if (params?.id) {
            handleFetchUser();
        }
    }, [params.id]);

    const handleFetchUser = async () => {
        if (params?.id) {
            const id = ~~params.id;
            const data = await fetchUser(id);
            if (!data) {
                history.push("/users");
                message.error("Không tồn tại phiếu thu với id này");
            }
            setUser(data);
        }
    };

    const onGoBack = () => history.goBack();

    const onGoToEdit = () => history.push(`/user/edit/${params.id}`);

    return {
        params,
        user,

        onGoBack,
        onGoToEdit,
    };
};

export { useUserView };
