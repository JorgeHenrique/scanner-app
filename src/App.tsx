import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import StampForm from './components/StampForm';
import ResultPage from './components/ResultPage';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/scanner-app/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/scanner-app/stamp-form" element={<ProtectedRoute><StampForm /></ProtectedRoute>} />
        <Route path="/scanner-app/result" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
        <Route path="/scanner-app/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
