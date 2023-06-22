
import { Button, Form, Input, Typography, message, } from "antd";
import React from 'react';

const ForgotPassword = () => {

    const forgotpassword = () => {
        message.success('Login Sucessful!!!')
    }

    return (
        <div className="login">
            <Form className="loginForm" onFinish={forgotpassword}>
                <Typography.Title>Forgot Password</Typography.Title>
                <p>Enter your register username to get forgot password. </p>
                <Form.Item rules={[
                    {
                        required: true,
                        message: "Please enter your username",
                    },
                ]}
                    label="Username" name={"myUsername"}>
                    <Input placeholder="Enter your Username" />
                </Form.Item>
                <Button type="primary" htmlType="submit" block >
                    Forgot Password
                </Button>
            </Form>
        </div>
    );
};

export default ForgotPassword;