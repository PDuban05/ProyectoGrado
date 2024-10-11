import { Visibility, VisibilityOff } from "@mui/icons-material"; // Importing icons for visibility toggle
import { IconButton, InputAdornment, TextField } from "@mui/material"; // Importing Material UI components
import { useEffect, useState } from "react"; // Importing React hooks
import { useDispatch, useSelector } from "react-redux"; // Importing hooks for Redux
import { useNavigate } from "react-router-dom"; // Importing navigation hook
import NavBar from "../../components/NavBar/NavBar"; // Importing the navigation bar component
import { StyledButton } from "../../components/styledComponets/Bottons/botton"; // Importing a styled button
import { Container, StyledBox, StyledForm } from "../../components/styledComponets/Containers/Containers"; // Importing styled container components
import { StyledLink, Text2, Text4 } from "../../components/styledComponets/Text/Text"; // Importing styled text components
import ThemeProvider from "../../components/styledComponets/Theme/ThemeProvider"; // Importing theme provider
import { addUser } from "../../redux/states/RegisterSlice"; // Importing action to register a user
import { StyledDivForm, StyledFooterForm } from "./StyledComponets/containerForm"; // Importing styled components for form

const Register = () => {
  const dispatch = useDispatch(); // Hook to dispatch actions
  const { success, error } = useSelector((state) => state.user); // Selecting success and error states from Redux store
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [formData, setFormData] = useState({ // State to store form data
    firstName: "",
    lastName: "",
    email: "",
    dni: "",
    password: "",
  });

  const [errors, setErrors] = useState({ // State to store validation errors
    firstName: "",
    lastName: "",
    email: "",
    dni: "",
    password: "",
  });

  const [Errorserver, setErrorserver] = useState(""); // State to store server error messages

  // Function to validate individual fields based on their name and value
  const validateField = (name, value) => {
    let error = "";

    // Switch case to validate different fields
    switch (name) {
      case "firstName":
        if (!/^[a-zA-Z]+$/.test(value)) {
          error = "El nombre solo debe contener letras"; // Error message for first name
        }
        break;
      case "lastName":
        if (!/^[a-zA-Z]+$/.test(value)) {
          error = "El apellido solo debe contener letras"; // Error message for last name
        }
        break;
      case "dni":
        if (!/^\d+$/.test(value)) {
          error = "La cédula solo debe contener números"; // Error message for DNI
        }
        break;
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) {
          error = "El email no es válido"; // Error message for email
        }
        break;
      case "password":
        if (!value.match(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/)) {
          error = "Debe contener al menos un número, una letra y un símbolo"; // Error message for password complexity
        }
        if (value.length < 6) {
          error = "Debe tener al menos 6 caracteres"; // Error message for password length
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error })); // Update errors state
  };

  // Function to toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle input changes and validate fields in real time
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from event target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value, // Update corresponding field in formData
    }));
    validateField(name, value); // Validate field in real time
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Final validation check before dispatching the action
    const isValid = Object.values(errors).every((error) => error === "") && 
                    Object.values(formData).every((value) => value !== "");

    if (isValid) {
      dispatch(addUser(formData)); // Dispatch action to add user if valid
    } else {
      alert("Por favor, corrija los errores en el formulario antes de enviarlo."); // Alert user to correct errors
    }
  };

  // Effect to navigate on successful registration or handle errors
  useEffect(() => {
    if (success) {
      navigate("/login"); // Navigate to login page on success
    }

    if (error) {
      setErrorserver(error); // Set server error message
    } else {
      setErrorserver(""); // Reset error message if no error
    }
  }, [success, error, navigate]); // Dependencies for useEffect

  return (
    <ThemeProvider>
      <NavBar />
      <Container>
        <StyledForm onSubmit={handleSubmit}>
          <StyledDivForm>
            <Text2>Registro</Text2>
            <StyledBox>
              <TextField
                name="firstName"
                label="Nombres"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </StyledBox>
            <StyledBox>
              <TextField
                name="lastName"
                label="Apellidos"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </StyledBox>
            <StyledBox>
              <TextField
                name="dni"
                label="Cedula"
                value={formData.dni}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.dni}
                helperText={errors.dni}
              />
            </StyledBox>
            <StyledBox>
              <TextField
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                fullWidth
                required
                error={!!errors.email || !!Errorserver}
                helperText={errors.email || Errorserver}
              />
            </StyledBox>

            <StyledBox>
              <TextField
                name="password"
                label="Contraseña"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                fullWidth
                required
                error={!!errors.password }
                helperText={errors.password }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </StyledBox>

            <StyledButton type="submit">Registrar</StyledButton>
          </StyledDivForm>

          <StyledFooterForm>
            <Text4>¿Ya tienes una cuenta?</Text4>
            <StyledLink to="/login">Iniciar sesión</StyledLink>
          </StyledFooterForm>
        </StyledForm>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
