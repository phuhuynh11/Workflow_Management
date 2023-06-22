import React from 'react'
import { Button, Form, Input, Typography, message, } from "antd";

const Resetpassword = () => {

    const resetpassword = () => {
        message.success('ForgotPassword Sucessful!!!')
    }
    return (
        <div className="login">
            <Form className="loginForm" onFinish={resetpassword}>
                <Typography.Title>Reset Password</Typography.Title>
                <p> Strong password include number, letters, and punctuation marks. </p>
                <Form.Item rules={[
                    {
                        required: true,
                        message: "Please enter your new password",
                    },
                ]}
                    label="Enter new password" name={"NewPassword"}>
                    <Input.Password placeholder="Enter your new Passwword" />
                </Form.Item>
                <Form.Item rules={[
                    {
                        required: true,
                        message: "Please enter your confirm password",
                    },
                ]}
                    label="Confirm new password" name={"ConfirmPassword"}>
                    <Input.Password placeholder="Enter your confirm new passwword" />
                </Form.Item>
                <Button type="primary" htmlType="submit" block >
                    Reset Password
                </Button>


            </Form>
        </div>
    );
};

export default Resetpassword;
