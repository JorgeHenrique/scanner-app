// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ResultPage from './components/ResultPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/scanner-app/" element={<Home />} />
        <Route path="/scanner-app/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
};

export default App;
