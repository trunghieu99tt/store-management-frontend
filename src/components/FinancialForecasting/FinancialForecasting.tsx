import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useExpense } from "../../talons/Expense/useExpense";
import { useRevenue } from "../../talons/Revenue/useRevenue";
import { iExpense } from "../../types/expense.types";
import { iRevenue } from "../../types/revenue.types";
import { formatNumber } from "../../utils/helper";

// utils
import mergeClasses from "../../utils/mergeClasses";
import OverviewCard from "../Cards/OverviewCard";
import Loading from "../Loading";

// classes
import defaultClasses from "./financialForecasting.module.css";

interface Props {
  classes?: object;
}

const columns = [
  {
    title: "Tháng",
    dataIndex: "month",
    key: "month",
  },
  {
    title: "Lợi nhuận",
    dataIndex: "profit",
    key: "profit",
    render: (value: number) => {
      return <strong>{formatNumber(value)}</strong>;
    },
  },
];

const FinancialForecasting = ({ classes: propsClasses }: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);
  const [revenues, setRevenues] = useState<iRevenue[] | any>(null);
  const [expenses, setExpenses] = useState<iExpense[] | any>(null);

  const { fetchAllRevenues } = useRevenue();
  const { fetchExpenses } = useExpense({ type: "BASE" });

  const handleFetchAllExpenses = async () => {
    const data = await fetchExpenses();
    setExpenses(data.data);
  };

  const handleFetchAllRevenues = async () => {
    const data = await fetchAllRevenues();
    setRevenues(data);
  };

  useEffect(() => {
    handleFetchAllRevenues();
    handleFetchAllExpenses();
  }, []);

  // if(!revenues){
  //     return <Loading />
  // }

  const revenueCount = revenues?.reduce(
    (prev: any, curr: any) => prev + curr.total,
    0
  );
  const expenseCount = expenses?.reduce(
    (prev: any, curr: any) => prev + curr.total,
    0
  );
  const profit = revenueCount - expenseCount;

  const {data, forecast} = getFinancialData()

  return (
    <section className={classes.root}>
      <OverviewCard name="Doanh thu" number={revenueCount || 0} />
      <br />
      <OverviewCard name="Lợi nhuận" number={profit || 0} />
      <br />
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
            pageSize: 12,
            total: 12,
        }}
        scroll={{ x: "500px" }}
        loading={!revenues || !expenses}
      />
      <p>Dự báo năm {new Date().getFullYear() + 1}: Tăng trưởng {forecast} %</p>
    </section>
  );
};

const getFinancialData = () => {

    // const getRevenueByMonth = (month) => {

    // }

    let data: any = [];
    let forecast = 0;
    for(let i = 1; i < 12; i++){
        const item = {
            month: `Tháng ${i} -> Tháng ${i+1}`,
            profit: '10'
        }
        data.push(item)
    }
  return {data, forecast}
};

export default FinancialForecasting;
