import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Workbench from './pages/Workbench';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/level/:id" element={<Workbench />} />
      </Routes>
    </Router>
  );
}

export default App;