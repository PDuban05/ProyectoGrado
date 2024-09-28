import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { StyledButton } from "../../components/styledComponets/Bottons/botton";
import { Container, StyledBox, StyledForm } from "../../components/styledComponets/Containers/Containers";
import { StyledLink, Text2, Text4 } from "../../components/styledComponets/Text/Text";
import ThemeProvider from "../../components/styledComponets/Theme/ThemeProvider";
import { loginAuth } from "../../redux/states/AuthUser";
import { StyledBoxLogin, StyledDivForm, StyledFooterForm } from "./StyledComponets/containerForm";
import Footer from "../../components/Footer/footer";

const Login = () => {
  const { success, error, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
    userType: "", 
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      rememberMe: e.target.checked,
    });
  };

  const handleUserTypeChange = (e) => {
    setFormData({
      ...formData,
      userType: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAuth(formData));
  };

  const [errors, setErrors] = useState({
    AuthError: "",
  });

  useEffect(() => {
    if (success && user.role=="student") {
      navigate("/Campañas");
    }


    
    else if(success && user.role=="admin" ){

        navigate("/admin/inicio")
    }

    if (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        AuthError: error,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        AuthError: "",
      }));
    }
  }, [user,success, error, navigate]);

  return (
    <ThemeProvider>
      <NavBar />
      <Container>
        <StyledForm onSubmit={handleSubmit}>
          <StyledDivForm>
            <Text2>Iniciar sesión</Text2>
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
                  name="userType"
                  value={formData.userType}
                  onChange={handleUserTypeChange}
                >
                  <MenuItem value="admin">Administrador</MenuItem>
                  <MenuItem value="student">Estudiante</MenuItem>
                  
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
            <StyledButton type="submit">Iniciar sesión</StyledButton>
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
