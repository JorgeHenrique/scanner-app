import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundLight}; 
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.textDark}; 
`;

const Message = styled.p`
  color: ${({ theme }) => theme.colors.textDark}; 
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 18px;
  margin: 20px 0;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.primary}; 
  color: ${({ theme }) => theme.colors.textLight}; 
  border: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.textDark}; 
  }
`;

const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { success } = (location.state as { success: boolean }) || {};

  return (
    <Container>
      <Title>{success ? 'Sucesso!' : 'Falha no envio'}</Title>
      <Message>{success ? 'Nota Fiscal passível de carimbo!' : 'Falha ao adicionar carimbo a Nota Fiscal. Por favor tente novamente.'}</Message>
      <Button onClick={() => navigate('/scanner-app/')}>Voltar ao Início</Button>
    </Container>
  );
};

export default ResultPage;
