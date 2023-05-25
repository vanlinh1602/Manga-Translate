import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { useDispatch } from 'react-redux';
import { getBase64 } from 'utils/image';

import { useTranslateSlice } from '../store';

const PickImage = () => {
  const { Dragger } = Upload;
  const dispatch = useDispatch();
  const { actions } = useTranslateSlice();
  return (
    <Dragger
      height={window.innerHeight - 200}
      name="file"
      beforeUpload={(file) => {
        getBase64(file).then((value) => dispatch(actions.updateOriginImage(value)));
      }}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading company data or
        other banned files.
      </p>
    </Dragger>
  );
};

export default PickImage;
