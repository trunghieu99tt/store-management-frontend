import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router";
import { useRecoilState } from "recoil";

// utils
import client from "./api/client";

// pages
import NotFound from "./pages/NotFound";

// components
import Auth from "./pages/Auth";
import BaseView from "./layout/BaseView";
import Loading from "./components/Loading";
import PublicRoute from "./components/route/PublicRoute";
import PrivateRouteController from "./routes/PrivateRouteController";

// states
import { userState } from "./states/user.state";

const App = () => {
    const [user, setUser] = useRecoilState(userState);
    const [loading, setLoading] = useState<boolean>(true);

    // router
    const history = useHistory();

    useEffect(() => {
        const token =
            localStorage.getItem("token") &&
            JSON.parse(localStorage.getItem("token") || "");
        if (token !== null) {
            getUser();
        } else {
            setLoading(false);
            history.push("/login");
        }
    }, []);

    const getUser = async () => {
        const response = await client.get("/users/getMe");
        setUser(response.data.data);
        setLoading(false);
    };

    if (loading) return <Loading />;

    if (user) {
        return <PrivateRouteController />;
    }

    return (
        <React.Fragment>
            <Switch>
                <PublicRoute component={Auth} path="/login" />
                <Route component={NotFound} />
            </Switch>
        </React.Fragment>
    );
};

export default BaseView(App);
