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
import { useHistory } from "react-router-dom";
const { Search } = Input;
const { Option } = Select;
// import Appdate from "./Appdate";
// import moment from "moment";
// import API from "../../utils/API";
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

const CongViec = () => {
  const formRef = useRef(null);
  const [collapsed, setCollapsed] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [congviecs, setCongviecs] = useState([]);
  const [congviec, setCongviec] = useState({});
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const history = useHistory();
  const [notify, contextHolder] = notification.useNotification();
  useEffect(() => {
    // getData();
  }, []);
  useEffect(() => {
    console.log("kkkkk isModalOpen isEdit", isModalOpen, isEdit);
    if (isModalOpen && isEdit) {
      formRef.current?.setFieldsValue(congviec);
    } else {
      formRef.current?.setFieldsValue({
        TenCongViec: "",
        MoTaCongViec: "",
        TrangThai: "",
        UuTien: "",
        NgayBatDau: "",
        NgayKetThuc: "",
      });
    }
  }, [isModalOpen, isEdit]);
  // const getData = async () => {
  //   const rs = await API.get("congviec");
  //   if (rs && rs.length > 0) {
  //     setCongviecs(rs);
  //   } else {
  //     notify.error({
  //       message: `Load products failed!`,
  //       description: rs.status,
  //       placement: "topRight",
  //     });
  //   }
  // };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };

  const onAdd = () => {
    setIsEdit(false);
    showModal();
  };

  const onEdit = (MaCongViec) => {
    const _congviec = congviecs.find((k) => k.MaCongViec === MaCongViec);
    setIsModalOpen(true);
    setIsEdit(true);
    setCongviec({ ..._congviec });
    console.log("kkkkk _congviec", _congviec);
  };
  // const onDelete = async (MaCongViec) => {
  //   const rs = await API.delete(`congviec/${MaCongViec}`);
  //   console.log("kkkkk delete congviec", rs);
  //   if (rs) {
  //     notify.success({
  //       message: `Xóa dự án thành công!`,
  //       placement: "topRight",
  //     });

  //     getData();
  //   } else {
  //     notify.error({
  //       message: `Lỗi xóa dự án!`,
  //       description: rs.status,
  //       placement: "topRight",
  //     });
  //   }
  // };
  // const onFinish = async () => {
  //   console.log("kkkkk congviec", congviec);
  //   // return;
  //   if (isEdit) {
  //     const rs = await API.put(`congviec/${congviec.MaCongViec}`, congviec);
  //     console.log("kkkkk update congviec", rs);
  //     if (rs) {
  //       setIsModalOpen(false);
  //       getData();
  //     } else {
  //       notify.error({
  //         message: `Lỗi sửa dự án!`,
  //         description: rs.status,
  //         placement: "topRight",
  //       });
  //     }
  //   } else {
  //     const rs = await API.post("congviec", congviec);
  //     console.log("kkkkk add congviec", rs);
  //     if (rs) {
  //       setIsModalOpen(false);
  //       getData();
  //     } else {
  //       notify.error({
  //         message: `Lỗi thêm dự án!`,
  //         description: rs.status,
  //         placement: "topRight",
  //       });
  //     }
  //   }
  // };
  const onChangeText = (key, e) => {
    console.log("kkkkk ", e?.target?.value ?? e);
    if (["TrangThai"].includes(key)) {
      setCongviec({ ...congviec, [key]: e });
    } else {
      setCongviec({ ...congviec, [key]: e.target.value });
    }
  };

  // const _onDatePickerFinish = (dates) => {
  //   console.log("kkkkk _onDatePickerFinish start", dates[0]);
  //   console.log("kkkkk _onDatePickerFinish end", dates[1]);
  //   setCongviec({
  //     ...congviec,
  //     NgayBatDau: moment(dates[0]).format("YYYY-MM-DD"),
  //     NgayKetThuc: moment(dates[1]).format("YYYY-MM-DD"),
  //   });
  // };

  // const items = [
  //   getItem("Công việc", "cong_viec", <FileDoneOutlined />, [
  //     getItem("Thêm công việc", "them_cong_viec", <FileAddOutlined />),
  //   ]),
  // ];

  const COLUMNS = [
    {
      title: "Tên Công Việc",
      dataIndex: "TenCongViec",
    },
    {
      title: "Mô Tả",
      dataIndex: "MoTaCongViec",
    },
    {
      title: "Trạng Thái",
      dataIndex: "TrangThai",
    },
    {
      title: "Ưu Tiên",
      dataIndex: "UuTien",
    },
    {
      title: "Ngày Bắt Đầu",
      dataIndex: "NgayBatDau",
      // render: (val) => <span>{moment(val).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Ngày Kết Thúc",
      dataIndex: "NgayKetThuc",
      // render: (val) => <span>{moment(val).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Action",
      render: (_, congviec) => (
        <Space>
          {/* <a onClick={() => onCongviec(congviec.MaCongViec)}>Công việc</a> */}
          <a
            style={{ marginLeft: 5 }}
            onClick={() => onEdit(congviec.MaCongViec)}
          >
            Sửa
          </a>
          <Popconfirm
            title="Chắc chắn xóa?"
            // onConfirm={() => onDelete(congviec.MaCongViec)}
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
    //     ></Header>
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
        dataSource={congviecs}
        columns={COLUMNS}
        rowKey="MaCongViec"
        style={{ marginTop: 8 }}
      />

      <Modal
        title={`${isEdit ? "Sửa" : "Add"} Công Việc`}
        open={isModalOpen}
        footer={null}
        closeIcon={
          <div onClick={hideModal}>
            <CloseOutlined />
          </div>
        }
      >
        <Form
          // onFinish={onFinish}
          layout="vertical"
          className="row-col"
          style={{ marginTop: 12 }}
        >
          <Form.Item
            label="Tên công việc"
            name="TenCongViec"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên công việc!",
              },
            ]}
          >
            <Input
              placeholder="Tên Công Việc"
              onChange={(txt) => onChangeText("TenCongViec", txt)}
              value={congviec.TenCongViec}
            />
          </Form.Item>
          <Form.Item label="Mô Tả" name="MoTaCongViec">
            <Input
              placeholder="Mô Tả"
              onChange={(txt) => onChangeText("MoTaCongViec", txt)}
              value={congviec.MoTaCongViec}
            />
          </Form.Item>
          <Form.Item label="Trạng Thái" name="TrangThai">
            <Select
              defaultValue={`${congviec.TrangThai}` === "1" ? "1" : "0"}
              onChange={(txt) => onChangeText("TrangThai", txt)}
              style={{ width: "100%" }}
              value={
                `${congviec.TrangThai}` === "1"
                  ? "Hoàn thành"
                  : "Chưa hoàn thành"
              }
            >
              <Option value="1">Hoàn thành</Option>
              <Option value="0">Chưa hoàn thành</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Ưu Tiên" name="UuTien">
            <Input
              placeholder="Ưu Tiên"
              onChange={(txt) => onChangeText("UuTien", txt)}
              value={congviec.UuTien}
            />
          </Form.Item>
          <Form.Item label="Ngày Bắt Đầu & kết Thúc">
            {/* <Appdate finish={_onDatePickerFinish} /> */}
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
    //   </Content>
    //     </Layout>
    //   </Layout>
  );
};
export default CongViec;
