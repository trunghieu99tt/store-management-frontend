import React, { useState } from "react";
import cn from "classnames";

// talons
import { useHistory } from "react-router";
import { useSetRecoilState } from "recoil";
import { useLocalStorage } from "../../utils/useLocalStorage";

// icons
import { UserOutlined } from "@ant-design/icons";

// styles
import classes from "./userLogo.module.css";

// states
import { authState } from "../../states/app.state";

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
