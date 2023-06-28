import { Button, Checkbox, Col, Form, Layout, Row, Select, Typography } from 'antd';
import { FONTS } from 'lib/options';
import _, { range } from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslateSlice } from '../store';
import { selectTranslateData } from '../store/selectors';
import S from './styles.module.less';

type CustomForm = {
  fontSize: number;
  showOriginText: boolean;
  maxWidth: number;
  useCurrentImage: boolean;
  font: string;
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
      useCurrentImage: translateData.useCurrentImage,
      font: translateData.font,
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
              const { fontSize, maxWidth, showOriginText, useCurrentImage, font } = value;
              if (fontSize) {
                dispatch(actions.changeFontSize(fontSize));
              } else if (maxWidth) {
                dispatch(actions.changeMaxWidth(maxWidth));
              } else if (!_.isNil(showOriginText)) {
                dispatch(actions.changeShowOriginText(showOriginText));
              } else if (!_.isNil(useCurrentImage)) {
                dispatch(actions.changeUseCurrentImage(useCurrentImage));
              } else if (font) {
                dispatch(actions.changeFont(font));
              }
            }}
          >
            <Row gutter={[12, 12]} style={{ alignItems: 'center' }}>
              <Col span={3}>
                <Form.Item label="Font" name="font">
                  <Select
                    options={FONTS.map((value) => ({
                      value,
                      label: <Typography style={{ fontFamily: value }}>{value}</Typography>,
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
              <Col span={6} style={{ alignItems: 'center', margin: 0 }}>
                <Form.Item
                  name="showOriginText"
                  valuePropName="checked"
                  style={{ marginBottom: 0 }}
                >
                  <Checkbox>Hiển thị văn bản gốc</Checkbox>
                </Form.Item>
                <Form.Item
                  name="useCurrentImage"
                  valuePropName="checked"
                  style={{ marginBottom: 0 }}
                >
                  <Checkbox>Sử dụng hình hiện tại để dịch</Checkbox>
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
