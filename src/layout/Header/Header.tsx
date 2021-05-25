import React from "react";
import UserLogo from "../../components/User/UserLogo";

import classes from "./header.module.css";

interface Props {}

const Header = (props: Props) => {
    return (
        <header className={classes.root}>
            <p className={classes.title}>PTIT Financial</p>
            <div className={classes.right}>
                <UserLogo />
            </div>
        </header>
    );
};

export default Header;
