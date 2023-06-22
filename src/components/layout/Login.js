import { GoogleOutlined, FacebookOutlined, } from "@ant-design/icons";
import { Button, Checkbox, Divider, Form, Input, Typography, message, } from "antd";
import React from 'react';
const Login = () => {

    const login = () => {
        message.success('Login Sucessful!!!')
    }
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    return (
        <div className="login">
            <Form className="loginForm" onFinish={login}>
                <Typography.Title>Login</Typography.Title>
                <p>Login in with your username and password</p>
                <Form.Item rules={[
                    {
                        required: true,
                        message: "Please enter valid username",
                    },
                ]}
                    label="Usermane" name={"myUsername"}>
                    <Input placeholder="Enter your username" />
                </Form.Item>
                <Form.Item rules={[
                    {
                        required: true,
                        message: "Please enter your password",
                    },
                ]}
                    label="Password" name={"myPassword"}>
                    <Input.Password placeholder="Enter your Passwword" />
                </Form.Item>
                <Checkbox onChange={onChange}>Remember Password</Checkbox>

                <Button type="primary" htmlType="submit" block >
                    Login
                </Button>

                < p className="forgotpassword"><a href="/forgot-password">Forgot Password</a></p>

                <Divider style={{ borderColor: "black" }}>or Login with</Divider>
                <div className="socialLogin">
                    <GoogleOutlined className="socialIcon" onClick={login} style={{ color: "red" }} />
                    <FacebookOutlined className="socialIcon" onClick={login} style={{ color: "blue" }} />

                </div>

            </Form>
        </div>
    );
};

export default Login;
