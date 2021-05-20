import React from "react";

// Libs
import { Route, Switch } from "react-router-dom";

// pages

import NotFound from "../pages/NotFound";
import Overview from "../pages/Overview";
import ReportList from "../components/Report/ReportList";
import PrivateRoute from "../components/route/PrivateRoute";
import RevenueList from "../components/Revenue/RevenueList";
import RevenueForm from "../components/Revenue/RevenueForm";
import ExpenseList from "../components/Expense/ExpenseList";
import ExpenseForm from "../components/Expense/ExpenseForm";
import ReportGenerator from "../components/Report/ReportGenerator";
import RevenueStatistic from "../components/Revenue/RevenueStatistic";
import ExpenseStatistic from "../components/Expense/ExpenseStatistic";
import RevenueView from "../components/Revenue/RevenueView";
import ExpenseView from "../components/Expense/ExpenseView";

const PrivateRoutesController = () => {
    return (
        <Switch>
            <PrivateRoute exact path="/" component={Overview} />

            {/* ----------------- REVENUE ----------------------- */}

            <PrivateRoute exact path="/revenue" component={RevenueList} />
            <PrivateRoute
                exact
                path="/revenue/add"
                component={() => <RevenueForm view="ADD" />}
            />
            <PrivateRoute
                exact
                path="/revenue/view/:id"
                component={() => <RevenueView />}
            />
            <PrivateRoute
                exact
                path="/revenue/edit/:id"
                component={() => <RevenueForm view="EDIT" />}
            />

            {/* ----------------- EXPENSE ----------------------- */}

            <PrivateRoute exact path="/expense" component={ExpenseList} />
            <PrivateRoute
                exact
                path="/expense/add"
                component={() => <ExpenseForm view="ADD" />}
            />
            <PrivateRoute
                exact
                path="/expense/view/:id"
                component={() => <ExpenseView />}
            />
            <PrivateRoute
                exact
                path="/expense/edit/:id"
                component={() => <ExpenseForm view="EDIT" />}
            />

            {/* ----------------- REPORT ----------------------- */}

            <PrivateRoute exact path="/report" component={ReportList} />
            <PrivateRoute path="/report/generate" component={ReportGenerator} />
            <PrivateRoute
                path="/report/:id"
                component={() => <ReportGenerator view="VIEW" />}
            />

            {/* ----------------- STATISTIC ----------------------- */}

            <PrivateRoute
                exact
                path="/statistic/revenue"
                component={RevenueStatistic}
            />
            <PrivateRoute
                exact
                path="/statistic/expense"
                component={ExpenseStatistic}
            />

            <Route component={NotFound} />
        </Switch>
    );
};

export default PrivateRoutesController;
