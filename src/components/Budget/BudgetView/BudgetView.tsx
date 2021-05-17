import React from "react";

// talons
import { useExpenseView } from "../../../talons/Expense/useExpenseView";

// utils
import DataView from "../../DataView";

interface Props {
    classes?: object;
}

const BudgetView = ({ classes: propsClasses }: Props) => {
    const { expense, params, onGoBack, onGoToEdit } = useExpenseView();

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

export default BudgetView;
