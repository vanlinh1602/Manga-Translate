import { Col, Image, Layout, notification, Row } from 'antd';
import Waiting from 'components/Waiting';
import React, { useState } from 'react';
import { backendService } from 'services';

import PickImage from './PickImage';
import S from './styles.module.less';
import TranslateOptions from './TranslateOptions';
import type { ImageDeteted } from './types';
import UploadOptions from './UploadOptions';

const Translate = () => {
  const [img, setImg] = useState<string>();
  const [waiting, setWaiting] = useState<boolean>(false);
  const [dataDetect, setDataDetect] = useState<ImageDeteted>();

  const detectBubble = () => {
    if (img) {
      setWaiting(true);
      const base64Img = img?.toString().split(',')[1];
      backendService.post<ImageDeteted>('/detectBubble', { image: base64Img }).then((result) => {
        setWaiting(false);
        if (result.kind === 'ok') {
          setDataDetect(result.data);
          setImg(`data:image/jpeg;base64,${result.data.imageDetected}`);
        }
      });
    } else {
      notification.warn({ message: 'Image not found', description: 'Please select image' });
    }
  };
  return (
    <Layout className={S.container}>
      {waiting ? <Waiting /> : null}
      <Layout.Header>Translate Image</Layout.Header>
      <Layout.Content className={S.content}>
        <Row gutter={[16, 8]} style={{ minHeight: window.innerHeight - 200 }}>
          <Col span={10}>
            {img ? (
              <Image style={{ maxHeight: window.innerHeight - 200 }} src={img} />
            ) : (
              <PickImage onSelect={(value) => setImg(value)} />
            )}
          </Col>
          <Col span={14}>
            {dataDetect ? (
              <TranslateOptions
                onSucces={(value) => setImg(`data:image/jpeg;base64,${value}`)}
                dataDetect={dataDetect}
                handleRemove={() => {
                  setImg(undefined);
                  setDataDetect(undefined);
                }}
              />
            ) : (
              <UploadOptions detectBubble={detectBubble} handleRemove={() => setImg(undefined)} />
            )}
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default Translate;
