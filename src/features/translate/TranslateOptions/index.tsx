import { Button, Col, Form, Input, Layout, Row, Switch } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslateSlice } from '../store';
import { selectDataDetect, selectShowOriginText } from '../store/selectors';
import type { DataTranslate } from '../types';

type CustomForm = CustomObject<{
  isTrans: boolean;
  text: string;
  textTrans: string;
}>;

const TranslateOptions = () => {
  const [form] = Form.useForm<CustomForm>();
  const dispatch = useDispatch();
  const { actions } = useTranslateSlice();
  const dataDetect = useSelector(selectDataDetect);
  const showOriginText = useSelector(selectShowOriginText);

  useEffect(() => {
    const originForm: CustomForm = {};
    Object.entries(dataDetect?.groupText ?? {}).forEach(([key, group]) => {
      originForm[key] = {
        isTrans: true,
        text: group.text,
        textTrans: group.textTrans,
      };
    });
    form.setFieldsValue(originForm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  const handleTranslate = () => {
    const dataForm = form.getFieldsValue();
    const dataTrans: CustomObject<DataTranslate> = {};

    Object.entries(dataForm ?? {}).forEach(([key, data]) => {
      if (data.isTrans) {
        dataTrans[key] = {
          text: dataForm[key].textTrans,
          location: dataDetect?.groupText?.[key].locate!,
        };
      }
    });
    dispatch(actions.translateText(dataTrans));
  };
  const handleRemoveText = () => {
    const dataForm = form.getFieldsValue();
    const dataLocation: CustomObject<number[][]> = {};
    Object.entries(dataForm).forEach(([key, group]) => {
      if (group.isTrans) {
        dataLocation[key] = dataDetect?.groupText?.[key].locate!;
      }
    });
    dispatch(actions.removeText(dataLocation));
  };

  return (
    <Layout style={{ background: 'white' }}>
      <Form form={form} layout="vertical">
        {Object.entries(dataDetect?.groupText ?? {})
          .sort(([a], [b]) => Number(a.split('p')[1]) - Number(b.split('p')[1]))
          .map(([key]) => (
            <Row gutter={10} align="middle" key={key}>
              {showOriginText ? (
                <Col span={11}>
                  <Form.Item label={key.split('p')[1]} name={[key, 'text']}>
                    <Input />
                  </Form.Item>
                </Col>
              ) : null}
              <Col span={showOriginText ? 11 : 22}>
                <Form.Item label={showOriginText ? 'Bản dịch' : key} name={[key, 'textTrans']}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item label="Chọn" name={[key, 'isTrans']} valuePropName="checked">
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
          ))}
      </Form>
      <Row gutter={[10, 10]} style={{ justifyContent: 'center' }}>
        <Col>
          <Button type="primary" onClick={handleTranslate}>
            Translate Comic
          </Button>
        </Col>
        <Col>
          <Button danger type="primary" onClick={handleRemoveText}>
            Remove Text In Comic
          </Button>
        </Col>
      </Row>
    </Layout>
  );
};

export default TranslateOptions;
