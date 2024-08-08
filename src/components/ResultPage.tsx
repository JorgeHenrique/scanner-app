// src/components/ResultPage.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 18px;
  margin: 20px 0;
  cursor: pointer;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  border: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { success } = (location.state as { success: boolean }) || {};

  return (
    <Container>
      <h1>{success ? 'Success' : 'Failure'}</h1>
      <p>{success ? 'Data sent successfully!' : 'Failed to send data.'}</p>
      <Button onClick={() => navigate('/scanner-app/')}>Go Back</Button>
    </Container>
  );
};

export default ResultPage;
