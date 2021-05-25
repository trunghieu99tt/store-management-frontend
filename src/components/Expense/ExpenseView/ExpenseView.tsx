import { Spin } from "antd";
import React from "react";

// talons
import { useExpenseView } from "../../../talons/Expense/useExpenseView";

// utils
import DataView from "../../DataView";

interface Props {
    classes?: object;
}

const ExpenseView = ({ classes: propsClasses }: Props) => {
    const { expense, params, onGoBack, onGoToEdit, loading } = useExpenseView();

    if (loading) return <Spin />;

    return (
        <DataView
            data={expense}
            onGoBack={onGoBack}
            onGoToEdit={onGoToEdit}
            params={params}
            title="Thông tin phiếu chi"
        />
    );
};

export default ExpenseView;
