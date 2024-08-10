import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styled from '@emotion/styled';

const Button = styled.button`
  padding: 15px 30px;
  font-size: 18px;
  margin: 20px 0;
  cursor: pointer;
  border-radius: 5px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove o token JWT dos cookies
    Cookies.remove('jwt_token');
    
    // Redireciona o usuário para a página de login
    navigate('/scanner-app/login');
  };

  return <Button onClick={handleLogout}>Sair</Button>;
};

export default LogoutButton;
