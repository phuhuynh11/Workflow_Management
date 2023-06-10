import {
  PieChartOutlined,
  TeamOutlined,
  CloudOutlined,
  MailOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Duan from "./du-an";
const { Header, Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Xem thống kê báo cáo", "1", <PieChartOutlined />),
  getItem(
    "Dự án",
    "sub1",
    <NavLink to="/du-an">
      <DesktopOutlined />
    </NavLink>
  ),

  getItem("Lưu Trữ", "sub2", <CloudOutlined />, [
    getItem("Gần Đây", "3"),
    getItem("Tài Liệu Làm Việc", "4"),
    getItem("Tài Liệu Của Tôi", "5"),
    getItem("Thùng Rác", "6"),
  ]),
  getItem("Tin Nhắn", "", <MailOutlined />),
  getItem("Thành Viên", "3", <TeamOutlined />),
];
const AppLayout = (props) => {
  console.log("kkkk", props);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <div style={{ color: "#FFFFFF", marginLeft: 5, marginTop: 25 }}>
          <span>Quản lý phân công công việc</span>
        </div>
        <hr style={{ marginLeft: 7, marginRight: 7 }} />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {props.children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default AppLayout;
