import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scanner, IDetectedBarcode } from '@yudiel/react-qr-scanner';
import styled from '@emotion/styled';
import LogoutButton from './Logout'; // Importa o botão de logout

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
  position: relative;
`;

const Title = styled.h1`
  font-size: 2em;
  color: ${({ theme }) => theme.colors.textDark}; 
  margin-bottom: 20px;
`;

const ScannerContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 100%;
  max-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.colors.textDark}; 
  border-radius: 10px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.backgroundLight}; 
`;

const QRWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const QRReader = styled(Scanner)`
  width: 100%;
  height: 100%;
  object-fit: cover;
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

const QRData = styled.p`
  margin-top: 20px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.textDark}; 
  word-break: break-word;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
`;

const Home: React.FC = () => {
  const [scanning, setScanning] = useState<boolean>(false);
  const [code, setCode] = useState<string | null>(null);
  const apiCalled = useRef<boolean>(false);
  const navigate = useNavigate();

  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes.length > 0 && !apiCalled.current) {
      apiCalled.current = true;
      setScanning(false);
      const result = detectedCodes[0].rawValue;
      setCode(result);
      navigate('/scanner-app/stamp-form', { state: { code: result } });
    }
  };

  const handleError = (error: any) => {
    console.error(error);
  };

  return (
    <Container>
      <Title>Hipoupe Delivery Scanner</Title>
      {scanning ? (
        <>
          <ScannerContainer>
            <QRWrapper>
              <QRReader
                onScan={handleScan}
                constraints={{ facingMode: 'environment' }}
              />
            </QRWrapper>
          </ScannerContainer>
        </>
      ) : (
        <>
          <Button onClick={() => setScanning(true)}>Escanear Nota Fiscal</Button>
          <Footer>
            <LogoutButton /> {/* Exibe o botão de logout como texto */}
          </Footer>
        </>
      )}
      {code && <QRData>QR Data: {code}</QRData>}
    </Container>
  );
};

export default Home;
