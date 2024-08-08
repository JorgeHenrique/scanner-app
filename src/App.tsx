import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import StampForm from './components/StampForm';
import ResultPage from './components/ResultPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/scanner-app/" element={<Home />} />
        <Route path="/scanner-app/stamp-form" element={<StampForm />} />
        <Route path="/scanner-app/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
};

export default App;
