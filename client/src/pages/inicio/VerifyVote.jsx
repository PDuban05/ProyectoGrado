import { CheckCircle as CheckCircleIcon, Lock as LockIcon } from '@mui/icons-material';
import { Button, CardContent, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import axios from 'axios';
import Swal from 'sweetalert2';
import Footer from '../../components/Footer/footer';
import NavBar from '../../components/NavBar/NavBar';
import { Container } from '../../components/styledComponets/Containers/Containers';
import ThemeProvider from '../../components/styledComponets/Theme/ThemeProvider';
import { CardHeaderVerify, ResultContainer, StyledCard, TitleContainer } from './StyledComponets/HomeContainer';

export default function VerifyVotos() {
    // State to hold the user's digital signature input
    const [digitalSignature, setDigitalSignature] = useState('');
    // State to store the result of the vote verification
    const [resultado, setResultado] = useState(null);
    // Loading state to handle the submission process
    const [loading, setLoading] = useState(false);
  
    // Function to handle form submission and API request
    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent page reload
      setLoading(true); // Activate loading state when form is submitted
  
      // API call to verify the vote
      axios
        .post("http://localhost:3001/verifyVotes", { digitalSignature }) // Send the digital signature as part of the request
        .then((response) => {
          setLoading(false); // Disable loading state when the response is received
  
          if (response.data.success) {
            // Store the verification results in the state
            setResultado(response.data.result); // Ensure this matches your response structure
            
          } else {
            setResultado(null); // Reset the result if the verification fails
            Swal.fire({
                icon: "error",
                title: response.data.message, // Show error alert with the error message
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            });
          }
        })
        .catch((error) => {
          console.error("Error in the request:", error);
          setLoading(false); // Disable loading state if an error occurs
        });
    };
  
    return (
      <ThemeProvider>
        <NavBar /> {/* Navigation bar at the top */}
        <Container>
          <StyledCard>
            <CardHeaderVerify
              title={
                <TitleContainer>
                  <LockIcon sx={{ fontSize: 32 }} /> {/* Lock icon for styling */}
                  <Typography variant="h5">Verifica tu voto</Typography> {/* Title */}
                </TitleContainer>
              }
            />
            <CardContent>
              <form onSubmit={handleSubmit}>
                {/* Input field for digital signature */}
                <TextField
                  id="firma"
                  label="Digital Signature"
                  variant="outlined"
                  fullWidth
                  value={digitalSignature}
                  onChange={(e) => setDigitalSignature(e.target.value)}
                  sx={{ marginBottom: 2 }}
                  required // Make sure the field is required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    ':hover': { transform: 'scale(1.05)' }, // Add hover effect
                    transition: 'transform 0.2s',
                  }}
                  disabled={loading} // Disable the button while loading
                >
                  {loading ? 'Verificando...' : 'Verificar voto'} {/* Show different text based on loading state */}
                </Button>
              </form>
  
              {/* Show the result if available */}
              {resultado && (
                <ResultContainer>
                  <Typography
                    variant="h6"
                    color="success.main"
                    display="flex"
                    alignItems="center"
                  >
                    <CheckCircleIcon sx={{ marginRight: 1 }} /> {/* Check icon */}
                    Voto verificado {/* Success message */}
                  </Typography>

                  {/* Display user's first and last name */}
                  <Typography variant="body2" color="text.secondary">
                    <strong>Nombre:</strong> {resultado.user.first_name} {resultado.user.last_name}
                  </Typography>

                  {/* Display user's ID number */}
                  <Typography variant="body2" color="text.secondary">
                    <strong>Numero ID:</strong> {resultado.user.national_id_number}
                  </Typography>

                  {/* Display user's email */}
                  <Typography variant="body2" color="text.secondary">
                    <strong>Email:</strong> {resultado.user.email}
                  </Typography>

                  {/* Display the name of the campaign */}
                  <Typography variant="body2" color="text.secondary">
                    <strong>Campaña:</strong> {resultado.campaign.name}
                  </Typography>

                  {/* Box for the vote date */}
                  <Typography variant="body2" color="text.secondary">
                    <strong>fecha de votacion:</strong> {new Date(resultado.vote.voted_at).toLocaleDateString()}
                  </Typography>

                  {/* Box for the vote time */}
                  <Typography variant="body2" color="text.secondary">
                    <strong>Hora del voto:</strong> {new Date(resultado.vote.voted_at).toLocaleTimeString()}
                  </Typography>
                </ResultContainer>
              )}
            </CardContent>
          </StyledCard>
        </Container>
        <Footer /> {/* Footer at the bottom */}
      </ThemeProvider>
    );
}
