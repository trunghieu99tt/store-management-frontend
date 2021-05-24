import React from "react";

// talons
import { useUserView } from "../../../talons/User/useUserView";

// utils
import DataView from "../../DataView";

interface Props {
    classes?: object;
}

const UserView = ({ classes: propsClasses }: Props) => {
    const { user, params, onGoBack, onGoToEdit } = useUserView();

    return (
        <DataView
            data={user}
            onGoBack={onGoBack}
            onGoToEdit={onGoToEdit}
            params={params}
            title="Thông tin tài khoản"
        />
    );
};

export default UserView;
