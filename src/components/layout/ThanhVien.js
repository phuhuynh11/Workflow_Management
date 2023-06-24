import { PlusOutlined, CloseOutlined } from "@ant-design/icons";

import {
  Layout,
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
const { Option } = Select;

const User = () => {
  const formRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nguoidungs, setNguoiDungs] = useState([]);
  const [nguoidung, setNguoiDung] = useState({});
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
      formRef.current?.setFieldsValue(nguoidung);
    } else {
      formRef.current?.setFieldsValue({
        HoLot: "",
        Ten: "",
        Email: "",
        DiaChi: "",
        SoDienThoai: "",
        ViTri: "",
        GioiTinh: "",
        TrangThai: "",
        Username: "",
        Password: "",
      });
    }
  }, [isModalOpen, isEdit]);
  const getData = async () => {
    const rs = await API.get("nguoidung");
    if (rs && rs.length > 0) {
      setNguoiDungs(rs);
    } else {
      notify.error({
        message: `Không có người dùng!`,
        description: rs.status,
        placement: "topRight",
      });
    }
  };
  const onCongviec = (MaDuAn) => {
    history.push(`/du-an/${MaDuAn}`);
  };
  const onEdit = (MaNguoiDung) => {
    const _nguoidung = nguoidungs.find((k) => k.MaNguoiDung === MaNguoiDung);
    setIsModalOpen(true);
    setIsEdit(true);
    setNguoiDung({ ..._nguoidung });
    console.log("kkkkk _duan", _nguoidung);
  };
  const onDelete = async (MaNguoiDung) => {
    const rs = await API.delete(`nguoidung/${MaNguoiDung}`);
    if (rs) {
      notify.success({
        message: `Xóa người dùng thành công!`,
        placement: "topRight",
      });
      getData();
    } else {
      notify.error({
        message: `Lỗi xóa người dùng!`,
        description: rs.status,
        placement: "topRight",
      });
    }
  };
  const onFinish = async () => {
    console.log("kkkkk duan", nguoidung);

    if (isEdit) {
      const rs = await API.put(`nguoidung/${nguoidung.MaNguoiDung}`, nguoidung);
      console.log("kkkkk update nguoidung", rs);
      // return;
      if (rs) {
        setIsModalOpen(false);
        getData();
      } else {
        notify.error({
          message: `Lỗi sửa người dùng!`,
          description: rs.status,
          placement: "topRight",
        });
      }
    } else {
      const rs = await API.post("nguoidung", nguoidung);
      if (rs) {
        setIsModalOpen(false);
        getData();
      } else {
        notify.error({
          message: `Lỗi thêm người dùng!`,
          description: rs.status,
          placement: "topRight",
        });
      }
    }
  };
  const onChangeText = (key, e) => {
    if (["TrangThai"].includes(key)) {
      setNguoiDung({ ...nguoidung, [key]: e });
    }
    if (["GioiTinh"].includes(key)) {
      setNguoiDung({ ...nguoidung, [key]: e });
    } else {
      setNguoiDung({ ...nguoidung, [key]: e.target.value || e });
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
  const COLUMNS = [
    {
      title: "Mã Người Dùng",
      key: "MaNguoiDung",
      dataIndex: "MaLoaiNguoiDung",
    },
    {
      title: "Họ Lót",
      key: "HoLot",
      dataIndex: "HoLot",
    },
    {
      title: "Tên",
      key: "Ten",
      dataIndex: "Ten",
    },
    {
      title: "Email",
      key: "Email",
      dataIndex: "Email",
    },
    {
      title: "Địa Chỉ",
      key: "DiaChi",
      dataIndex: "DiaChi",
    },
    {
      title: "Số Điện Thoại",
      key: "SoDienThoai",
      dataIndex: "SoDienThoai",
    },
    {
      title: "Vị Trí",
      key: "ViTri",
      dataIndex: "ViTri",
    },
    {
      title: "Giới Tính",
      dataIndex: "GioiTinh",
      render: (val) => <span>{val === 1 ? "Nam" : "Nữ"}</span>,
    },
    {
      title: "Trạng Thái",
      dataIndex: "TrangThai",
      render: (val) => (
        <span>{val === 1 ? "Hoàn thành" : "Chưa hoàn thành"}</span>
      ),
    },
    {
      title: "Username",
      dataIndex: "Username",
    },
    {
      title: "Password",
      dataIndex: "Password",
    },
    {
      title: "Mã Loại Người Dùng",
      key: "MaLoaiNguoiDung",
      dataIndex: "MaLoaiNguoiDung",
    },
    {
      title: "Action",
      render: (_, value) => (
        <Space>
          <a onClick={() => onCongviec(value.MaNguoiDung)}>Công việc</a>
          <a
            style={{ marginLeft: 5 }}
            onClick={() => onEdit(value.MaNguoiDung)}
          >
            Sửa
          </a>
          <Popconfirm
            title="Chắc chắn xóa?"
            onConfirm={() => onDelete(value.MaNguoiDung)}
          >
            <a style={{ color: "red", marginLeft: 5 }}>Xóa</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
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
        dataSource={nguoidungs}
        columns={COLUMNS}
        rowKey="MaNguoiDung"
        style={{ marginTop: 8 }}
      />

      <Modal
        title={`${isEdit ? "Sửa" : "Thêm"} Người dùng`}
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
            label="Họ Lót"
            name="HoLot"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ lót!",
              },
            ]}
          >
            <Input
              placeholder="Họ Lót"
              onChange={(txt) => onChangeText("HoLot", txt)}
              value={nguoidung.HoLot}
            />
          </Form.Item>
          <Form.Item
            label="Tên"
            name="Ten"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên!",
              },
            ]}
          >
            <Input
              placeholder="Tên"
              onChange={(txt) => onChangeText("Ten", txt)}
              value={nguoidung.Ten}
            />
          </Form.Item>
          <Form.Item label="Email" name="Email">
            <Input
              placeholder="Email"
              onChange={(txt) => onChangeText("Email", txt)}
              value={nguoidung.Email}
            />
          </Form.Item>
          <Form.Item label="Địa Chỉ" name="DiaChi">
            <Input
              placeholder="Địa Chỉ"
              onChange={(txt) => onChangeText("DiaChi", txt)}
              value={nguoidung.DiaChi}
            />
          </Form.Item>
          <Form.Item label="Số Điện Thoại" name="SoDienThoai">
            <Input
              placeholder="Số Điện Thoại"
              onChange={(txt) => onChangeText("SoDienThoai", txt)}
              value={nguoidung.SoDienThoai}
            />
          </Form.Item>
          <Form.Item label="Vị Trí" name="ViTri">
            <Input
              placeholder="Vị Trí"
              onChange={(txt) => onChangeText("ViTri", txt)}
              value={nguoidung.ViTri}
            />
          </Form.Item>
          <Form.Item label="Giới Tính" name="GioiTinh">
            <Select
              defaultValue={`${nguoidung.GioiTinh}` === "1" ? "1" : "0"}
              onChange={(txt) => onChangeText("GioiTinh", txt)}
              style={{ width: "100%" }}
              value={
                `${nguoidung.GioiTinh}` === 0
                  ? "Nam"
                  : `${nguoidung.GioiTinh}` === 1
                  ? "Nữ"
                  : null
              }
            >
              <Option value={0}>Nam</Option>
              <Option value={1}>Nữ</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Trạng Thái" name="TrangThai">
            <Select
              defaultValue={`${nguoidung.TrangThai}` === 0 ? 0 : 1}
              onChange={(txt) => onChangeText("TrangThai", txt)}
              style={{ width: "100%" }}
              value={
                `${nguoidung.TrangThai}` === 0
                  ? "Chưa hoàn thành"
                  : "Hoàn thành"
              }
            >
              <Option value={1}>Hoàn thành</Option>
              <Option value={0}>Chưa hoàn thành</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Username" name="Username">
            <Input
              placeholder="Username"
              onChange={(txt) => onChangeText("Username", txt)}
              value={nguoidung.Username}
            />
          </Form.Item>
          <Form.Item label="Password" name="Password">
            <Input
              placeholder="Password"
              onChange={(txt) => onChangeText("Password", txt)}
              value={nguoidung.Password}
            />
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
  );
};
export default User;
