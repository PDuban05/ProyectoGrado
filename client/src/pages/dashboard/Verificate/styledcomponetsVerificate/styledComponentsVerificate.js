import { Box, Button, Modal, Typography } from "@mui/material";
import styled from "styled-components";

// Estilos personalizados para el modal y los elementos del contenido
export const StyledModal = styled(Modal)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    
  }
`;

export const ModalBox = styled(Box)`
  && {
    position: relative;
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    padding: 24px;

    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    outline: none;
  }
`;

export const ModalTitle = styled(Typography)`
  && {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
`;

export const ModalDescription = styled(Typography)`
  && {
    color: #555;
    margin-top: 16px;
    margin-bottom: 16px;
  }
`;

export const ActionButton = styled(Button)`
  && {
    margin-top: 16px;
    &:first-child {
      margin-right: 8px;
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 24px;
`;

// Spinner de carga centrado
export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;