import React from "react";
import { Link } from "react-router-dom";

// styles
import classes from "./Logo.module.css";

interface Props {
    classes?: object;
}

const Logo = ({ classes: propsClasses }: Props) => {
    return (
        <figure className={classes.root}>
            <Link to="/">
                <img
                    src={require("../../static/images/logo.jpg").default}
                    alt="logo"
                    width={150}
                    height={50}
                    className={classes.img}
                />
            </Link>
        </figure>
        // <div className={classes.root}>SMA</div>
    );
};
export default Logo;
