import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { pageSizeState } from "../../states/app.state";
import { iExpense } from "../../types/expense.types";
import { useExpense } from "./useExpense";
import moment from "moment";
import { message, Modal } from "antd";

const useExpenseList = () => {
    const pageSize = useRecoilValue(pageSizeState);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [initialData, setInitialData] = useState<any[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalNumber, setTotalNumber] = useState<number>(0);

    const { fetchExpenses, deleteExpense } = useExpense({ type: "BASE" });

    useEffect(() => {
        handleFetchExpenses();
    }, []);

    const populateType = (data: any) => {
        return data.map((e: any) => {
            let type = "Mua sắm";
            if (e.hasOwnProperty("productID")) type = "Mua sắm";
            else if (e.hasOwnProperty("employeeID")) type = "Trả lương";
            else type = "Trang thiết bị";
            return {
                ...e,
                type,
            };
        });
    };

    const handleFetchExpenses = async (sortBy = 4, isAsc = true) => {
        setLoading(true);
        const data = await fetchExpenses();
        const populatedData = populateType(data.data);
        setInitialData(populatedData);
        setTotalNumber(populatedData);
        setData(populatedData);
        setLoading(false);
    };

    const handleChangeTable = (
        pagination: any,
        filters: any,
        sorter: any,
        extra: any
    ) => {
        let isAsc = true;
        if (sorter.order === "descend") {
            isAsc = false;
        }
        if (sorter?.field) handleSort(sorter.field, isAsc);
    };

    const handleSearch = async (values: any) => {
        console.log(`values`, values);
        if (!values.createdAt) {
            setData(initialData);
            setPageNumber(1);
        } else {
            const day = moment(values.createdAt).toDate().toLocaleDateString();
            const searchData = initialData.filter((item: any) => {
                const date = new Date(item.date).toLocaleDateString();
                return date == day;
            });
            setData(searchData);
        }
    };

    const onDelete = (expenseID: number) => {
        Modal.confirm({
            title: "Xóa phiếu chi này?",
            content: `Bạn có chắc muốn xóa phiếu chi này không? 
                Tất cả các báo cáo liên quan đến phiếu chi này cũng sẽ bị xóa`,
            okText: "Xác nhận xóa",
            cancelText: "Hủy",
            onOk: async () => {
                const data = await deleteExpense(expenseID);
                setPageNumber(1);
                await handleFetchExpenses();
                if (data.status === 200) {
                    message.success("Xóa phiếu thu thành công");
                } else {
                    message.error("Đã xảy ra lỗi. Xin thử lại sau");
                }
            },
        });
    };

    const handleSort = async (sortBy: string, isAsc = true) => {
        const newData = initialData.sort((a: any, b: any) => {
            if (sortBy === "name") {
                return isAsc
                    ? a.name.length - b.name.length
                    : b.name.length - a.name.length;
            } else if (sortBy === "total") {
                return isAsc ? a.total - b.total : b.total - a.total;
            }

            return a.length - b.length;
        });
        setData(newData);
    };

    return {
        data,
        pageSize,
        loading,
        totalNumber,

        onDelete,
        handleSort,
        handleSearch,
        handleChangeTable,
    };
};

export { useExpenseList };
