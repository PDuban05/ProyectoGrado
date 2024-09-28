import React, { forwardRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import VerificationModal from '../Verificate/ModalVerifity';

// Estilos personalizados para el modal y los elementos del contenido
const StyledModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 450px;
  height: 200px;
  padding: 20px;
  transform: translate(-50%, -50%);
  background-color: rgb(255, 254, 254);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  border: 1px solid #ffffff;
`;

const StyledButton = styled(Button)`
  && {
    margin: 0 5px;
    padding: 8px 16px;
    background-color: rgba(255, 255, 255, 0.5);
    color: #011224;
    border: 1px solid #b3b4b6;
    &:hover {
      background-color: rgba(255, 255, 255, 0.7);
      color: #041d36;
    }
  }
`;

const ConfirmButton = styled(Button)`
  && {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    font-size: 14px;
    font-weight: 700;
    text-transform: none;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export const RegisterButton = styled(Button)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    background-color: rgba(255, 255, 255, 0.5);
    color: rgb(161, 158, 158); 
    font-weight: 700;
    border: 1px solid #b3b4b6;
    font-size: 14px;
    text-transform: none;
    &:hover {
      background-color: rgba(255, 255, 255, 0.7);
      color: #041d36;
    }
  }
`;

export const StyledBox = styled(Box)`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;

export const StyledContainer = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 35px;
  }
`;

export const StyledTypography = styled(Typography)`
  && {
    font-size: 13.5px;
    font-weight: 600;
    margin: 5px 0 0 0;
    color: rgb(161, 158, 158);
  }
`;

export const StyledTypographyTittle = styled(Typography)`
  && {
    font-weight: 600;
    color: rgba(10, 9, 9, 0.849);
  }
`;

const VotingModal = forwardRef(({ isLogin, isAuth, candidate, onConfirm, onClose }, ref) => {
  const navigate = useNavigate();

  

  return (
    <StyledModalContent ref={ref}>
      {isLogin ? (
        isAuth ? (
          // Usuario logueado y autenticado
          <>
            <Typography variant="h6" id="voting-modal-title" color="textPrimary">
              Confirmar voto
            </Typography>
            <Typography id="voting-modal-description" color="textSecondary">
              ¿Estás seguro de que quieres votar por {candidate?.first_name + " " + candidate?.last_name}?
            </Typography>
            <Box display="flex" justifyContent="flex-end" marginTop="20px">
              <StyledButton onClick={onClose}>Cancelar</StyledButton>
              <ConfirmButton onClick={onConfirm}>Confirmar voto</ConfirmButton>
            </Box>
          </>
        ) : (
          <>
            <VerificationModal/>
          </>
        )
      ) : (
        // Usuario no logueado
        <StyledContainer>
          <Box>
            <StyledTypographyTittle variant="h5" id="voting-modal-title" color="textPrimary">
              Acceso requerido
            </StyledTypographyTittle>
            <StyledTypography id="voting-modal-description">
              Para votar, necesitas una cuenta. Por favor, inicia sesión o regístrate.
            </StyledTypography>
          </Box>

          <StyledBox>
            <RegisterButton onClick={() => navigate('/register')}>Registrarse</RegisterButton>
            <ConfirmButton onClick={() => navigate('/login')}>Iniciar sesión</ConfirmButton>
          </StyledBox>
        </StyledContainer>
      )}
    </StyledModalContent>
  );
});

// Add display name for debugging
VotingModal.displayName = 'VotingModal';

export default VotingModal;
