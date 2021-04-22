import React, { useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

// talons
import { useWindowSize } from "../../utils/useWindowSize";

// components
import ExpansionPanel from "./ExpansionPanel";

// styles
import classes from "./sidebar.module.css";

import {
    DashboardOutlined,
    LineChartOutlined,
    MenuOutlined,
    RadarChartOutlined,
    TransactionOutlined,
} from "@ant-design/icons";

import Logo from "../../components/Logo";

// types
import { Size } from "../../types/app.types";

interface Props {
    classes?: object;
}

export type SideBarItemType = {
    name: string;
    path?: string;
    icon?: any;
    children?: SideBarItemType[];
};

const SideBar = ({ classes: propsClasses }: Props) => {
    const [hide, setHide] = useState<boolean>(true);

    const navigation = [
        {
            name: "Quản lí thu chi",
            icon: <DashboardOutlined />,
            children: [
                {
                    name: "Quản lí thu",
                    icon: <TransactionOutlined />,
                    path: "revenue",
                },
                {
                    name: "Quản lí chi",
                    icon: <TransactionOutlined />,
                    path: "expense",
                },
            ],
        },
        {
            name: "Thống kê tài chính",
            icon: <RadarChartOutlined />,
            children: [
                {
                    name: "Thống kê theo doanh thu",
                    icon: <LineChartOutlined />,
                    path: "statistic/revenue",
                },
            ],
        },
    ];

    const renderLevels = (data: SideBarItemType[]) => {
        return data.map((item, idx) => {
            const isActive = false;

            if (item.children) {
                return (
                    <ExpansionPanel
                        item={item}
                        key={idx}
                        isActive={isActive}
                        classes={{
                            itemActive: classes.itemActive,
                            item: classes.item,
                        }}
                    >
                        {renderLevels(item.children)}
                    </ExpansionPanel>
                );
            }
            return (
                <Link to={`/${item.path}`}>
                    <button
                        key={item.name}
                        name="child"
                        className={cn(classes.btn, {
                            [classes.itemActive]: isActive,
                        })}
                    >
                        <div className={classes.item}>
                            {item.icon}
                            <span className={classes.itemName}>
                                {item.name}
                            </span>
                        </div>
                    </button>
                </Link>
            );
        });
    };

    const size: Size = useWindowSize();

    const { width } = size || {};

    if (width && width <= 1024) {
        return (
            <React.Fragment>
                <button
                    className={classes.toggleBtn}
                    onClick={() => setHide((value) => !value)}
                >
                    {(hide && <MenuOutlined />) || "X"}
                </button>
                {!hide && (
                    <div
                        className={classes.mask}
                        onClick={() => setHide(true)}
                    ></div>
                )}
                <div
                    className={cn(classes.root, {
                        [classes.hide]: hide,
                    })}
                >
                    <Logo
                        classes={{
                            root: classes.LogoRoot,
                            img: classes.LogoImg,
                        }}
                    />
                    {renderLevels(navigation)}
                </div>
            </React.Fragment>
        );
    }

    return (
        <div className={classes.root}>
            <Logo
                classes={{
                    root: classes.LogoRoot,
                    img: classes.LogoImg,
                }}
            />
            {renderLevels(navigation)}
        </div>
    );
};

export default SideBar;
