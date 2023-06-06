import {
  PieChartOutlined,
  DesktopOutlined,
  TeamOutlined,
  CloudOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useState } from "react";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Trang Chủ", "1", <PieChartOutlined />),
  getItem("Làm Việc", "sub1", <DesktopOutlined />, [
    getItem("Nhóm Làm Việc", "2"),
  ]),

  getItem("Lưu Trữ", "sub2", <CloudOutlined />, [
    getItem("Gần Đây", "3"),
    getItem("Tài Liệu Làm Việc", "4"),
    getItem("Tài Liệu Của Tôi", "5"),
    getItem("Thùng Rác", "6"),
  ]),
  getItem("Tin Nhắn", "", <MailOutlined />),
  getItem("Thành Viên", "sub3", <TeamOutlined />, [
    getItem("Thêm Thành Viên", "7"),
  ]),
];
const AppLayout = () => {
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
          ></Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            Hello page main.
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AppLayout;
