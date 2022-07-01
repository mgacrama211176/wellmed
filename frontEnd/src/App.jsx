import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddItems from './pages/AddItems';
import Home from './pages/Home';
import Console from './pages/Console';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<AddItems />} />
          <Route path="/console" element={<Console />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
