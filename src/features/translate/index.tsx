import { Button, Image, Layout } from 'antd';
import React, { useState } from 'react';
import { backendService } from 'services';

const Translate = () => {
  const [img, setImg] = useState<string>();
  return (
    <Layout>
      <Layout.Header>Translate Image</Layout.Header>
      <Layout.Content>
        Manga Translate
        <Image width={500} src={img} />
        <Button
          onClick={async () => {
            const image = await backendService.post<{ name: string; src: string }>('/get-image', {
              name: 'Linh',
            });
            if (image.kind === 'ok') {
              setImg(image.data.src as string);
            }
          }}
        >
          Get Image
        </Button>
      </Layout.Content>
    </Layout>
  );
};

export default Translate;
