import React from "react";
import { Avatar, Col, Divider, Drawer, List, Row } from 'antd';
import { useState } from 'react';
import { Pie, } from "@ant-design/plots";
import { Button, Upload, message, } from 'antd';
import { Input, Space, Typography, Form, } from 'antd';

import { UploadOutlined, TwitterOutlined, FacebookOutlined } from '@ant-design/icons';
const { Search } = Input;
const onSearch = (value) => console.log(value);
const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};
const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
);
const Dashboard = () => {

    // eslint-disable-next-line no-unused-vars
    const options = [
        {
            value: 'Member',
            label: 'Member',
        },
        {
            value: 'Admin',
            label: 'Admin',
        },
        {
            value: 'Manager',
            label: 'Manager',
        },
        {
            value: 'Director',
            label: 'Director',
        },
    ];
    const onChange = (value) => {
        console.log(value);
    };

    const data = [
        {
            type: 'Hoàn thành',
            value: 0,
        },
        {
            type: 'Chưa hoàn thành',
            value: 0,
        },
        {
            type: 'Trễ',
            value: 0,
        },

    ];
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
            type: 'outer',
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
    };

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div>
                <div>
                    <Search
                        placeholder="input search text"
                        onSearch={onSearch}
                        style={{
                            width: 600,
                        }}
                    />
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </div>
                <Row>
                    <Col span={24}>
                        <div>
                            <>
                                <List
                                    dataSource={[
                                        {
                                            id: 1,
                                            name: 'Boy',
                                        },
                                    ]}
                                    bordered
                                    renderItem={(item) => (
                                        <List.Item
                                            key={item.id}
                                            actions={[
                                                <a onClick={showDrawer} key={`a-${item.id}`}>
                                                    Xem thông tin cá nhân
                                                </a>,
                                            ]}
                                        >
                                            <List.Item.Meta
                                                avatar={
                                                    <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                                                }
                                                title={<a href="https://ant.design/index-cn">{item.name}</a>}
                                                description="Người dùng"
                                            />
                                        </List.Item>
                                    )}
                                />
                                <Drawer width={780} placement="right" closable={false} onClose={onClose} open={open}>
                                    <p
                                        className="site-description-item-profile-p"
                                        style={{
                                            marginBottom: 34,
                                        }}
                                    >
                                        Thông tin cá nhân
                                    </p>
                                    <Row>
                                        <Col span={12}>
                                            <DescriptionItem title="Tên" content="Boy" />
                                        </Col>
                                        <Col span={12}>
                                            <DescriptionItem title="Giới tính" content="Nam" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <DescriptionItem title="Vị trí" content="Member" />
                                        </Col>
                                        <Col span={12}>
                                            <DescriptionItem title="Trạng thái" content="Hoàn thành" />
                                        </Col>
                                    </Row>
                                    <Divider />
                                    <p className="site-description-item-profile-p">Công ty</p>
                                    <Row>
                                        <Col span={12}>
                                            <DescriptionItem title="Tên công ty" content="VNPT Cần Thơ" />
                                        </Col>
                                        <Col span={12}>
                                            <DescriptionItem title="Năm bắt đầu" content="2023" />
                                        </Col>
                                    </Row>
                                    <Row>
                                    </Row>
                                    <Divider />
                                    <p className="site-description-item-profile-p">Liên hệ công việc</p>
                                    <Row>
                                        <Col span={12}>
                                            <DescriptionItem title="Email" content="email@gmail.com" />
                                        </Col>
                                        <Col span={12}>
                                            <DescriptionItem title="Số điện thoại" content="0123 456 789" />
                                        </Col>
                                    </Row>

                                </Drawer>
                            </>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <div className="mt-4">
                            <h3 className="mb-5 title">Công việc </h3>
                            <div>
                                <Pie {...config} />
                            </div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="mt-4">
                            <h3 className="mb-5 title">Dự án </h3>
                            <div>
                                <Pie {...config} />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div >
    );
};

export default Dashboard;