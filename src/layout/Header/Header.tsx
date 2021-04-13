import React from "react";
import UserLogo from "../../components/UserLogo";

import classes from "./header.module.css";

interface Props {}

const Header = (props: Props) => {
    return (
        <header className={classes.root}>
            <div className={classes.right}>
                <UserLogo />
            </div>
        </header>
    );
};

export default Header;
