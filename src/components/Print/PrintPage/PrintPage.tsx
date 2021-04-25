import React, { Component } from "react";

import classes from "./printPage.module.css";

class PrintPage extends Component {
    render() {
        const { children } = this.props;

        return (
            <div className={classes.printWrapper}>
                <div className={classes.header}>
                    <p>Logo</p>
                </div>
                <div className={classes.content}>{children}</div>
                <div className={classes.footer}>
                    <p>Copy Right</p>
                </div>
            </div>
        );
    }
}

export default PrintPage;
