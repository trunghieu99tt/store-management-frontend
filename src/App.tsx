import React from "react";
import { Redirect, Route, Switch, useHistory } from "react-router";
import { useRecoilState } from "recoil";

// utils
import { useLocalStorage } from "./utils/useLocalStorage";

// pages
import Overview from "./pages/Overview";
import NotFound from "./pages/NotFound";

// components
import Auth from "./pages/Auth";
import BaseView from "./layout/BaseView";
import ReportList from "./components/Report/ReportList";
import RevenueList from "./components/Revenue/RevenueList";
import RevenueForm from "./components/Revenue/RevenueForm";
// import ReportDetail from "./components/Report/ReportDetail";
import ReportGenerator from "./components/Report/ReportGenerator";
import RevenueStatistic from "./components/Revenue/RevenueStatistic";
import ExpenseList from "./components/Expense/ExpenseList";
import ExpenseForm from "./components/Expense/ExpenseForm";
import ExpenseStatistic from "./components/Expense/ExpenseStatistic";
import RevenueView from "./components/Revenue/RevenueView";
import ExpenseView from "./components/Expense/ExpenseView";
import BudgetList from "./components/Budget/BudgetList";
import BudgetForm from "./components/Budget/BudgetForm";
import BudgetView from "./components/Budget/BudgetView";

// styles
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "./styles/override.css";
import "./App.css";

// states
import { authState } from "./states/app.state";

const App = () => {
    const [user, setUser] = useLocalStorage("user", false);
    const [auth, setAuth] = useRecoilState(authState);

    const history = useHistory();

    return (
        <React.Fragment>
            <Switch>
                <Route exact path="/" component={Overview} />
                <Route
                    exact
                    path="/auth"
                    render={() =>
                        (auth && <Redirect to="/"></Redirect>) || <Auth />
                    }
                    component={Auth}
                ></Route>

                {/* ----------------- REVENUE ----------------------- */}

                <Route exact path="/revenue" component={RevenueList} />
                <Route
                    exact
                    path="/revenue/add"
                    component={() => <RevenueForm view="ADD" />}
                />
                <Route
                    exact
                    path="/revenue/view/:id"
                    component={() => <RevenueView />}
                />
                <Route
                    exact
                    path="/revenue/edit/:id"
                    component={() => <RevenueForm view="EDIT" />}
                />

                {/* ----------------- EXPENSE ----------------------- */}

                <Route exact path="/expense" component={ExpenseList} />
                <Route
                    exact
                    path="/expense/add"
                    component={() => <ExpenseForm view="ADD" />}
                />
                <Route
                    exact
                    path="/expense/view/:id"
                    component={() => <ExpenseView />}
                />
                <Route
                    exact
                    path="/expense/edit/:id"
                    component={() => <ExpenseForm view="EDIT" />}
                />

                {/* ----------------- REPORT ----------------------- */}

                <Route exact path="/report" component={ReportList} />
                <Route path="/report/generate" component={ReportGenerator} />
                <Route
                    path="/report/:id"
                    component={() => <ReportGenerator view="VIEW" />}
                />

                {/* ----------------- STATISTIC ----------------------- */}

                <Route
                    exact
                    path="/statistic/revenue"
                    component={RevenueStatistic}
                />
                <Route
                    exact
                    path="/statistic/expense"
                    component={ExpenseStatistic}
                />

                {/* ----------------- BUDGET ----------------------- */}

                <Route exact path="/budget" component={BudgetList} />
                <Route
                    exact
                    path="/budget/add"
                    component={() => <BudgetForm view="ADD" />}
                />
                <Route
                    path="/budget/edit/:id"
                    component={() => <BudgetForm view="EDIT" />}
                ></Route>
                <Route
                    path="/budget/view/:id"
                    component={() => <BudgetView />}
                ></Route>

                {/* ----------------- STUDENT ----------------------- */}

                {/* <Route exact path="/student/list" component={StudentList} />
                <Route
                    exact
                    path="/student/add"
                    component={() => <StudentForm view="ADD" />}
                />
                <Route
                    path="/student/edit/:id"
                    component={() => <StudentForm view="EDIT" />}
                ></Route>
                <Route
                    path="/student/view/:id"
                    component={() => <StudentForm view="VIEW" />}
                ></Route> */}

                <Route component={NotFound}></Route>
            </Switch>
        </React.Fragment>
    );
};

export default BaseView(App);
