import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ClassPage from './pages/ClassPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/class1" replace />} />
          <Route path="/:classId" element={<ClassPage />} />
          <Route path="*" element={<Navigate to="/class1" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
