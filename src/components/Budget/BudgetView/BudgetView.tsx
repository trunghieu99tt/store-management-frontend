import { Spin } from "antd";
import React from "react";

// talons
import { useBudgetView } from "../../../talons/Budget/useBudgetView";

// utils
import DataView from "../../DataView";

interface Props {
    classes?: object;
}

const BudgetView = ({ classes: propsClasses }: Props) => {
    const { budget, params, onGoBack, onGoToEdit, loading } = useBudgetView();

    if (loading) return <Spin />;

    return (
        <DataView
            data={budget}
            onGoBack={onGoBack}
            onGoToEdit={onGoToEdit}
            params={params}
            title="Thông tin phiếu chi"
        />
    );
};

export default BudgetView;
