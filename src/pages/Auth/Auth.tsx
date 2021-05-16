import React, { useEffect, useState } from "react";

// utils
import client from "../../api/client";

// talons
import { useSetRecoilState } from "recoil";
import { useHistory } from "react-router";
import { useLocalStorage } from "../../utils/useLocalStorage";

// components
import { Form, Input, Button, message } from "antd";

// styles
import classes from "./auth.module.css";

// states
import { userState } from "../../states/user.state";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

interface iLoginForm {
    username: string;
    password: string;
}

const ENDPOINT = "/users";

const Auth = () => {
    const setUser = useSetRecoilState(userState);
    const [token, setToken] = useLocalStorage("token", false);
    const history = useHistory();

    useEffect(() => {
        if (token) {
            getUser();
            history.push("/");
        }
    }, [token]);

    const onFinish = (values: iLoginForm) => {
        handleLogin(values);
    };

    const handleLogin = async (values: iLoginForm) => {
        try {
            const response = await client
                .post(`${ENDPOINT}/login`, values)
                .then((res) => res.data);
            const token = response?.data?.access_token;
            setToken(token);
        } catch (error) {
            message.error("Wrong username or password");
        }
    };

    const getUser = async () => {
        const response = await client.get("/users/getMe");
        setUser(response.data.data);
    };

    return (
        <div className={classes.root}>
            <Form
                {...layout}
                name="basic"
                onFinish={onFinish}
                className={classes.form}
            >
                <h2 className={classes.title}>Đăng nhập</h2>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Xin hãy nhập username",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Xin hãy nhập password!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Auth;
