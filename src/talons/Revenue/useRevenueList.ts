import { message, Modal } from "antd";
import { useEffect, useState } from "react";
import { iRevenue } from "../../types/revenue.types";
import { useRevenue } from "./useRevenue";

import moment from "moment";

/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html} that provides revenue list logic
 * @kind function.
 *
 *
 * @return {{
 * data: iRevenue,
 * pageSize: number,
 * totalNumber: number,
 * revenueList: iRevenue,
 * onDelete: func,
 * handleSearch: func
 * handleChangeTable: func
 * }}
 *
 * */

const useRevenueList = () => {
    const pageSize = 2;

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [data, setData] = useState<iRevenue[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalNumber, setTotalNumber] = useState<number>(0);

    const { deleteRevenue, fetchRevenues } = useRevenue();

    useEffect(() => {
        handleFetchRevenues();
    }, [pageNumber]);

    const handleFetchRevenues = async () => {
        setLoading(true);
        const data = await fetchRevenues(pageNumber, pageSize, null);
        setData(data.data);
        setTotalNumber(data.total);
        setLoading(false);
    };

    const handleChangeTable = (pagination: any) => {
        setPageNumber(pagination.current);
    };

    const handleSearch = async (values: any) => {
        setPageNumber(1);
        if (!values.createdAt) {
            handleFetchRevenues();
        } else {
            const day = moment(values.createdAt).toDate().toLocaleDateString();
            const response = await fetchRevenues(1, pageSize, day);
            if (response.status === 200) {
                setData(response.data);
                setTotalNumber(response.total);
            }
        }
    };

    const onDelete = (revenueID: number) => {
        Modal.confirm({
            title: "Xóa phiếu thu này?",
            content: "Bạn có chắc muốn xóa phiếu thu này không ? ",
            okText: "Xác nhận xóa",
            cancelText: "Hủy",
            onOk: async () => {
                const data = await deleteRevenue(revenueID);
                setPageNumber(1);
                await handleFetchRevenues();
                if (data.status === 200) {
                    message.success("Xóa phiếu thu thành công");
                } else {
                    message.error("Đã xảy ra lỗi. Xin thử lại sau");
                }
            },
        });
    };

    return {
        data,
        pageSize,
        totalNumber,

        onDelete,
        handleSearch,
        handleChangeTable,
    };
};

export { useRevenueList };
