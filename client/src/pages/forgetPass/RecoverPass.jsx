import { TextField } from "@mui/material"; // Material UI component for user input
import { useEffect, useState } from "react"; // React hooks for state and side effects
import { useDispatch, useSelector } from "react-redux"; // Redux hooks to manage state
import NavBar from "../../components/NavBar/NavBar"; // Custom navigation bar component
import { StyledButton } from "../../components/styledComponets/Bottons/botton"; // Styled button
import { Container, StyledBox, StyledForm } from "../../components/styledComponets/Containers/Containers"; // Styled layout components
import { Text2, Text4 } from "../../components/styledComponets/Text/Text"; // Styled text components
import ThemeProvider from "../../components/styledComponets/Theme/ThemeProvider"; // Custom theme provider for styling
import { sendVerificationEmail } from "../../redux/states/RecoverPass"; // Redux action for sending verification email
import { StyledDivForm, StyledFooterForm } from "../Register/StyledComponets/containerForm"; // Styled form components
import { useNavigate } from "react-router-dom"; // Hook for navigation between routes
import Footer from "../../components/Footer/footer"; // Footer component

const RecoverPass = () => {
  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const navigate = useNavigate(); // Hook to navigate between routes
  const { error, success } = useSelector((state) => state.passrecover); // Select error and success state from Redux

  // State to manage form input values (email field)
  const [formData, setFormData] = useState({
    email: "", // Initial email state is empty
  });

  // Handles changes in the input field and updates the formData state
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the event
    setFormData({
      ...formData, // Maintain the previous state
      [name]: value, // Update the email field dynamically
    });
  };

  // Handle form submission event
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior (page reload)
    dispatch(sendVerificationEmail(formData)); // Dispatch the action to send a verification email
  };

  // Effect to navigate to the input code page when the email is successfully sent
  useEffect(() => {
    if (success) {
      navigate("/inputcode"); // Navigate to the input code page after successful email submission
    }
  }, [success, navigate]); // Dependencies: success state and navigate function

  // Effect to log the error when it occurs
  useEffect(() => {
    if (error) {
      console.error('Error:', error); // Log error to the console for debugging
    }
  }, [error]); // Dependencies: error state

  return (
    <ThemeProvider> {/* Apply custom theme for styling */}
      <NavBar /> {/* Render navigation bar */}
      <Container> {/* Main container for the form layout */}
        <StyledForm onSubmit={handleSubmit}> {/* Form handling with styled components */}
          <StyledDivForm>
            <Text2>Recuperar contraseña</Text2> {/* Form title */}
            <StyledBox>
              <TextField
                name="email" // Field name for the email input
                label="Email" // Input label
                value={formData.email} // Bind the input value to formData state
                onChange={handleChange} // Handle input changes
                type="email" // Specify input type as email
                fullWidth // Make the input take the full width of the container
                required // Make the email field mandatory
                error={!!error} // Show error styling if there is an error
                helperText={error && "Correo electrónico no registrado"} // Show helper text if there's an error
              />
            </StyledBox>
            <StyledButton type="submit">Recuperar Contraseña</StyledButton> {/* Submit button */}
          </StyledDivForm>

          <StyledFooterForm>
            <Text4>Se enviará un código a tu correo.</Text4> {/* Instructional text below the form */}
          </StyledFooterForm>
        </StyledForm>
      </Container>
      <Footer /> {/* Render footer */}
    </ThemeProvider>
  );
};

export default RecoverPass; // Export the component for use in other parts of the application
