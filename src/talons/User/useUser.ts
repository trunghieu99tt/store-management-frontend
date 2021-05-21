import { TUser } from "../../types/user.types";
import { useData } from "../common/useData";

const useUser = ({ type = "staff" }: { type: TUser }) => {
    let ADDITIONAL_ENDPOINT = "/users";

    switch (type) {
        case "manager":
            ADDITIONAL_ENDPOINT = "/users/manager";
            break;
        case "staff":
            ADDITIONAL_ENDPOINT = "/users/staff";
            break;
    }

    const { addOne, deleteOne, fetchList, fetchOne, updateOne } = useData({
        endpoint: "/users",
        additionalEndpoint: ADDITIONAL_ENDPOINT,
    });

    const fetchUsers = async () => {
        const response = await fetchList();
        return response.data;
    };

    const fetchUser = async (userID: number) => {
        const response = await fetchOne(userID);
        return response.data;
    };

    const addUser = async (data: any) => {
        const response = await addOne(data);
        return response;
    };

    const updateUser = async (data: any, userID: number) => {
        const response = await updateOne(userID, data);
        return response;
    };

    const deleteUser = async (userID: number) => {
        const response = await deleteOne(userID);
        return response;
    };

    return {
        addUser,
        fetchUser,
        fetchUsers,
        updateUser,
        deleteUser,
    };
};

export { useUser };
