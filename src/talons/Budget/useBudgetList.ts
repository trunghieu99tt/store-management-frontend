import { message, Modal } from "antd";
import { useEffect, useState } from "react";
import { iBudget } from "../../types/budget.types";
import { useBudget } from "./useBudget";

/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html}
 * that provides budget list logic
 * @kind function.
 *
 *
 * @return {{
 * data: iBudget[]
 * }}
 *
 * */
const useBudgetList = () => {
    const [data, setData] = useState<iBudget[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalNumber, setTotalNumber] = useState<number>(0);

    const { fetchBudgets, deleteBudget } = useBudget();

    useEffect(() => {
        handleFetchBudgets();
    }, []);

    const handleFetchBudgets = async () => {
        setLoading(true);
        const data = await fetchBudgets();
        setData(data.data);
        setTotalNumber(data.data.length);
        setLoading(false);
    };

    const handleSearch = () => {};

    const onDelete = (budgetID: number) => {
        Modal.confirm({
            title: "Xóa ngân sách này này?",
            content: `Bạn có chắc muốn xóa ngân sách này không? 
                Tất cả các báo cáo liên quan đến ngân sách này cũng sẽ bị xóa`,
            okText: "Xác nhận xóa",
            cancelText: "Hủy",
            onOk: async () => {
                const data = await deleteBudget(budgetID);
                await handleFetchBudgets();
                if (data.status === 200) {
                    message.success("Xóa ngân sách thành công");
                } else {
                    message.error("Đã xảy ra lỗi. Xin thử lại sau");
                }
            },
        });
    };

    return {
        data,
        loading,
        totalNumber,

        onDelete,
        handleSearch,
    };
};

export { useBudgetList };
