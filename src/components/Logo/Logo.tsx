import React from "react";

// styles
import classes from "./Logo.module.css";

interface Props {
    classes?: object;
}

const Logo = ({ classes: propsClasses }: Props) => {
    return (
        <figure className={classes.root}>
            <img
                src={
                    require("../../static/images/logo-dai-hoc-tai-chinh-ngan-hang.jpg")
                        .default
                }
                alt="logo"
                width={150}
                height={50}
                className={classes.img}
            />
        </figure>
        // <div className={classes.root}>SMA</div>
    );
};
export default Logo;
