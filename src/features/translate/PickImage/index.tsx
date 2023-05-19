import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { getBase64 } from 'utils/image';

type Props = {
  onSelect: (value: string) => void;
};

const PickImage = ({ onSelect }: Props) => {
  const { Dragger } = Upload;

  return (
    <Dragger
      height={window.innerHeight - 200}
      name="file"
      beforeUpload={(file) => {
        getBase64(file).then((value) => onSelect(value));
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
