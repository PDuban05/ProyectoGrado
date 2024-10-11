import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, IconButton, InputAdornment, Snackbar, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { StyledButton } from "../../components/styledComponets/Bottons/botton";
import { Container, StyledBox, StyledForm } from "../../components/styledComponets/Containers/Containers";
import { Text2, Text4 } from "../../components/styledComponets/Text/Text";
import ThemeProvider from "../../components/styledComponets/Theme/ThemeProvider";
import { changePassword, changePasswordFailure, resetAllStates } from "../../redux/states/RecoverPass";
import { StyledDivForm, StyledFooterForm } from "../Register/StyledComponets/containerForm";
import Footer from "../../components/Footer/footer";

const InputNewPass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const stateUser = useSelector((state) => state.passrecover);
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    passwordChangeError: "", 
  });

  useEffect(() => {
    if (stateUser.passwordChangeSuccess) {
      setOpenSnackbar(true); // Mostrar Snackbar cuando el cambio de contraseña sea exitoso
      setTimeout(() => {
        setOpenSnackbar(false);
        dispatch(resetAllStates());
        navigate("/login");
      }, 3000); // Esperar 3 segundos antes de redirigir
    }
    
    if (stateUser.passwordChangeError) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordChangeError: stateUser.passwordChangeError,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordChangeError: "",
      }));
    }
  }, [stateUser.passwordChangeSuccess, stateUser.passwordChangeError,dispatch, navigate]);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "password":
        if (!value.match(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/)) {
          error = "Debe contener al menos un número, una letra y un símbolo";
        }
        if (value.length < 6) {
          error = "Debe tener al menos 6 caracteres";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    validateField(name, value);

    // Restablecer passwordChangeError si la nueva contraseña es diferente
    dispatch(changePasswordFailure(null))
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(errors).every((error) => error === "") && 
                    Object.values(formData).every((value) => value !== "") &&
                    !stateUser.passwordChangeError;

    if (isValid) {
      dispatch(changePassword(formData));
    } else {
      alert("Por favor, corrija los errores en el formulario antes de enviarlo.");
    }
  };

  return (
    <ThemeProvider>
      <NavBar />
      <Container>
        <StyledForm onSubmit={handleSubmit}>
          <StyledDivForm>
            <Text2>Cambio de contraseña</Text2>
            <StyledBox>
              <TextField
                name="password"
                label="nueva contraseña"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                fullWidth
                required
                error={!!errors.password || !!errors.passwordChangeError}
                helperText={errors.password || errors.passwordChangeError}
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
            <StyledButton type="submit">Cambiar Contraseña</StyledButton>
          </StyledDivForm>

          <StyledFooterForm>
            <Text4>Escribe una contraseña nueva</Text4>
          </StyledFooterForm>
        </StyledForm>



        {/* Snackbar de éxito */}
        <Snackbar
          open={openSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={() => setOpenSnackbar(false)}
          autoHideDuration={3000}
        >
          <Alert elevation={6} variant="filled" severity="success">
            ¡Contraseña cambiada exitosamente! Redirigiendo al login...
          </Alert>
        </Snackbar>
      </Container>
      <Footer/>
    </ThemeProvider>
  );
};

export default InputNewPass;
