import React from "react";

// Libs
import { Route, Redirect, RouteProps } from "react-router-dom";

// State
import { useRecoilValue } from "recoil";
import { userState } from "../../states/user.state";

// Ok to use any? Investigate further if for some reason this causes issues
interface PropTypes extends RouteProps {
    component: React.ComponentType<any>;
}

/**
 * Private route component, check if user is valid else redirect
 *
 * @param Component
 *  Component to be rendered on the route
 * @param rest
 *  Props passed in
 */
const PrivateRoute: React.FC<PropTypes> = ({
    component: Component,
    ...rest
}) => {
    const user = useRecoilValue(userState);
    return (
        <Route
            {...rest}
            render={(props) =>
                user ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/login" }} />
                )
            }
        />
    );
};

export default PrivateRoute;
