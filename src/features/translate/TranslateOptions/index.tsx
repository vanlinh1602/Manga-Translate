import { Button, Col, Form, Input, Layout, Row, Switch } from 'antd';
import { useEffect } from 'react';
import { backendService } from 'services';

import type { ImageDeteted } from '../types';

type Props = {
  handleRemove: () => void;
  dataDetect: ImageDeteted;
  onSucces: (img: string) => void;
};

type CustomForm = CustomObject<{
  isTrans: boolean;
  text: string;
  textTrans: string;
}>;

const TranslateOptions = ({ handleRemove, dataDetect, onSucces }: Props) => {
  const [form] = Form.useForm<CustomForm>();
  useEffect(() => {
    const originForm: CustomForm = {};
    Object.entries(dataDetect.groupText ?? {}).forEach(([key, group]) => {
      originForm[key] = {
        isTrans: true,
        text: group.text,
        textTrans: 'Tiếng việt nè',
      };
    });
    form.setFieldsValue(originForm);
  }, [form, dataDetect]);

  const handleTranslate = () => {
    const dataForm = form.getFieldsValue();
    const dataTrans: { textTrans: string; location: number[][] }[] = [];

    Object.entries(dataForm ?? {}).forEach(([key, data]) => {
      if (data.isTrans) {
        dataTrans.push({
          textTrans: dataForm[key].textTrans,
          location: dataDetect.groupText[key].locate,
        });
      }
    });

    const dataPost = {
      image: dataDetect.originImage,
      dataTrans,
    };

    backendService.post<{ image: string }>('/translateText', dataPost).then((result) => {
      if (result.kind === 'ok') {
        onSucces(result.data.image);
      }
    });
  };
  const handleRemoveText = () => {
    const dataForm = form.getFieldsValue();
    const dataLocation: CustomObject<number[][]> = {};
    Object.entries(dataForm).forEach(([key, group]) => {
      if (group.isTrans) {
        dataLocation[key] = dataDetect.groupText[key].locate;
      }
    });

    const dataPost = {
      image: dataDetect.originImage,
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
        {Object.entries(dataDetect.groupText ?? {}).map(([key], index) => (
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
