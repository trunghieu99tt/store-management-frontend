import { message, Modal } from "antd";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { revenueState } from "../../states/revenue.state";
import { iRevenue } from "../../types/revenue.types";
import { useRevenue } from "./useRevenue";

/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html} that provides revenue list logic
 * @kind function.
 *
 *
 * @return {{
 * data: iRevenue,
 * pageSize: number
 * revenueList: iRevenue,
 * onDelete: func,
 * handleSearch: func
 * handleChangeTable: func
 * }}
 *
 * */

const useRevenueList = () => {
    const pageSize = 25;

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [data, setData] = useState<iRevenue[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const { deleteRevenue, fetchRevenues } = useRevenue();

    useEffect(() => {
        if (!data || !data.length) {
            handleFetchRevenues();
        }
    }, []);

    const handleFetchRevenues = async () => {
        setLoading(true);
        const data = await fetchRevenues(pageNumber, pageSize);
        setData(data.data);
        setLoading(false);
    };

    const handleChangeTable = (pagination: any) => {
        setPageNumber(pagination.current);
    };

    const handleSearch = () => {};

    const onDelete = (revenueID: number) => {
        Modal.confirm({
            title: "Xóa phiếu thu này?",
            content: "Bạn có chắc muốn xóa phiếu thu này không ? ",
            okText: "Xác nhận xóa",
            cancelText: "Hủy",
            onOk: async () => {
                const data = await deleteRevenue(revenueID);
                if (data.statusCode === 200) {
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

        onDelete,
        handleSearch,
        handleChangeTable,
    };
};

export { useRevenueList };
