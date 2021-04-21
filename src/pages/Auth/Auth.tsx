import React, { useEffect, useState } from "react";

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
    const [failedCounter, setFailedCounter] = useState<number>(0);
    const [fineTime, setFineTime] = useState<Date | null>(null);
    const history = useHistory();

    useEffect(() => {
        if (user) history.push("/");
    }, []);

    const onFinish = (values: iLoginForm) => {
        if (fineTime) {
            const dateNow = new Date();
            const diffTime = Math.abs(dateNow.getTime() - fineTime.getTime());
            if (diffTime / 1000 >= 5 * 60) {
                handleLogin(values);
            } else {
                message.error(
                    "Bạn đã nhập sai thông tin quá nhiều, xin chờ ít nhất 5 phút và thử lại"
                );
            }
        } else {
            handleLogin(values);
        }
    };

    const handleLogin = (values: iLoginForm) => {
        const { username, password } = values;

        if (username === USERNAME && password === PASSWORD) {
            message.success("Đăng nhập thành công");
            setAuth(true);
            history.push("/");
            setUser(true);
        } else {
            message.error("Thông tin đăng nhập không chính xác");
            setFailedCounter((value) => value + 1);
            if (failedCounter >= 5) {
                setFineTime(new Date());
                setFailedCounter(0);
            }
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
