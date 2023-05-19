import { Button, Col, Layout, Row } from 'antd';

import S from './styles.module.less';

type Props = {
  detectBubble: () => void;
  handleRemove: () => void;
};

const UploadOptions = ({ detectBubble, handleRemove }: Props) => (
  <Layout className={S.container}>
    <Row gutter={10}>
      <Col>
        <Button type="primary" onClick={detectBubble}>
          Detect Bubble
        </Button>
      </Col>
      <Col>
        <Button type="primary" danger onClick={handleRemove}>
          Remove/Change Image
        </Button>
      </Col>
    </Row>
  </Layout>
);

export default UploadOptions;
