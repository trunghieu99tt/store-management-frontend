import React from "react";

// talons
import { useRevenueView } from "../../../talons/Revenue/useRevenueView";

// components
import DataView from "../../DataView";

const RevenueView = () => {
    const { revenue, params, onGoBack, onGoToEdit } = useRevenueView();

    return (
        <DataView
            data={revenue}
            onGoBack={onGoBack}
            onGoToEdit={onGoToEdit}
            params={params}
            title="Thông tin phiếu thu"
        />
    );
};

export default RevenueView;
