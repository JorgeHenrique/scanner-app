import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import StampForm from './components/StampForm';
import ResultPage from './components/ResultPage';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from '@emotion/react';

const App: React.FC = () => {
  const theme = {
    colors: {
      primary: '#FF2D54',
      backgroundLight: '#FFFAFC',
      //backgroundDark: '#252429',
      backgroundDark: '#201f25',
      textLight: '#FFFAFC',
      textDark: '#252429',
    },
  };

  return (  
  <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/scanner-app/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/scanner-app/stamp-form" element={<ProtectedRoute><StampForm /></ProtectedRoute>} />
        <Route path="/scanner-app/result" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
        <Route path="/scanner-app/login" element={<Login />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
};

export default App;
