import React from "react";
import { Pie, } from "@ant-design/plots";
import { Row, Col, Button, Upload, message } from 'antd';
import { Input, Space, Typography, Form } from 'antd';

import { UploadOutlined } from '@ant-design/icons';
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
const Dashboard = () => {

    // eslint-disable-next-line no-unused-vars
    // const options = [
    //     {
    //         value: 'Member',
    //         label: 'Member',
    //     },
    //     {
    //         value: 'Admin',
    //         label: 'Admin',
    //     },
    //     {
    //         value: 'Manager',
    //         label: 'Manager',
    //     },
    //     {
    //         value: 'Director',
    //         label: 'Director',
    //     },
    // ];
    const onChange = (value) => {
        console.log(value);
    };

    const data = [
        {
            type: 'Hoàn thành đúng hạn',
            value: 27,
        },
        {
            type: 'Hoàn thành trễ hạn',
            value: 25,
        },
        {
            type: 'Chưa hoàn thành',
            value: 18,
        },

    ];
    const config = {
        appendPadding: 10,
        // options,
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


    return (
        <div>
            <div>

            </div>

            <div>
                <Row>
                    <Col span={12}>
                        <div className="banner">
                        </div>
                    </Col>

                    <Col span={12}>
                        <div>
                            <Search
                                placeholder="input search text"
                                onSearch={onSearch}
                                style={{
                                    width: 500,
                                }}
                            />

                            <Upload {...props}>
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </div>
                    </Col>

                </Row>
                <Row>
                    <Col span={12}>
                        <div className="mt-4">
                            <h3 className="mb-5 title">Công Việc</h3>
                            <div>
                                <Pie {...config} />
                            </div>
                        </div>
                    </Col>

                    <Col span={12}>
                        <div>

                        </div>
                    </Col>

                </Row>


            </div>


        </div >
    );
};

export default Dashboard;