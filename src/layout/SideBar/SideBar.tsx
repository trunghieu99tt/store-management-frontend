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
    ContainerOutlined,
    DashboardOutlined,
    DatabaseOutlined,
    FileAddOutlined,
    LineChartOutlined,
    MenuOutlined,
    RadarChartOutlined,
    TransactionOutlined,
    UserOutlined,
} from "@ant-design/icons";

import Logo from "../../components/Logo";

// types
import { Size } from "../../types/app.types";

interface Props {
    classes?: object;
}

export type SideBarItemType = {
    icon?: any;
    name: string;
    path?: string;
    level: number;
    children?: SideBarItemType[];
};

const SideBar = ({ classes: propsClasses }: Props) => {
    const [hide, setHide] = useState<boolean>(true);

    const navigation = [
        {
            name: "Quản lí thu chi",
            icon: <DashboardOutlined />,
            level: 1,
            children: [
                {
                    name: "Quản lí thu",
                    icon: <TransactionOutlined />,
                    path: "revenue",
                    level: 2,
                },
                {
                    name: "Quản lí chi",
                    icon: <TransactionOutlined />,
                    path: "expense",
                    level: 2,
                },
            ],
        },
        {
            name: "Quản lí ngân sách",
            icon: <ContainerOutlined />,
            level: 1,
            children: [
                {
                    name: "Danh sách ngân sách",
                    icon: <DatabaseOutlined />,
                    path: "budget",
                    level: 2,
                },
                {
                    name: "Tạo ngân sách",
                    icon: <FileAddOutlined />,
                    path: "budget/add",
                    level: 2,
                },
            ],
        },
        {
            name: "Thống kê tài chính",
            icon: <RadarChartOutlined />,
            level: 1,
            children: [
                {
                    name: "Thống kê theo doanh thu",
                    icon: <LineChartOutlined />,
                    path: "statistic/revenue",
                    level: 2,
                },
                {
                    name: "Thống kê theo chi phí",
                    icon: <LineChartOutlined />,
                    path: "statistic/expense",
                    level: 2,
                },
            ],
        },
        {
            name: "Báo cáo",
            icon: <ContainerOutlined />,
            level: 1,
            children: [
                {
                    name: "Danh sách báo cáo",
                    icon: <DatabaseOutlined />,
                    path: "report",
                    level: 2,
                },
                {
                    name: "Tạo báo cáo",
                    icon: <FileAddOutlined />,
                    path: "report/generate",
                    level: 2,
                },
            ],
        },
        {
            name: "Quản lí người dùng",
            icon: <UserOutlined />,
            path: "users",
            level: 1,
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
                        className={cn(classes.btn, classes.itemRoot, {
                            [classes.itemActive]: isActive || item.level === 1,
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
