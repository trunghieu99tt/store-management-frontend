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
import BudgetList from "../components/Budget/BudgetList";
import BudgetForm from "../components/Budget/BudgetForm";
import BudgetView from "../components/Budget/BudgetView";
import UserList from "../components/User/UserList";
import UserForm from "../components/User/UserForm";
import UserView from "../components/User/UserView";
import FinancialForecasting from "../components/FinancialForecasting";

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

            {/* ----------------- BUDGET ----------------------- */}

            <PrivateRoute exact path="/budget" component={BudgetList} />
            <PrivateRoute
                exact
                path="/budget/add"
                component={() => <BudgetForm view="ADD" />}
            />
            <PrivateRoute
                exact
                path="/budget/view/:id"
                component={() => <BudgetView />}
            />
            <PrivateRoute
                exact
                path="/budget/edit/:id"
                component={() => <BudgetForm view="EDIT" />}
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

            {/* ----------------- USER ----------------------- */}
            <PrivateRoute exact path="/users" component={UserList} />
            <PrivateRoute
                exact
                path="/user/add"
                component={() => <UserForm view="ADD" />}
            />
            <PrivateRoute
                exact
                path="/user/view/:id"
                component={() => <UserView />}
            />
            <PrivateRoute
                exact
                path="/user/edit/:id"
                component={() => <UserForm view="EDIT" />}
            />

            {/* ---------------- FINANCIAL FORECASTING --------------- */}
            <PrivateRoute
                exact
                path="/financialForecasting"
                component={() => <FinancialForecasting />}
            />
            <Route component={NotFound} />
        </Switch>
    );
};

export default PrivateRoutesController;
