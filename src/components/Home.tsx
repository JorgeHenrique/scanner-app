// src/components/Home.tsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scanner, IDetectedBarcode } from '@yudiel/react-qr-scanner';
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

const ScannerContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 100%;
  max-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #333;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
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
  background-color: #007bff;
  color: #fff;
  border: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const QRData = styled.p`
  margin-top: 20px;
  font-size: 18px;
  color: #333;
  word-break: break-word;
`;

const Home: React.FC = () => {
  const [scanning, setScanning] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [qrData, setQrData] = useState<string | null>(null);
  const apiCalled = useRef<boolean>(false);
  const navigate = useNavigate();

  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes.length > 0 && !apiCalled.current) {
      apiCalled.current = true;
      setScanning(false);
      setLoading(true);
      const result = detectedCodes[0].rawValue; // Usa o primeiro código detectado
      setQrData(result);
      sendQRCodeData(result);
    }
  };

  const handleError = (error: any) => {
    console.error(error);
  };

  const sendQRCodeData = async (data: string) => {
    try {
      await axios.post('https://your-api-url.com/endpoint', { qrData: data });
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
      <Title>Escaneie o QR Code da Nota Fiscal</Title>
      {loading ? (
        <Loader />
      ) : scanning ? (
        <ScannerContainer>
          <QRWrapper>
            <QRReader
              onScan={handleScan}
              constraints={{ facingMode: 'environment' }}
            />
          </QRWrapper>
        </ScannerContainer>
      ) : (
        <Button onClick={() => setScanning(true)}>Escanear Nota Fiscal </Button>
      )}
      {qrData && <QRData>QR Data: {qrData}</QRData>}
    </Container>
  );
};

export default Home;
