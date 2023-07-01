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
  Tag,
} from "antd";
import { useEffect, useRef, useState } from "react";
import API from "../../utils/API";
import { useHistory } from "react-router-dom";
const { Search } = Input;
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
        GioiTinh: 0,
        TrangThai: 0,
        Username: "",
        Password: "",
        // MaLoaiNguoiDung: ""
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
        description: rs,
        placement: "topRight",
      });
    }
  };
  const onSearch = async (value) => {
    // history.push("/User");
    const rs = await API.get(`nguoidung/search?keyword=${value}`);
    // console.log("kkkkk nguoidung", value);
    console.log("kkkkk search nguoidung", rs);

    // return;
    if (rs) {
      // setIsModalOpen(false);
      setNguoiDungs(rs.nguoiDung);
    // console.log("kkkkk nguoidungs", nguoidungs);
    //   nguoidungs = rs;
    // console.log("kkkkk nguoidungs sau ", nguoidungs);
    } else {
      notify.error({
        message: `Lỗi thêm người dùng!`,
        description: rs,
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
        description: rs,
        placement: "topRight",
      });
    }
  };
  const onFinish = async () => {
    if (isEdit) {
      if (!nguoidung) return;
      const fixBodyRequest = {
        GioiTinh: nguoidung.GioiTinh,
        HoLot: nguoidung.HoLot,
        Ten: nguoidung.Ten,
        Email: nguoidung.Email,
        DiaChi: nguoidung.DiaChi,
        SoDienThoai: nguoidung.SoDienThoai,
        ViTri: nguoidung.ViTri,
        TrangThai: nguoidung.TrangThai,
        Username: nguoidung.Username,
        Password: nguoidung.Password,
        MaLoaiNguoiDung: nguoidung.MaLoaiNguoiDung,
      };
      console.log(fixBodyRequest);
      const rs = await API.put(
        `nguoidung/${nguoidung.MaNguoiDung}`,
        fixBodyRequest
      );
      if (rs) {
        setIsModalOpen(false);
        getData();
      } else {
        notify.error({
          message: `Lỗi sửa người dùng!`,
          description: rs,
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
          description: rs,
          placement: "topRight",
        });
      }
    }
  };
  const onChangeText = (key, e) => {
    if (["TrangThai"].includes(key)) {
      setNguoiDung({ ...nguoidung, [key]: e });
    } else if (["GioiTinh"].includes(key)) {
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
      dataIndex: "MaNguoiDung",
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
      key: "GioiTinh",
      dataIndex: "GioiTinh",
      render: (val) => (
        <span>
          {val && val.data[0] === 1
            ? "Nam"
            : val && val.data[0] === 0
            ? "Nữ"
            : ""}
        </span>
      ),
    },
    {
      title: "Trạng Thái",
      key: "TrangThai",
      dataIndex: "TrangThai",
      render: (val) => {
        return (
          <Tag color={val === 0 ? "error" : "success"}>
            {val === 0 ? "Chưa hoàn thành" : "Hoàn thành"}
          </Tag>
        );
      },
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
      render: (val) => {
        return <span>{val === null ? "Chưa được thêm" : val}</span>;
      },
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
        <Space direction="vertical">
          <Search
            style={{ marginTop: 17 }}
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
          />
        </Space>
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
              <Option value={1}>Nam</Option>
              <Option value={0}>Nữ</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Trạng Thái" name="TrangThai">
            <Select
              defaultValue={
                `${nguoidung.TrangThai}` === 0
                  ? 0
                  : `${nguoidung.TrangThai}` === 1
                  ? 1
                  : ""
              }
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
          {/* <Form.Item label="MaLoaiNguoiDung" name="MaLoaiNguoiDung">
            <Input
              placeholder="MaLoaiNguoiDung"
              onChange={(txt) => onChangeText("MaLoaiNguoiDung", txt)}
              value={nguoidung.MaLoaiNguoiDung}
            />
          </Form.Item> */}
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
