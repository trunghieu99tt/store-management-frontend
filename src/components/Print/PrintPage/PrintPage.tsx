import React, { Component } from "react";
import Logo from "../../Logo";

import classes from "./printPage.module.css";

class PrintPage extends Component {
    render() {
        const { children } = this.props;

        return (
            <div className={classes.printWrapper}>
                <div className={classes.header}>
                    <Logo />
                    <p>Công ty trách nhiệm hữu hạn 1 thành viên</p>
                </div>
                <div className={classes.content}>{children}</div>
                <div className={classes.footer}>
                    <p>Copy right. All right reserved @2020</p>
                </div>
            </div>
        );
    }
}

export default PrintPage;
