import { Button, Col, Form, Input, Layout, Row, Switch } from 'antd';
import { useEffect } from 'react';
import { backendService } from 'services';

import type { GroupText, ImageDeteted } from '../types';

type Props = {
  handleRemove: () => void;
  data: ImageDeteted;
  onSucces: (img: string) => void;
};

const TranslateOptions = ({ handleRemove, data, onSucces }: Props) => {
  const [form] = Form.useForm<CustomObject<GroupText>>();
  useEffect(() => {
    form.setFieldsValue(data.groupText);
  }, [form, data]);

  const handleTranslate = () => {};
  const handleRemoveText = () => {
    const dataLocation: CustomObject<number[][]> = {};
    Object.entries(data.groupText).forEach(([key, group]) => {
      dataLocation[key] = group.locate;
    });

    const dataPost = {
      image: data.originImage,
      location: dataLocation,
    };

    backendService.post<{ image: string }>('/removeText', dataPost).then((result) => {
      if (result.kind === 'ok') {
        onSucces(result.data.image);
      }
    });
  };

  return (
    <Layout style={{ background: 'white' }}>
      <Form form={form} layout="vertical">
        {Object.entries(data.groupText ?? {}).map(([key], index) => (
          <Row gutter={10} align="middle" key={key}>
            <Col span={2}>
              <Form.Item label="Select" name={[key, 'isTrans']} valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item label={`Group ${index + 1}`} name={[key, 'text']}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item label="Translate" name={[key, 'textTrans']}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
        ))}
      </Form>
      <Row gutter={[10, 10]} style={{ justifyContent: 'center' }}>
        <Col>
          <Button danger type="primary" onClick={handleRemoveText}>
            Remove Text In Comic
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={handleTranslate}>
            Translate Comic
          </Button>
        </Col>
      </Row>
      <Row style={{ justifyContent: 'center', marginTop: 10 }}>
        <Col>
          <Button type="primary" onClick={handleRemove}>
            Remove/Change Image
          </Button>
        </Col>
      </Row>
    </Layout>
  );
};

export default TranslateOptions;
