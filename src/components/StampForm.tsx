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
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2em;
  color: #333;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 18px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
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

const StampForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { qrData } = (location.state as { qrData: string }) || {};
  const [stamps, setStamps] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post('https://your-api-url.com/endpoint', { qrData, stamps });
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
            value={stamps}
            onChange={(e) => setStamps(Number(e.target.value))}
            min={1}
          />
          <Button onClick={handleSubmit}>Enviar</Button>
        </>
      )}
    </Container>
  );
};

export default StampForm;
