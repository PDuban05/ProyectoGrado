// Importing various components from Material UI for UI elements such as TextFields, Icons, Checkbox, etc.
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react"; // React hooks for component state and lifecycle
import { useDispatch, useSelector } from "react-redux"; // Redux hooks to dispatch actions and access state
import { useNavigate } from "react-router-dom"; // Hook to programmatically navigate in React Router
import NavBar from "../../components/NavBar/NavBar"; // Custom NavBar component
import { StyledButton } from "../../components/styledComponets/Bottons/botton"; // Styled button component
import { Container, StyledBox, StyledForm } from "../../components/styledComponets/Containers/Containers"; // Custom styled containers for layout
import { StyledLink, Text2, Text4 } from "../../components/styledComponets/Text/Text"; // Custom styled text components
import ThemeProvider from "../../components/styledComponets/Theme/ThemeProvider"; // Theme provider for consistent styling
import { loginAuth } from "../../redux/states/AuthUser"; // Redux action for authentication
import { StyledBoxLogin, StyledDivForm, StyledFooterForm } from "./StyledComponets/containerForm"; // Styled containers for the form layout
import Footer from "../../components/Footer/footer"; // Footer component

const Login = () => {
  // Destructuring values from Redux auth state
  const { success, error, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch(); // Dispatch hook to trigger actions
  const navigate = useNavigate(); // React Router hook for navigation

  // Component state to handle form inputs and password visibility toggle
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
    userType: "", // New field to allow user type selection (e.g. admin/student)
  });

  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  // Update form state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // Spread existing formData
      [name]: value, // Dynamically update the input field by name
    });
  };

  // Toggle the visibility of the password field between masked and visible
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Invert the boolean value for password visibility
  };

  // Update the state when "Remember Me" checkbox is toggled
  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      rememberMe: e.target.checked, // Set checkbox value based on user input
    });
  };

  // Update userType in the formData when a user selects an option from the dropdown
  const handleUserTypeChange = (e) => {
    setFormData({
      ...formData,
      userType: e.target.value, // Capture the selected value of user type
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    dispatch(loginAuth(formData)); // Dispatch login action with form data
  };

  // State to track error messages locally, especially authentication errors
  const [errors, setErrors] = useState({
    AuthError: "", // Track authentication-specific error
  });

  // useEffect hook to handle side-effects like navigation or error handling
  useEffect(() => {
    // Navigate based on the user's role (student/admin) after successful login
    if (success && user.role == "student") {
      navigate("/Campañas"); // Redirect students to campaigns page
    } else if (success && user.role == "admin") {
      navigate("/admin/inicio"); // Redirect admins to admin dashboard
    }

    // Set error message if login fails
    if (error) {
      setErrors((prevErrors) => ({
        ...prevErrors, // Preserve previous errors and update AuthError
        AuthError: error,
      }));
    } else {
      // Clear error messages when there's no error
      setErrors((prevErrors) => ({
        ...prevErrors,
        AuthError: "",
      }));
    }
  }, [user, success, error, navigate]);

  return (
    <ThemeProvider>
      <NavBar />
      <Container>
        <StyledForm onSubmit={handleSubmit}>
          <StyledDivForm>
            <Text2 id="login-title">Iniciar sesión</Text2>
            <StyledBox>
              <TextField
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                fullWidth
                required
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
                error={!!errors.AuthError}
                helperText={errors.AuthError}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </StyledBox>


            {/* Select for user type */}
            <StyledBox>
              <FormControl fullWidth required>
                <InputLabel id="user-type-label">Tipo de Usuario</InputLabel>
                <Select
                  labelId="user-type-label"
                  aria-label="userType"
                  value={formData.userType}
                  onChange={handleUserTypeChange}
                >
                  <MenuItem data-testid="admin-type" value="admin">Administrador</MenuItem>
                  <MenuItem data-testid="student-type" value="student">Estudiante</MenuItem>
                </Select>
              </FormControl>
            </StyledBox>

            <StyledBoxLogin>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.rememberMe}
                    onChange={handleCheckboxChange}
                    name="rememberMe"
                  />
                }
                label="Recordarme"
              />
              <StyledLink to="/recover">¿Olvidaste tu contraseña?</StyledLink>
            </StyledBoxLogin>
            <StyledButton type="submit">Ingresar</StyledButton>
          </StyledDivForm>

          <StyledFooterForm>
            <Text4>¿Aún no tienes una cuenta?</Text4>
            <StyledLink to="/register">Regístrate</StyledLink>
          </StyledFooterForm>
        </StyledForm>
      </Container>
      <Footer />
    </ThemeProvider>
  );
};
export default Login;
