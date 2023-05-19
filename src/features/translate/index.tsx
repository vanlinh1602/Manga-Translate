import { InboxOutlined } from '@ant-design/icons';
import { Col, Layout, Row, Space, Upload } from 'antd';
import type { RcFile } from 'antd/lib/upload';
import React from 'react';

import S from './styles.module.less';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const Translate = () => {
  const { Dragger } = Upload;
  return (
    <Layout>
      <Layout.Header>Translate Image</Layout.Header>
      <Layout.Content className={S.container}>
        <Row style={{ height: '1vh' }}>
          <Col span={10}>
            <Space>
              <Dragger
                style={{
                  height: 500,
                }}
                name="file"
                beforeUpload={(file) => {
                  getBase64(file).then((value) => console.log(value));
                }}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from uploading company
                  data or other banned files.
                </p>
              </Dragger>
            </Space>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default Translate;
