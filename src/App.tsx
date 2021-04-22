import React, { useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router";
import { useRecoilState } from "recoil";

// utils
import { useLocalStorage } from "./utils/useLocalStorage";

// components
import Auth from "./pages/Auth";
import BaseView from "./layout/BaseView";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import RevenueList from "./components/Revenue/RevenueList";
import RevenueForm from "./components/Revenue/RevenueForm";
import RevenueStatistic from "./components/Revenue/RevenueStatistic";

// styles
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "./App.css";

// states
import { authState, studentState } from "./states/app.state";
import Overview from "./pages/Overview";

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
                <Route exact path="/revenue" component={RevenueList} />
                <Route
                    exact
                    path="/statistic/revenue"
                    component={RevenueStatistic}
                />

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
            </Switch>
        </React.Fragment>
    );
};

export default BaseView(App);
