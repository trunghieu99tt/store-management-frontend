import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { pageSizeState } from "../../states/app.state";
import { message, Modal } from "antd";
import { useUser } from "./useUser";
import { iUser } from "../../types/user.types";

const useUserList = () => {
    const pageSize = useRecoilValue(pageSizeState);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [initialData, setInitialData] = useState<any[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalNumber, setTotalNumber] = useState<number>(0);

    const { fetchUsers, deleteUser } = useUser({ type: "staff" });

    useEffect(() => {
        handleFetchUsers();
    }, []);

    const handleFetchUsers = async (sortBy = 4, isAsc = true) => {
        setLoading(true);
        const data = await fetchUsers();
        const filteredData =
            data &&
            data.length > 0 &&
            data.filter((e: iUser) => e.role !== "admin");
        setInitialData(filteredData);
        setTotalNumber(filteredData.length);
        setData(filteredData);
        setLoading(false);
    };

    const handleSearch = async (values: any) => {
        if (!values.name) {
            setData(initialData);
            setPageNumber(1);
        } else {
            const keyword = values.name.toLowerCase();
            const searchData = initialData.filter((item: iUser) => {
                return item.name.toLocaleLowerCase().includes(keyword);
            });
            setData(searchData);
        }
    };

    const onDelete = (expenseID: number) => {
        Modal.confirm({
            title: "Xóa người dùng này?",
            content: `Bạn có chắc muốn xóa người dùng này không? 
                Tất cả các tài liệu, thông tin liên quan đến người dùng này cũng sẽ bị xóa`,
            okText: "Xác nhận xóa",
            cancelText: "Hủy",
            onOk: async () => {
                const data = await deleteUser(expenseID);
                setPageNumber(1);
                await handleFetchUsers();
                if (data.status === 200) {
                    message.success("Xóa người dùng thành công");
                } else {
                    message.error("Đã xảy ra lỗi. Xin thử lại sau");
                }
            },
        });
    };

    return {
        data,
        pageSize,
        loading,
        totalNumber,

        onDelete,
        handleSearch,
    };
};

export { useUserList };
