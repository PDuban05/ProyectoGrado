import { useEffect, useRef, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 
import Footer from "../../components/Footer/footer";
import NavBar from "../../components/NavBar/NavBar";
import { StyledButton } from "../../components/styledComponets/Bottons/botton";
import { Container, StyledBox, StyledForm, StyledTextField } from "../../components/styledComponets/Containers/Containers";
import { Text2, Text4 } from "../../components/styledComponets/Text/Text";
import ThemeProvider from "../../components/styledComponets/Theme/ThemeProvider";
import { verifyUser } from "../../redux/states/AuthUser";
import { verifyCode } from "../../redux/states/RecoverPass";
import { StyledDivForm, StyledFooterForm } from "../Register/StyledComponets/containerForm";

// The InputCode component handles the 6-digit code input for user verification.
const InputCode = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to programmatically navigate between routes
  const { codeVerificationError, codeVerificationSuccess } = useSelector((state) => state.passrecover); // Access verification states from Redux
  const [codes, setCodes] = useState(["", "", "", "", "", ""]); // State to hold the 6-digit code
  const inputs = useRef([]); // useRef to store input field references for navigation
  const { success } = useSelector((state) => state.auth); // Access authentication success state from Redux

  // Handle change for individual input fields
  const handleChange = (index) => (e) => {
    const value = e.target.value;

    // Allow only single digit values
    if (value.length > 1 || isNaN(value)) return;

    // Update the state with the entered digit
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    // Automatically move to the next input field if it's not the last one
    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  // Handle backspace navigation to the previous field
  const handleKeyDown = (index) => (e) => {
    if (e.key === "Backspace" && codes[index] === "") {
      if (index > 0) {
        const newCodes = [...codes];
        newCodes[index - 1] = "";
        setCodes(newCodes);
        inputs.current[index - 1].focus();
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const code = codes.join(""); // Concatenate the code array to form the full code
    dispatch(verifyCode({ code })); // Dispatch the code to Redux for verification
  };

  // Handle verification success or failure
  useEffect(() => {
    if (codeVerificationSuccess && success) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Te has verificado con éxito",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        navigate("/campañas"); // Navigate to the campaign page if verification succeeds
      });
      dispatch(verifyUser()); // Dispatch action to verify the user in Redux
    } else if (codeVerificationSuccess) {
      navigate("/inputnewpassword"); // If the code is correct but not fully authenticated, navigate to password input page
    }
  }, [codeVerificationSuccess, navigate, success, dispatch]);

  return (
    <ThemeProvider> {/* ThemeProvider to wrap the form in a custom theme */}
      <NavBar /> {/* Navigation bar */}
      <Container> {/* Main container for the form */}
        <StyledForm onSubmit={handleSubmit}> {/* Form for handling code input */}
          <StyledDivForm>
            <Text2>Insertar código</Text2> {/* Instructional text */}
            <StyledBox style={{ display: "flex", justifyContent: "space-between" }}>
              {codes.map((code, index) => (
                <StyledTextField
                  key={index}
                  value={code}
                  onChange={handleChange(index)} // Handle input change
                  onKeyDown={handleKeyDown(index)} // Handle backspace for navigation
                  type="text"
                  inputProps={{ maxLength: 1 }} // Only allow a single digit
                  fullWidth
                  required
                  error={!!codeVerificationError} // Show error if verification fails
                  helperText={codeVerificationError && index === 5 ? "El código es inválido" : ""} // Display error message
                  inputRef={(el) => (inputs.current[index] = el)} // Store the input ref for navigation
                />
              ))}
            </StyledBox>
            <StyledButton type="submit">Enviar</StyledButton> {/* Submit button */}
          </StyledDivForm>

          <StyledFooterForm>
            <Text4>Escribe el código que fue enviado a tu correo</Text4> {/* Instructional footer text */}
          </StyledFooterForm>
        </StyledForm>
      </Container>
      <Footer /> {/* Footer section */}
    </ThemeProvider>
  );
};

export default InputCode; // Export the component
