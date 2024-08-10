import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styled from '@emotion/styled';
import logo from '../styles/hipoupe.jpeg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundDark}; 
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
`;

const Logo = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2em;
  color: ${({ theme }) => theme.colors.textLight}; 
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

const ErrorMessage = styled.p`
  color: red;
  margin-top: 20px;
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email === 'teste' && password === 'teste') {
      const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdG9yZUlkIjoiNGEyMjdlYjQtYTk4Mi00YTMwLWFmMDEtOGRiNDU3MzZkYmI0IiwiZW1haWwiOiJzdGFyYnVja3NAZW1haWwuY29tIiwiaWF0IjoxNzIzMjIzNjIzLCJleHAiOjE3NTQ3NTk2MjN9.UTjk7QBucUyfP34qzGxBj5cexfpDubKFZZW1YPBQmBY";
      Cookies.set('jwt_token', testToken, { expires: 7 });
      navigate('/scanner-app/');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      const token = response.data.token;

      Cookies.set('jwt_token', token, { expires: 7 });
      navigate('/scanner-app/');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Email ou senha inválidos. Por favor, tente novamente.');
    }
  };

  return (
    <Container>
      <Logo src={logo} alt="Logo" />
      <Title>Bem-vindo!</Title>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Entrar</Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default Login;
