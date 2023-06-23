import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  Typography,
  message,
  checked,
} from "antd";
import React from "react";
import { useEffect, useRef, useState } from "react";
import Css from "../../../src/index.css";

/////////////////
import API from "../../utils/API";
import { USER_INFO } from "../../utils/Constants";
import { useHistory } from "react-router-dom";
import UserStore from "../../stores/UserStore";

////////////////
const Login = () => {
  const history = useHistory();
  const [checked, setChecked] = useState(true);

  const login = () => {
    message.success("Login Sucessful!!!");
  };
  // const onChange = (e) => {
  //     console.log(`checked = ${e.target.checked}`);
  // };

  ///////////////////////////
  useEffect(() => {
    const _user = localStorage.getItem(USER_INFO);
    // if (_user) history.push("/dashboard");
    console.log("kkkkk _user", _user);
  }, []);

  const onFinish = async (values) => {
    const { Username, Password } = values;
    const rs = await API.post("auth/login", { Username, Password });
    console.log("kkkkk add nguoidung", rs);
    // return;
    if (rs) {
      history.push("/Dashboard");
      localStorage.setItem(USER_INFO, JSON.stringify(rs));
      UserStore.setUserInfo(rs);
    } else {
      console.error({
        message: `Login failed!`,
        description: rs.status,
        placement: "topRight",
      });
    }
    console.log("kkkkk rs", rs);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = () => {
    console.log("kkkkk checked", checked);
    setChecked(!checked);
  };

  ////////////////////////////

  return (
    <div className="login">
      <Form
        className="loginForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Typography.Title>Login</Typography.Title>
        <p>Login in with your username and password</p>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter valid username",
            },
          ]}
          label="Usermane"
          name="Username"
        >
          <Input placeholder="Enter your username" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
          ]}
          label="Password"
          name="Password"
        >
          <Input.Password placeholder="Enter your Passwword" />
        </Form.Item>
        <Checkbox onChange={onChange}>Remember Password</Checkbox>

        <Button type="primary" htmlType="submit" block>
          Login
        </Button>

        <p className="forgotpassword">
          <a href="/forgot-password">Forgot Password</a>
        </p>

        <Divider style={{ borderColor: "black" }}>or Login with</Divider>
        <div className="socialLogin">
          <GoogleOutlined
            className="socialIcon"
            onClick={login}
            style={{ color: "red" }}
          />
          <FacebookOutlined
            className="socialIcon"
            onClick={login}
            style={{ color: "blue" }}
          />
        </div>
      </Form>
    </div>
  );
};

export default Login;
