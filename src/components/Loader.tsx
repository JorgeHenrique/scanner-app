import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundLight}; 
`;

const LoaderSpinner = styled.div`
  border: 16px solid ${({ theme }) => theme.colors.backgroundLight}; 
  border-radius: 50%;
  border-top: 16px solid ${({ theme }) => theme.colors.primary}; 
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
`;

const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.textDark}; 
  font-size: 1.5em;
  margin-top: 20px;
`;

const Loader: React.FC = () => {
  return (
    <LoaderContainer>
      <LoaderSpinner />
      <LoadingText>Loading...</LoadingText>
    </LoaderContainer>
  );
};

export default Loader;
