import {
  FileDoneOutlined,
  FileAddOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Button,
  Modal,
  Space,
  Form,
  Input,
  Table,
  Popconfirm,
} from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
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

const Duan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = [
    getItem("Dự án", "du_an", <FileDoneOutlined />, [
      getItem("Thêm dự án", "them_du_an", <FileAddOutlined />),
    ]),
  ];

  const onFinish = (values) => {
    console.log(values);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onMenuClick = ({ key }) => {
    console.log("kkkk item");
    if (key === "them_du_an") {
      showModal();
    }
    if (key === "du_an") {
      //
    }
  };

  const COLUMNS = [
    {
      title: "Tên dự án",
      dataIndex: "name",
    },
    // {
    //   title: "Code",
    //   dataIndex: "code",
    // },
    {
      title: "Created At",
      dataIndex: "createdAt",
      // render: (val) => <span>{moment(val).format("DD-MM-YYYY HH:mm:ss")}</span>,
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      // render: (val) => <span>{moment(val).format("DD-MM-YYYY HH:mm:ss")}</span>,
    },
    {
      title: "Action",
      render: (_, data) => (
        <Space>
          <a>Công việc</a>
          <a>Sửa</a>
          <Popconfirm title="Chắc chắn xóa?">
            <a className="text-danger">Xóa</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

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
          onClick={onMenuClick}
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
          >
            <Table columns={COLUMNS} rowKey="id" style={{ marginTop: 8 }} />
            <Modal
              title={"Dự án"}
              open={isModalOpen}
              footer={null}
              closeIcon={
                <div>
                  <CloseOutlined />
                </div>
              }
            >
              <Form
                onFinish={onFinish}
                layout="vertical"
                className="row-col"
                style={{ marginTop: 12 }}
              >
                <Form.Item
                  className="name"
                  label="Tên dự án"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên dự án!",
                    },
                  ]}
                >
                  <Input placeholder="Tên dự án" />
                </Form.Item>
                <Form.Item
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button>Hủy</Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginLeft: 12 }}
                  >
                    {"Cập nhật"}
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Duan;
