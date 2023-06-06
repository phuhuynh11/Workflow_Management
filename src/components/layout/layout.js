import {
  PieChartOutlined,
  FileDoneOutlined,
  TeamOutlined,
  CloudOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useState } from "react";
import CongViecLayout from "./nhomcongviec";
const {Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Tổng quan", "1", <PieChartOutlined />),
  getItem("Dự án", "sub1", <FileDoneOutlined />),

  getItem("Lưu Trữ", "sub2", <CloudOutlined />, [
    getItem("Gần Đây", "3"),
    getItem("Tài Liệu Làm Việc", "4"),
    getItem("Tài Liệu Của Tôi", "5"),
    getItem("Thùng Rác", "6"),
  ]),
  getItem("Tin Nhắn", "", <MailOutlined />),
  getItem("Thành Viên", "3", <TeamOutlined />),
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
            
           <CongViecLayout/>
          </div>
        </Content>
    
      </Layout>
    </Layout>
  );
};
export default AppLayout;
