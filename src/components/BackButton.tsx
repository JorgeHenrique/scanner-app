import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const BackButtonContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #6c757d;
  color: #fff;
  border: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5a6268;
  }
`;

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <BackButtonContainer>
      <Button onClick={() => navigate(-1)}>Voltar</Button>
    </BackButtonContainer>
  );
};

export default BackButton;
