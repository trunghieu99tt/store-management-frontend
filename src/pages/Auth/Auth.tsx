import React, { useEffect } from "react";

// talons
import { useRecoilState } from "recoil";
import { useHistory } from "react-router";

// components
import { Form, Input, Button, message } from "antd";

// styles
import classes from "./auth.module.css";

// states
import { authState } from "../../states/app.state";
import { useLocalStorage } from "../../utils/useLocalStorage";

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

const USERNAME = process.env.REACT_APP_USERNAME;
const PASSWORD = process.env.REACT_APP_PASSWORD;

const Auth = () => {
    const [auth, setAuth] = useRecoilState(authState);
    const [user, setUser] = useLocalStorage("user", false);
    const history = useHistory();

    useEffect(() => {
        if (user) history.push("/");
    }, []);

    const onFinish = (values: iLoginForm) => {
        const { username, password } = values;

        if (username === USERNAME && password === PASSWORD) {
            message.success("Đăng nhập thành công");
            setAuth(true);
            history.push("/");
            setUser(true);
        } else {
            message.error("Thông tin đăng nhập không chính xác");
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        message.error("Error");
    };

    return (
        <div className={classes.root}>
            <Form
                {...layout}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
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
