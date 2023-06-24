import {
  FileDoneOutlined,
  FileAddOutlined,
  PlusOutlined,
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
  Select,
  Popconfirm,
  notification,
} from "antd";
import { useEffect, useRef, useState } from "react";
import API from "../../utils/API";
import { useHistory } from "react-router-dom";
import { resetObject } from "../../utils/Common";
import Appdate from "./Appdate";
import moment from "moment";
const { Search } = Input;
const { Option } = Select;
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
  const formRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [duans, setDuans] = useState([]);
  const [duan, setDuan] = useState({});
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const history = useHistory();
  const [notify, contextHolder] = notification.useNotification();
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    console.log("kkkkk isModalOpen isEdit", isModalOpen, isEdit);
    if (isModalOpen && isEdit) {
      formRef.current?.setFieldsValue(duan);
    } else {
      formRef.current?.setFieldsValue({
        TenDuAn: "",
        MoTaDuAn: "",
        NgayBatDau: "",
        NgayKetThuc: "",
      });
    }
  }, [isModalOpen, isEdit]);
  const getData = async () => {
    const rs = await API.get("duan");
    if (rs && rs.length > 0) {
      setDuans(rs);
    } else {
      notify.error({
        message: `Không có dự án!`,
        description: rs.status,
        placement: "topRight",
      });
    }
  };
  // const items = [
  //   getItem("Dự án", "du_an", <FileDoneOutlined />, [
  //     getItem("Thêm dự án", "them_du_an", <FileAddOutlined />),
  //   ]),
  // ];
  const onCongviec = (MaDuAn) => {
    history.push(`/du-an/${MaDuAn}`);
  };
  const onEdit = (MaDuAn) => {
    const _duan = duans.find((k) => k.MaDuAn === MaDuAn);
    setIsModalOpen(true);
    setIsEdit(true);
    setDuan({ ..._duan });
    console.log("kkkkk _duan", _duan);
  };
  const onDelete = async (MaDuAn) => {
    const rs = await API.delete(`duan/${MaDuAn}`);
    console.log("kkkkk delete duan", rs);
    if (rs) {
      notify.success({
        message: `Xóa dự án thành công!`,
        placement: "topRight",
      });

      getData();
    } else {
      notify.error({
        message: `Lỗi xóa dự án!`,
        description: rs.status,
        placement: "topRight",
      });
    }
  };
  const onFinish = async () => {
    console.log("kkkkk duan", duan);
    // return;
    if (isEdit) {
      const rs = await API.put(`duan/${duan.MaDuAn}`, duan);
      console.log("kkkkk update duan", rs);
      if (rs) {
        setIsModalOpen(false);
        getData();
      } else {
        notify.error({
          message: `Lỗi sửa dự án!`,
          description: rs.status,
          placement: "topRight",
        });
      }
    } else {
      const rs = await API.post("duan", duan);
      console.log("kkkkk add duan", rs);
      if (rs) {
        setIsModalOpen(false);
        getData();
      } else {
        notify.error({
          message: `Lỗi thêm dự án!`,
          description: rs.status,
          placement: "topRight",
        });
      }
    }
  };
  // const onChangeText = (key, e) => {
  //   console.log("kkkkk ", e.target.value);
  //   setDuan({ ...duan, [key]: e.target.value });
  // };

  const onChangeText = (key, e) => {
    console.log("kkkkk ", e?.target?.value ?? e);
    if (["TrangThai"].includes(key)) {
      setDuan({ ...duan, [key]: e });
    } else {
      setDuan({ ...duan, [key]: e.target.value || e });
    }
  };

  const onAdd = () => {
    setIsEdit(false);
    showModal();
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };
  const onMenuClick = ({ key }) => {
    console.log("kkkk item");
    if (key === "them_du_an") {
      showModal();
      // const onAdd = () => {
      //   setIsEdit(false);
      //   showModal();
      // };
    }
    if (key === "du_an") {
      //
    }
  };

  const _onDatePickerFinish = (dates) => {
    console.log("kkkkk _onDatePickerFinish start", dates[0]);
    console.log("kkkkk _onDatePickerFinish end", dates[1]);
    setDuan({
      ...duan,
      NgayBatDau: moment(dates[0]).format("YYYY-MM-DD"),
      NgayKetThuc: moment(dates[1]).format("YYYY-MM-DD"),
    });
  };

  const COLUMNS = [
    {
      title: "Tên Dự Án",
      dataIndex: "TenDuAn",
    },
    {
      title: "Mô Tả",
      dataIndex: "MoTaDuAn",
    },
    {
      title: "Trạng Thái",
      dataIndex: "TrangThai",
      render: (val) => (
        <span>
          {val === 1 ? "Hoàn thành" : val === 2 ? "Trễ" : "Chưa hoàn thành"}
        </span>
      ),
    },
    {
      title: "Ngày Bắt Đầu",
      dataIndex: "NgayBatDau",
      render: (val) => <span>{moment(val).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Ngày Kết Thúc",
      dataIndex: "NgayKetThuc",
      render: (val) => <span>{moment(val).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Action",
      render: (_, duan) => (
        <Space>
          <a onClick={() => onCongviec(duan.MaDuAn)}>Công việc</a>
          <a style={{ marginLeft: 5 }} onClick={() => onEdit(duan.MaDuAn)}>
            Sửa
          </a>
          <Popconfirm
            title="Chắc chắn xóa?"
            onConfirm={() => onDelete(duan.MaDuAn)}
          >
            <a style={{ color: "red", marginLeft: 5 }}>Xóa</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    // <Layout
    //   style={{
    //     minHeight: "100vh",
    //   }}
    // >
    //   <Sider
    //     collapsible
    //     theme="light"
    //     collapsed={collapsed}
    //     onCollapse={(value) => setCollapsed(value)}
    //   >
    //     <div className="demo-logo-vertical" />
    //     <Search
    //       placeholder="Tìm kiếm ở đây..."
    //       onSearch={onSearch}
    //       enterButton
    //     />

    //     <Menu
    //       theme="light"
    //       defaultSelectedKeys={["1"]}
    //       mode="inline"
    //       items={items}
    //       onClick={onMenuClick}
    //     />
    //   </Sider>
    //   <Layout>
    //     <Header
    //       style={{
    //         padding: 0,
    //         background: colorBgContainer,
    //         fontSize: 20,
    //         fontStyle: Blob,
    //       }}
    //     >
    //       Dự án và công việc
    //     </Header>
    //     <Content
    //       style={{
    //         margin: "16px",
    //       }}
    //     >
    //       <Breadcrumb style={{}}></Breadcrumb>
    //       <div
    //         style={{
    //           padding: 24,
    //           minHeight: 650,
    //           background: colorBgContainer,
    //         }}
    //       >
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 5,
        }}
      >
        <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
          Thêm
        </Button>
      </div>
      <Table
        dataSource={duans}
        columns={COLUMNS}
        rowKey="MaDuAn"
        style={{ marginTop: 8 }}
      />

      <Modal
        title={`${isEdit ? "Sửa" : "Add"} Dự án`}
        open={isModalOpen}
        footer={null}
        closeIcon={
          <div onClick={hideModal}>
            <CloseOutlined />
          </div>
        }
      >
        <Form
          ref={formRef}
          onFinish={onFinish}
          layout="vertical"
          className="row-col"
          style={{ marginTop: 12 }}
        >
          <Form.Item
            label="Tên dự án"
            name="TenDuAn"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên dự án!",
              },
            ]}
          >
            <Input
              placeholder="Tên Dự Án"
              onChange={(txt) => onChangeText("TenDuAn", txt)}
              value={duan.TenDuAn}
            />
          </Form.Item>
          <Form.Item label="Mô Tả" name="MoTaDuAn">
            <Input
              placeholder="Mô Tả"
              onChange={(txt) => onChangeText("MoTaDuAn", txt)}
              value={duan.MoTaDuAn}
            />
          </Form.Item>
          <Form.Item label="Trạng Thái" name="TrangThai">
            <Select
              // defaultValue={`${duan.TrangThai}` === "1" ? "1" :`${duan.TrangThai}` === "2" ? "2" : "3"}
              onChange={(txt) => onChangeText("TrangThai", txt)}
              style={{ width: "100%" }}
              value={
                `${duan.TrangThai}` === "1"
                  ? "Hoàn thành"
                  : `${duan.TrangThai}` === "2"
                  ? "Trễ"
                  : "Chưa hoàn thành"
              }
            >
              <Option value="1">Hoàn thành</Option>
              <Option value="2">Trễ</Option>
              <Option value="3">Chưa hoàn thành</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Ngày Bắt Đầu & kết Thúc">
            <Appdate finish={_onDatePickerFinish} />
          </Form.Item>
          <Form.Item
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={hideModal}>Hủy</Button>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 12 }}>
              {isEdit ? "Sửa" : "Lưu"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {contextHolder}
    </>
    // </Content>
    // </Layout>
    // </Layout>
  );
};
export default Duan;
