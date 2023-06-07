import { FileDoneOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Input } from "antd";
import { useState } from "react";
const { Search } = Input;
const onSearch = (value) => console.log(value);
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
  getItem("Dự án", "sub1", <FileDoneOutlined />, [
    getItem("Dự án 1", "2"),
    getItem("Dự án 2", "3"),
  ]),
];
const CongViecLayout = () => {
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
        theme="light"
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Search
          placeholder="Tìm kiếm ở đây..."
          onSearch={onSearch}
          enterButton
        />

        <Menu
          theme="light"
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
            fontSize: 20,
            fontStyle: Blob,
          }}
        >
          Dự án
        </Header>
        <Content
          style={{
            margin: "16px",
          }}
        >
          <Breadcrumb style={{}}></Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 650,
              background: colorBgContainer,
            }}
          ></div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default CongViecLayout;
