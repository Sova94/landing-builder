import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from '@pages/LandingPage';
import { HubPage } from '@pages/HubPage';
import { EditorPage } from '@pages/EditorPage';
import { PreviewPage } from '@pages/PreviewPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/hub" element={<HubPage />} />
        <Route path="/editor/:projectId" element={<EditorPage />} />
        <Route path="/preview/:projectId" element={<PreviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
