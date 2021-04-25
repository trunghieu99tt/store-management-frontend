import { useState } from "react";
import { useRecoilValue } from "recoil";
import { pageSizeState } from "../../states/app.state";
import { iReport } from "../../types/report.types";

/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html} that provides report list logic
 * @kind function.
 *
 *
 * @return {{
 * data: iReport
 * }}
 *
 * */
const useReportList = () => {
    const pageSize = useRecoilValue(pageSizeState);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [data, setData] = useState<iReport[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalNumber, setTotalNumber] = useState<number>(0);
};

export { useReportList };
