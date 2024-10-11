import React, { forwardRef } from 'react'; // Importing React and forwardRef for forwarding refs
import { Box, Typography, Button } from '@mui/material'; // Importing Material UI components
import { styled } from '@mui/system'; // Importing styled for custom styling
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation
import VerificationModal from '../Verificate/ModalVerifity'; // Importing VerificationModal component
import { 
  ConfirmButton, // Styled button for confirmation
  RegisterButton, // Styled button for registration
  StyledBox, // Styled component for box layout
  StyledButtonVoting, // Styled button for voting action
  StyledContainer, // Styled container for the modal
  StyledModalContent, // Styled content for the modal
  StyledTypography, // Styled typography component
  StyledTypographyTittle // Styled typography for titles
} from './StyledComponets/StyledVoting'; // Importing styled components from StyledVoting

// VotingModal component that handles voting confirmation and user authentication state
const VotingModal = forwardRef(({ isLogin, isAuth, candidate, onConfirm, onClose }, ref) => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <StyledModalContent ref={ref}> {/* Main modal content */}
      {isLogin ? ( // Check if the user is logged in
        isAuth ? ( // Check if the user is authenticated
          // User is logged in and authenticated
          <>
            <Typography variant="h6" id="voting-modal-title" color="textPrimary">
              Confirmar voto {/* Voting confirmation title */}
            </Typography>
            <Typography id="voting-modal-description" color="textSecondary">
              ¿Estás seguro de que quieres votar por {candidate?.first_name + " " + candidate?.last_name}? {/* Confirmation message with candidate's name */}
            </Typography>
            <Box display="flex" justifyContent="flex-end" marginTop="20px"> {/* Flexbox for button layout */}
              <StyledButtonVoting onClick={onClose}>Cancelar</StyledButtonVoting> {/* Cancel button */}
              <ConfirmButton onClick={onConfirm}>Confirmar voto</ConfirmButton> {/* Confirm vote button */}
            </Box>
          </>
        ) : (
          // User is logged in but not authenticated
          <>
            <VerificationModal/> {/* Show verification modal for user authentication */}
          </>
        )
      ) : (
        // User is not logged in
        <StyledContainer>
          <Box>
            <StyledTypographyTittle variant="h5" id="voting-modal-title" color="textPrimary">
              Acceso requerido {/* Access required title */}
            </StyledTypographyTittle>
            <StyledTypography id="voting-modal-description">
              Para votar, necesitas una cuenta. Por favor, inicia sesión o regístrate. {/* Message prompting for login or registration */}
            </StyledTypography>
          </Box>

          <StyledBox>
            <RegisterButton onClick={() => navigate('/register')}>Registrarse</RegisterButton> {/* Registration button */}
            <ConfirmButton onClick={() => navigate('/login')}>Iniciar sesión</ConfirmButton> {/* Login button */}
          </StyledBox>
        </StyledContainer>
      )}
    </StyledModalContent>
  );
});

// Add display name for debugging purposes
VotingModal.displayName = 'VotingModal';

export default VotingModal; // Exporting the VotingModal component
