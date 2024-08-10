import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styled from '@emotion/styled';

const TextButton = styled.p`
  font-size: 18px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary}; 
  margin: 0;
  &:hover {
    color: ${({ theme }) => theme.colors.textDark}; 
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

  return <TextButton onClick={handleLogout}>Sair</TextButton>;
};

export default LogoutButton;
