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
import API from "../../utils/API";
import { useEffect, useRef, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import UserStore from "../../stores/UserStore";
import CongViec from "./cong-viec";
const { TextArea } = Input;
const { Option } = Select;

// import Appdate from "./Appdate";
// import moment from "moment";
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

const ChiTietCongViec = () => {
  const { id } = useParams();
  // console.log(id);
  const formRef = useRef(null);
  const location = useLocation();
  const data = location.state?.data;
  const [collapsed, setCollapsed] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [congviecs, setCongviecs] = useState([]);
  const [congviec, setCongviec] = useState({});
  const [nguoiDungs, setNguoiDungs] = useState([]);
  const [taiLieus, setTaiLieus] = useState([]);

  // const [congviecbyduan, setCongviecbyduan] = useState({});
  console.log("kkkk location.state", location.state);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const history = useHistory();
  const [notify, contextHolder] = notification.useNotification();
  useEffect(() => {
    getData();
    getNguoiDungs();
    getTaiLieus();
  }, []);
  useEffect(() => {
    console.log("kkkkk isModalOpen isEdit", isModalOpen, isEdit);
    if (isModalOpen && isEdit) {
      formRef.current?.setFieldsValue(congviec);
    } else {
      formRef.current?.setFieldsValue({
        TenCongViec: UserStore.congViecHienTai.TenCongViec,
        TenTaiLieuCV: "",
        Ten: "",
      });
    }
  }, [isModalOpen, isEdit]);

  const getData = async () => {
    const rs = await API.get(`congviec/${id}`);
    console.log("kkkkk getData rs", rs);
    // return;
    if (rs && rs.length > 0) {
      setCongviecs(rs);
    } else {
      notify.error({
        message: `Không Có Chi Tiết Công Việc`,
        description: rs.status,
        placement: "topRight",
      });
    }
  };

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

  const getNguoiDungs = async () => {
    const rs = await API.get("nguoidung");
    console.log("kkkkk get nguoidung", rs);
    if (rs) {
      setNguoiDungs(rs);
    }
  };

  const getTaiLieus = async () => {
    const rs = await API.get("tailieu");
    console.log("kkkkk get tailieu", rs);
    if (rs) {
      setTaiLieus(rs);
    }
  };

  // const onChiTietCongviec = (MaCongViec) => {
  //   history.push(`/cong-viec/${MaCongViec}`);
  // };

  const onEdit = () => {
    // const _chitietcv = UserStore.congViecHienTai;
    setIsModalOpen(true);
    setIsEdit(true);
    setCongviec(congviecs[0]);
    console.log("kkkkk _chitietcv", CongViec);
  };
  //   const onDelete = async (MaCongViec) => {
  //     const rs = await API.delete(`congviec/${MaCongViec}`);
  //     console.log("kkkkk delete congviec", rs);
  //     if (rs) {
  //       notify.success({
  //         message: `Xóa chi tiết công việc thành công!`,
  //         placement: "topRight",
  //       });

  //       getData();
  //     } else {
  //       notify.error({
  //         message: `Lỗi xóa chi tiết công việc!`,
  //         description: rs.status,
  //         placement: "topRight",
  //       });
  //     }
  //   };
  const onFinish = async () => {
    console.log("kkkkk congviec", congviec);
    // return;
    if (isEdit) {
      const rs = await API.put(`congviec/${congviec.MaCongViec}`, congviec);
      console.log("kkkkk update congviec", rs);
      // return;
      if (rs) {
        setIsModalOpen(false);
        getData();
      } else {
        notify.error({
          message: `Lỗi sửa chi tiết công việc!`,
          description: rs.status,
          placement: "topRight",
        });
      }
    } else {
      const rs = await API.post("congviec", congviec);
      console.log("kkkkk add congviec", rs);
      // return;
      if (rs) {
        setIsModalOpen(false);
        getData();
      } else {
        notify.error({
          message: `Lỗi thêm chi tiết công việc!`,
          description: rs.status,
          placement: "topRight",
        });
      }
    }
  };
  const onChangeText = (key, e) => {
    console.log("kkkkk ", e?.target?.value ?? e);
    if (["MaTaiLieuCV", "MaNguoiDung"].includes(key)) {
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
      title: "Tài Liệu",
      dataIndex: "TenTaiLieuCV",
      render: (val) => <a>Tài liệu tham khảo</a>,
    },
    {
      title: "Người Thực Hiện",
      dataIndex: "Ten",
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
    // {
    //   title: "Ngày Bắt Đầu",
    //   dataIndex: "NgayBatDau",
    //   render: (val) => <span>{moment(val).format("YYYY-MM-DD")}</span>,
    // },
    // {
    //   title: "Ngày Kết Thúc",
    //   dataIndex: "NgayKetThuc",
    //   render: (val) => <span>{moment(val).format("YYYY-MM-DD")}</span>,
    // },
    // {
    //   title: "Action",
    //   render: (_, congviec) => (
    //     <Space>
    //       {/* <a onClick={() => onChiTietCongviec(congviec.MaCongViec)}>
    //           Chi tiết công việc
    //         </a> */}
    //       <a
    //         style={{ marginLeft: 5 }}
    //         onClick={() => onEdit(congviec.MaCongViec)}
    //       >
    //         Sửa
    //       </a>
    //       <Popconfirm
    //         title="Chắc chắn xóa?"
    //         onConfirm={() => onDelete(congviec.MaCongViec)}
    //       >
    //         <a style={{ color: "red", marginLeft: 5 }}>Xóa</a>
    //       </Popconfirm>
    //     </Space>
    //   ),
    // },
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
        {UserStore.userInfo?.nguoidung !== "Manager" ||
        UserStore.userInfo?.nguoidung !== "Director" ? (
          <Button type="primary" icon={<PlusOutlined />} onClick={onEdit}>
            Phân công công việc
          </Button>
        ) : null}
      </div>
      <Table
        dataSource={congviecs}
        columns={COLUMNS}
        rowKey="MaCongViec"
        style={{ marginTop: 8 }}
      />

      <Modal
        // title={`${isEdit ? "Sửa" : "Add"} Công Việc`}
        title={"Phân Công Công Việc"}
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
            label="Tên công việc"
            name="TenCongViec"
            // rules={[
            //   {
            //     required: true,
            //     message: "Vui lòng nhập tên công việc!",
            //   },
            // ]}
          >
            <Input
              placeholder="Tên Công Việc"
              onChange={(txt) => onChangeText("TenCongViec", txt)}
              value={UserStore.congViecHienTai.TenCongViec}
              disabled={true}
            />
          </Form.Item>
          <Form.Item label="Tài Liệu" name="MaTaiLieuCV">
            <Select
              onChange={(txt) => onChangeText("MaTaiLieuCV", txt)}
              style={{ width: "100%" }}
            >
              {taiLieus.map((t) => {
                return (
                  <Option key={t.MaTaiLieu} value={t.MaTaiLieu}>
                    {t.TenTaiLieu}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Người Thực Hiện" name="MaNguoiDung">
            <Select
              mode="multiple"
              onChange={(txt) => onChangeText("MaNguoiDung", txt)}
              style={{ width: "100%" }}
            >
              {nguoiDungs.map((n) => {
                return (
                  <Option key={n.MaNguoiDung} value={n.MaNguoiDung}>
                    {n.Ten}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          {/* <Form.Item label="Trạng Thái" name="TrangThai">
              <Select
                defaultValue={
                  `${congviec.TrangThai}` === "1"
                    ? "1"
                    : `${congviec.TrangThai}` === "2"
                    ? "2"
                    : "3"
                }
                onChange={(txt) => onChangeText("TrangThai", txt)}
                style={{ width: "100%" }}
                value={
                  `${congviec.TrangThai}` === "1"
                    ? "Hoàn thành"
                    : `${congviec.TrangThai}` === "2"
                    ? "Trễ"
                    : "Chưa hoàn thành"
                }
              >
                <Option value="1">Hoàn thành</Option>
                <Option value="2">Trễ</Option>
                <Option value="3">Chưa hoàn thành</Option>
              </Select>
            </Form.Item> */}
          {/* <Form.Item label="Ưu Tiên" name="UuTien">
              <Input
                placeholder="Ưu Tiên"
                onChange={(txt) => onChangeText("UuTien", txt)}
                value={congviec.UuTien}
              />
            </Form.Item>
            <Form.Item label="Ngày Bắt Đầu & kết Thúc">
              <Appdate finish={_onDatePickerFinish} />
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
    //   </Content>
    //     </Layout>
    //   </Layout>
  );
};
export default ChiTietCongViec;
