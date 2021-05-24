import React, { useState } from "react";
import cn from "classnames";

// talons
import { useHistory } from "react-router";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useLocalStorage } from "../../../utils/useLocalStorage";

// icons
import { UserOutlined } from "@ant-design/icons";

// styles
import classes from "./userLogo.module.css";

// states
import { authState } from "../../../states/app.state";
import { userState } from "../../../states/user.state";

const UserLogo = () => {
    const [token, setToken] = useLocalStorage("token", false);
    const setUser = useSetRecoilState(userState);
    const [showDropdown, setShowDropdown] = useState(false);
    const history = useHistory();

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        history.push("/login");
    };

    return (
        <div className={classes.root}>
            <button
                className={classes.icon}
                onClick={() => setShowDropdown((value) => !value)}
            >
                <UserOutlined />
            </button>

            <div
                className={cn(classes.dropdown, {
                    [classes.active]: showDropdown,
                })}
            >
                <button className={classes.btn} onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserLogo;
