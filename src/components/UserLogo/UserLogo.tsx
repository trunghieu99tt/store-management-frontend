import { UserOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import cn from "classnames";

import classes from "./userLogo.module.css";
import { useSetRecoilState } from "recoil";
import { authState } from "../../states/app.state";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { useHistory } from "react-router";

const UserLogo = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const setAuth = useSetRecoilState(authState);
    const [, setUser] = useLocalStorage("user", false);
    const history = useHistory();

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
                <button
                    className={classes.btn}
                    onClick={() => {
                        setAuth(false);
                        setUser(false);
                        history.push("/auth");
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserLogo;
