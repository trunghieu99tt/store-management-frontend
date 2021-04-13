import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

// components
import ExpansionPanel from "./ExpansionPanel";

// styles
import classes from "./sidebar.module.css";

import {
    DashboardOutlined,
    FileAddOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";

import Logo from "../../components/Logo";
import Icon from "@ant-design/icons";

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
    const navigation = [
        {
            name: "Sinh viên",
            icon: <DashboardOutlined />,
            children: [
                {
                    name: "Danh sách",
                    icon: <UnorderedListOutlined />,
                    path: "student/list",
                },
                {
                    name: "Thêm sinh viên",
                    icon: <FileAddOutlined />,
                    path: "student/add",
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
