import {
  PieChartOutlined,
  TeamOutlined,
  CloudOutlined,
  MailOutlined,
  DesktopOutlined,
  AudioOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Button, Input, Space } from "antd";
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { PoweroffOutlined } from "@ant-design/icons";
import API from "../../utils/API";
const { Search } = Input;
const { Header, Content, Sider } = Layout;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);

const onSearch = (value) => console.log(value);

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(
    "Xem thống kê báo cáo",
    "1",
    <NavLink to="/Dashboard">
      <PieChartOutlined />
    </NavLink>
  ),
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
  getItem(
    "Thành Viên",
    "7",
    <NavLink to="/User">
      <TeamOutlined />
    </NavLink>
  ),
];
const AppLayout = (props) => {
  console.log("kkkk", props);
  const { id } = useParams();
  const [collapsed, setCollapsed] = useState(false);
  const [loadings, setLoadings] = useState([]);
  const [nguoidungs, setNguoidungs] = useState([]);
  const [nguoidung, setNguoidung] = useState({});
  // useEffect(() => {
  //   getData();
  // }, []);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 400);
  };
  // const getData = async () => {
  //   const rs = await API.get(`auth/login/${id}`);
  //   console.log("kkkkk nguoidung by id", rs);
  // };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  // const COLUMNS = [
  //   {
  //     dataIndex: "Ten",
  //   },
  // ];
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
        >
          <div style={{ marginLeft: "67%", fontSize: 18 }}>
            {/* <a columns={COLUMNS}/> */}
            <Space direction="vertical">
              <Search
                style={{ marginTop: 17 }}
                placeholder="input search text"
                onSearch={onSearch}
                enterButton
              />
            </Space>
            <Button
              type="primary"
              icon={<PoweroffOutlined />}
              loading={loadings[1]}
              onClick={() => enterLoading(1)}
              style={{ marginLeft: 5 }}
              href="/"
            >
              Đăng Xuất!
            </Button>
          </div>
        </Header>
        <Content>
          <div
            style={{
              padding: 24,
              minHeight: 800,
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
