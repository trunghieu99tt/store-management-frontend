import React, { useEffect } from "react";
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
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import ReportList from "./components/Report/ReportList";
import RevenueList from "./components/Revenue/RevenueList";
import RevenueForm from "./components/Revenue/RevenueForm";
import ReportDetail from "./components/Report/ReportDetail";
import ReportGenerator from "./components/Report/ReportGenerator";
import RevenueStatistic from "./components/Revenue/RevenueStatistic";

// styles
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "./App.css";

// states
import { authState, studentState } from "./states/app.state";

const App = () => {
    const [user, setUser] = useLocalStorage("user", false);
    const [localStudents, setLocalStudents] = useLocalStorage("students", []);
    const [auth, setAuth] = useRecoilState(authState);
    const [students, setStudents] = useRecoilState(studentState);

    const history = useHistory();

    useEffect(() => {
        setAuth(user);
        if (!user) {
            history.push("/auth");
        } else {
            setStudents(localStudents);
        }
    }, []);

    useEffect(() => {
        setLocalStudents(students);
    }, [students, setLocalStudents]);

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
                    component={() => <RevenueForm view="VIEW" />}
                />
                <Route
                    exact
                    path="/revenue/edit/:id"
                    component={() => <RevenueForm view="EDIT" />}
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

                {/* ----------------- STUDENT ----------------------- */}

                <Route exact path="/student/list" component={StudentList} />
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
                ></Route>

                <Route component={NotFound}></Route>
            </Switch>
        </React.Fragment>
    );
};

export default BaseView(App);
