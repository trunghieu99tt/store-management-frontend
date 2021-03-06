import { message, Modal } from "antd";
import { useEffect, useState } from "react";
import { iRevenue } from "../../types/revenue.types";
import { useRevenue } from "./useRevenue";

import moment from "moment";
import { useRecoilValue } from "recoil";
import { pageSizeState } from "../../states/app.state";

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
    const pageSize = useRecoilValue(pageSizeState);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [data, setData] = useState<iRevenue[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalNumber, setTotalNumber] = useState<number>(0);

    const { deleteRevenue, fetchRevenues } = useRevenue();

    useEffect(() => {
        handleFetchRevenues();
    }, [pageNumber]);

    const handleFetchRevenues = async (sortBy = 4, isAsc = true) => {
        setLoading(true);
        const data = await fetchRevenues(
            pageNumber,
            pageSize,
            null,
            sortBy,
            isAsc
        );
        setData(data.data);
        setTotalNumber(data.total);
        setLoading(false);
    };

    const handleChangeTable = (
        pagination: any,
        filters: any,
        sorter: any,
        extra: any
    ) => {
        let sortBy = 4;
        let isAsc = true;
        switch (sorter.field) {
            case "name":
                sortBy = 4;
                break;
            case "quantity":
                sortBy = 1;
                break;
            case "priceUnit":
                sortBy = 2;
                break;
            case "total":
                sortBy = 3;
                break;
            default:
                sortBy = 4;
        }

        if (sorter.order === "descend") {
            isAsc = false;
        }
        handleSort(sortBy, isAsc);
        setPageNumber(pagination.current);
    };

    const handleSearch = async (values: any) => {
        if (!values.createdAt) {
            handleFetchRevenues();
            setPageNumber(1);
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
            title: "X??a phi???u thu n??y?",
            content:
                "B???n c?? ch???c mu???n x??a phi???u thu n??y kh??ng? T???t c??? c??c b??o c??o li??n quan ?????n phi???u thu n??y c??ng s??? b??? x??a ",
            okText: "X??c nh???n x??a",
            cancelText: "H???y",
            onOk: async () => {
                const data = await deleteRevenue(revenueID);
                setPageNumber(1);
                await handleFetchRevenues();
                if (data.status === 200) {
                    message.success("X??a phi???u thu th??nh c??ng");
                } else {
                    message.error("???? x???y ra l???i. Xin th??? l???i sau");
                }
            },
        });
    };

    const handleSort = async (sortBy = 4, isAsc = true) => {
        await handleFetchRevenues(sortBy, isAsc);
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

export { useRevenueList };
