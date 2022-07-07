import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Console from './pages/Console';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/console" element={<Console />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
