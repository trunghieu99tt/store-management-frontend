import React from "react";

// utils
import mergeClasses from "../../../utils/mergeClasses";

// icons
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

// styles
import defaultClasses from "./overviewCard.module.css";
import classNames from "classnames";

interface Props {
    classes?: object;
    name: string;
    number: number;
    percent?: number;
    isInc?: boolean;
    icon?: any;
    key?: any;
}

const OverviewCard = ({
    classes: propsClasses,
    name,
    number,
    percent,
    isInc,
    icon,
}: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);
    return (
        <article className={classes.root}>
            <div className={classes.left}>
                <h4 className={classes.name}>{name}</h4>
                <p className={classes.number}>
                    {`${number.toString()}`.replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                    )}
                </p>
                {percent && (
                    <p
                        className={classNames(classes.percent, {
                            [classes.inc]: isInc,
                        })}
                    >
                        ({isInc ? "+" : "-"} {percent}%){" "}
                        {isInc ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    </p>
                )}
            </div>
            <div className={classes.right}>{icon}</div>
        </article>
    );
};

export default OverviewCard;
