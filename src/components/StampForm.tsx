import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
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
  font-size: 2em;
  color: ${({ theme }) => theme.colors.textDark}; 
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 18px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.textDark}; 
  background-color: ${({ theme }) => theme.colors.backgroundLight}; 
  color: ${({ theme }) => theme.colors.textDark}; 
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

const StampForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { code } = (location.state as { code: string }) || {};
  const [number, setNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdG9yZUlkIjoiNGEyMjdlYjQtYTk4Mi00YTMwLWFmMDEtOGRiNDU3MzZkYmI0IiwiZW1haWwiOiJzdGFyYnVja3NAZW1haWwuY29tIiwiaWF0IjoxNzIzMjIzNjIzLCJleHAiOjE3NTQ3NTk2MjN9.UTjk7QBucUyfP34qzGxBj5cexfpDubKFZZW1YPBQmBY"

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(
        'http://localhost:3000/delivery/',
        { code, number },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      navigate('/scanner-app/result', { state: { success: true } });
    } catch (error) {
      console.error(error);
      setLoading(false);
      navigate('/scanner-app/result', { state: { success: false } });
    }
  };

  return (
    <Container>
      <Title>Quantos Carimbos?</Title>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Input
            type="number"
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
            min={1}
          />
          <Button onClick={handleSubmit}>Enviar</Button>
        </>
      )}
    </Container>
  );
};

export default StampForm;
