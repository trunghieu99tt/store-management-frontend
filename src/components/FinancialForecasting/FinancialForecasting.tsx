import React from "react";

// utils
import mergeClasses from "../../utils/mergeClasses";

// classes
import defaultClasses from "./financialForecasting.module.css";

interface Props {
    classes?: object;
}

const FinancialForecasting = ({ classes: propsClasses }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    return <section className={classes.root}></section>;
};

export default FinancialForecasting;
