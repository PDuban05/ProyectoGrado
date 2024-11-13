



import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Autocomplete, IconButton, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavBar from "../../components/NavBar/NavBar";
import { StyledButton } from "../../components/styledComponets/Bottons/botton";
import { Container, StyledBox, StyledForm } from "../../components/styledComponets/Containers/Containers";
import { StyledLink, Text2, Text4 } from "../../components/styledComponets/Text/Text";
import ThemeProvider from "../../components/styledComponets/Theme/ThemeProvider";
import {  addUserFailure, userAdd } from "../../redux/states/RegisterSlice";
import { StyledDivForm, StyledFooterForm } from "./StyledComponets/containerForm";
import axios from "axios";

const Register = () => {
  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dni: "",
    password: "",
    course: null, // Cambia el tipo a null para almacenar el objeto del curso
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dni: "",
    password: "",
    course: "",
  });
  const [Errorserver, setErrorserver] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/course')
      .then(response => {
        if (response.data.success) {
          setCourses(response.data.courses);
        } else {
          console.error('Error fetching courses:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "firstName":
        if (!/^[a-zA-Z\s]+$/.test(value)) error = "El nombre solo debe contener letras y espacios";
        break;
      case "lastName":
        if (!/^[a-zA-Z\s]+$/.test(value)) error = "El apellido solo debe contener letras y espacios";
        break;
      case "dni":
        if (!/^\d+$/.test(value)) error = "La cédula solo debe contener números";
        break;
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) error = "El email no es válido";
        break;
      case "password":
        if (!value.match(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/)) {
          error = "Debe contener al menos un número, una letra y un símbolo";
        }
        if (value.length < 6) error = "Debe tener al menos 6 caracteres";
        break;
      case "course":
        if (!value) error = "Selecciona una carrera";
        break;
      default:
        break;
    }
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error
    }));
  };
  

  const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData, [name]: value };
      validateField(name, value); // Llama a la validación cada vez que cambias un campo
      return newFormData;
    });
  };
  

  const handleCourseChange = (event, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      course: value ? value.id : "", // Guarda solo el id del curso seleccionado
    }));
  
    validateField("course", value); // Llama a la validación al cambiar el curso
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Verifica si los errores están vacíos y si los valores del formulario no están vacíos
    const isValid = Object.values(errors).every((error) => error === "") &&
                    Object.values(formData).every((value) => value !== "" && value !== null);
  
  
  
    if (isValid) {
     console.log(formData)
      dispatch(userAdd(formData));

    } else {
      alert("Por favor, corrija los errores en el formulario antes de enviarlo.");
    }
  };
  

  useEffect(() => {
    if (success) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });

      Toast.fire({
        icon: "success",
        title: "Te has registrado con éxito"
      }).then(() => {
        dispatch(addUserFailure());
        navigate("/login");
      });
    }
    if (error) {
      setErrorserver(error);
    } else {
      setErrorserver("");
    }
  }, [success, error, navigate]);

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
              <Autocomplete
                options={courses}
                getOptionLabel={(option) => option.name} // Muestra el nombre del curso en el selector
                value={courses.find((course) => course.id === formData.course) || null} // Selecciona el curso por id
                onChange={handleCourseChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecciona tu carrera"
                    required
                    error={!!errors.course}
                    helperText={errors.course}
                  />
                )}
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
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility} edge="end">
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
