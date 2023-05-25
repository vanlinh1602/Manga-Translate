import { Button, Checkbox, Col, Form, Layout, Row, Select, Typography } from 'antd';
import { range } from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslateSlice } from '../store';
import { selectTranslateData } from '../store/selectors';
import S from './styles.module.less';

type CustomForm = {
  fontSize: number;
  showOriginText: boolean;
  maxWidth: number;
};

const Header = () => {
  const translateData = useSelector(selectTranslateData);
  const dispatch = useDispatch();
  const { actions } = useTranslateSlice();
  const [form] = Form.useForm<CustomForm>();

  useEffect(() => {
    form.setFieldsValue({
      fontSize: translateData.fontSize,
      showOriginText: translateData.showOriginText,
      maxWidth: translateData.maxWidth,
    });
  }, [form, translateData]);

  const handleRemoveImage = () => {
    dispatch(actions.updateOriginImage(undefined));
    dispatch(actions.updateDataDetect(undefined));
  };

  return (
    <Layout.Header className={S.header} style={{ display: 'inline-table' }}>
      <Typography.Title level={5}>Translate Manga</Typography.Title>
      <Row gutter={[12, 12]}>
        {!translateData.dataDetect ? (
          <>
            <Col>
              <Button type="primary" onClick={() => dispatch(actions.detectBubble())}>
                Detect Bubble
              </Button>
            </Col>
            <Col>
              <Button type="primary" danger onClick={handleRemoveImage}>
                Remove/Change Image
              </Button>
            </Col>
          </>
        ) : (
          <Form
            form={form}
            layout="vertical"
            style={{ width: '100%' }}
            onValuesChange={(value) => {
              const { fontSize, maxWidth, showOriginText } = value;
              if (fontSize) {
                dispatch(actions.changeFontSize(fontSize));
              } else if (maxWidth) {
                dispatch(actions.changeMaxWidth(maxWidth));
              } else {
                dispatch(actions.changeShowOriginText(showOriginText));
              }
            }}
          >
            <Row gutter={[12, 12]} style={{ alignItems: 'center' }}>
              <Col span={3}>
                <Form.Item label="Số chữ trên 1 dòng" name="maxWidth">
                  <Select
                    options={range(10, 30, 1).map((value) => ({
                      value,
                      label: value,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item label="Cỡ chữ" name="fontSize">
                  <Select
                    options={range(10, 50, 1).map((value) => ({
                      value,
                      label: value,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col span={6} style={{ alignItems: 'center', margin: 0 }}>
                <Form.Item
                  name="showOriginText"
                  valuePropName="checked"
                  style={{ marginBottom: 0 }}
                >
                  <Checkbox>Hiển thị văn bản gốc</Checkbox>
                </Form.Item>
              </Col>
              <Col>
                <Button danger type="primary" onClick={handleRemoveImage}>
                  Remove/Change Image
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Row>
    </Layout.Header>
  );
};

export default Header;
