import { Layout } from 'antd';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('pages/Home'));
function App() {
  return (
    <BrowserRouter>
      <Suspense>
        <Layout>
          <Layout.Content>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Layout.Content>
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
