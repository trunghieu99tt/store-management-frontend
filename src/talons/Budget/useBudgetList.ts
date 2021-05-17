import { message, Modal } from "antd";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { pageSizeState } from "../../states/app.state";
import { iBudget } from "../../types/budget.types";
import { iReport } from "../../types/report.types";
import { useBudget } from "./useBudget";

/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html}
 * that provides budget list logic
 * @kind function.
 *
 *
 * @return {{
 * data: iReport
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
            title: "Xóa phiếu chi này?",
            content: `Bạn có chắc muốn xóa phiếu chi này không? 
                Tất cả các báo cáo liên quan đến phiếu chi này cũng sẽ bị xóa`,
            okText: "Xác nhận xóa",
            cancelText: "Hủy",
            onOk: async () => {
                const data = await deleteBudget(budgetID);
                await handleFetchBudgets();
                if (data.status === 200) {
                    message.success("Xóa phiếu chi thành công");
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
