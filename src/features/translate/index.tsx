import { Col, Image, Layout, Row } from 'antd';
import Waiting from 'components/Waiting';
import React from 'react';
import { useSelector } from 'react-redux';
import { getUrlImageBase64 } from 'utils/image';

import Header from './Header';
import PickImage from './PickImage';
import { selectDataDetect, selectOriginImage, selectWating } from './store/selectors';
import S from './styles.module.less';
import TranslateOptions from './TranslateOptions';

const Translate = () => {
  const img = useSelector(selectOriginImage);
  const waiting = useSelector(selectWating);
  const dataDetect = useSelector(selectDataDetect);
  return (
    <Layout className={S.container}>
      {waiting ? <Waiting /> : null}
      <Header />
      <Layout.Content className={S.content}>
        <Row gutter={[16, 8]} style={{ minHeight: window.innerHeight - 200 }}>
          <Col span={img ? 10 : 24}>
            {img ? (
              <Image
                style={{ maxHeight: window.innerHeight - 200 }}
                src={
                  dataDetect?.imageDetected
                    ? getUrlImageBase64(dataDetect.imageDetected)
                    : getUrlImageBase64(img)
                }
              />
            ) : (
              <PickImage />
            )}
          </Col>
          <Col span={14}>{dataDetect ? <TranslateOptions /> : null}</Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default Translate;
