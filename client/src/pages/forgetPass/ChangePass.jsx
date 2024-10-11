import { TextField } from "@mui/material"; // Importing Material UI TextField for user input
import { useEffect, useState } from "react"; // Importing hooks for managing state and side effects
import { useDispatch, useSelector } from "react-redux"; // Importing hooks to interact with Redux store
import NavBar from "../../components/NavBar/NavBar"; // Custom NavBar component
import { StyledButton } from "../../components/styledComponets/Bottons/botton"; // Styled button component
import { Container, StyledBox, StyledForm } from "../../components/styledComponets/Containers/Containers"; // Styled container components
import { Text2, Text4 } from "../../components/styledComponets/Text/Text"; // Styled text components for consistent typography
import ThemeProvider from "../../components/styledComponets/Theme/ThemeProvider"; // ThemeProvider for consistent theming throughout the component
import { sendVerificationEmail } from "../../redux/states/RecoverPass"; // Action creator for sending verification email
import { StyledDivForm, StyledFooterForm } from "../Register/StyledComponets/containerForm"; // Styled form container components
import { useNavigate } from "react-router-dom"; // React Router's hook for navigation
import Footer from "../../components/Footer/footer"; // Custom Footer component

// Main component for the password recovery process
const RecoverPass = () => {
  const dispatch = useDispatch(); // Getting the dispatch function to send actions to the Redux store
  const navigate = useNavigate(); // Hook to programmatically navigate between routes
  const { error, success } = useSelector((state) => state.passrecover); // Getting the error and success status from the Redux state
  const [formData, setFormData] = useState({ // Local state to handle form data
    email: "", // Initial state for the email input field
  });

  // Function to handle changes in the form inputs
  const handleChange = (e) => {
    const { name, value } = e.target; // Extracting the name and value from the input
    setFormData({
      ...formData, // Keeping the rest of the formData intact
      [name]: value, // Updating the changed field
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Dispatching the sendVerificationEmail action with the form data
    dispatch(sendVerificationEmail(formData));
  };

  // useEffect hook to navigate to the next page if the recovery email is sent successfully
  useEffect(() => {
    if (success) {
      navigate("/inputcode"); // Redirect to the input code page upon success
    }
  }, [success, navigate]); // The effect depends on the success state and the navigate function

  return (
    <ThemeProvider>
      {/* Main structure of the component wrapped in a consistent theme */}
      <NavBar /> {/* Navigation bar at the top */}
      <Container>
        <StyledForm onSubmit={handleSubmit}> {/* Form submission triggers handleSubmit */}
          <StyledDivForm>
            <Text2>Recuperar contraseña</Text2> {/* Title for the form */}
            <StyledBox>
              <TextField
                name="email" // Input name for email field
                label="Email" // Label shown above the input
                value={formData.email} // Value of the input bound to the form state
                onChange={handleChange} // Change handler to update form state
                type="email" // Input type for validation
                fullWidth // Makes the input span the entire width
                required // Marking the input as required
                error={!!error} // Shows error state if there is an error
                helperText={error && "Correo electrónico no registrado"} // Shows helper text if there's an error
              />
            </StyledBox>
            <StyledButton type="submit">Recuperar Contraseña</StyledButton> {/* Button to submit the form */}
          </StyledDivForm>

          <StyledFooterForm>
            <Text4>Se enviará un código a tu correo.</Text4> {/* Informational text in the footer */}
          </StyledFooterForm>
        </StyledForm>
      </Container>
      <Footer /> {/* Footer at the bottom */}
    </ThemeProvider>
  );
};

export default RecoverPass; // Exporting the component as the default export
