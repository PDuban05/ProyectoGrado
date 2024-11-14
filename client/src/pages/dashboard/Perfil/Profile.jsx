import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Avatar, Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer/footer";
import NavBar from "../../../components/NavBar/NavBar";
import ThemeProvider from "../../../components/styledComponets/Theme/ThemeProvider";
import { resetState, UpdateUser } from "../../../redux/states/UpdateUser";
import {
  AvatarWrapper,
  FileInput,
  FormField,
  StyledContainer,
  StyledForm,
} from "./StyledComponets/ProfileStyled";

import countriesData from './../../../assets/json/countries.json';
import statesData from './../../../assets/json/states.json';
import citiesData from './../../../assets/json/cities.json';

const FormProfile = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    person_id: "",
    national_id_number: "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    phone_number: "",
    address: "",
    country: "",
    state: "",
    city: "",
    profile_picture_url: "",
    occupation: "",
    education_level: "",
    marital_status: "",
    program: "",
  });

  const [formList, setFormList] = useState({
    gender: [],
    occupation: [],
    marital_status: [],
    education_level: [],
    program: [],
  });

  const dispatch = useDispatch();

  // State to manage profile picture and selected file
  const [profilePicture, setProfilePicture] = useState("/placeholder.svg");
  const [selectedFile, setSelectedFile] = useState(null);
  const { user } = useSelector((state) => state.auth); // Get user info from Redux state
  const { success, error } = useSelector((state) => state.updateUser); // Get success/error states from Redux
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  // Fetch user information on component mount

  useEffect(() => {
    console.log(user);
    axios
      .post("http://localhost:3001/fetchUserInf", { user_id: user.id })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          const userData = response.data.user;
          const occupationsData = response.data.occupations;
          const maritalStatus = response.data.maritalStatus;
          const genderOptions = response.data.genders;
          const educationLevels = response.data.educationLevels;
          const programs = response.data.programs;
  
          console.log(userData);
  
          const formattedDate = userData.date_of_birth
            ? new Date(userData.date_of_birth).toISOString().split("T")[0]
            : "";
  
          // Verificar que location no sea null antes de acceder a sus propiedades
          const location = userData.location || {};
          
          // Filtrar los estados y ciudades iniciales basados en country y state del usuario
          const initialFilteredStates = location.country
            ? statesData.states.filter(
                (state) => state.id_country === parseInt(location.country)
              )
            : []; // Si no existe country, retornar un array vacío
  
          const initialFilteredCities = location.state
            ? citiesData.cities.filter(
                (city) => city.id_state === parseInt(location.state)
              )
            : []; // Si no existe state, retornar un array vacío
  
          setFormList({
            gender: genderOptions,
            occupation: occupationsData,
            marital_status: maritalStatus,
            education_level: educationLevels,
            program: programs,
          });
  
          setFilteredStates(initialFilteredStates);
          setFilteredCities(initialFilteredCities);
  
          // Actualiza el estado de formData con la información del usuario, usando el operador opcional
          setFormData({
            person_id: userData.person_id || "",
            national_id_number: userData.national_id_number || "",
            first_name: userData.first_name || "",
            last_name: userData.last_name || "",
            date_of_birth: formattedDate,
            gender: userData.gender_id || "",
            phone_number: userData.phone_number || "",
            address: userData.address || "",
            country: location.country || "",
            state: location.state || "",
            city: location.city || "",
            profile_picture_url: userData.profile_picture_url || "",
            occupation: userData.occupation_id || "",
            education_level: userData.education_level_id || "",
            marital_status: userData.marital_status_id || "",
            program: userData.program_id || "",
          });
  
          setProfilePicture(`http://localhost:3001${userData.profile_picture_url}`);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setLoading(false);
      });
  }, [user]);
  

  // Handle input changes for the form fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setFormData({
      ...formData,
      [name]: value, // Guarda el ID seleccionado en `formData.gender`
    });

      // Actualiza selectores dependientes
  if (name === 'country') {
    setFilteredStates(statesData.states.filter(state => state.id_country === parseInt(value)));
    
    setFormData({
      ...formData,
      [name]: value, // Guarda el ID seleccionado en `formData.gender`
    });

    setFilteredCities([]); // Limpia ciudades
  } else if (name === 'state') {
    setFilteredCities(citiesData.cities.filter(city => city.id_state === parseInt(value)));
   
    setFormData({
      ...formData,
      [name]: value, // Guarda el ID seleccionado en `formData.gender`
    });

  }


    
  };

  // Handle file input changes for profile picture
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Preview the selected image
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validación de formulario
    const missingFields = validateForm();
    if (missingFields.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Faltan campos por rellenar",
        text: `Por favor complete los siguientes campos: ${missingFields.join(", ")}`,
      });
      return;
    }
  
    if (selectedFile) {
      try {
        const imageData = new FormData();
        imageData.append("file", selectedFile);
  
        const uploadResponse = await axios.post(
          `http://localhost:3001/upload/${user.id}/profile`,
          imageData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        if (uploadResponse.data.success) {
          const imageUrl = uploadResponse.data.imageUrl;
          setFormData({
            ...formData,
            profile_picture_url: imageUrl,
          });
  
          dispatch(UpdateUser({ ...formData, profile_picture_url: imageUrl }));
        } else {
          console.error("Error uploading image:", uploadResponse.data.message);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      dispatch(UpdateUser(formData));
    }
  };

  // Show success/error notifications based on the response
  useEffect(() => {
    if (success) {
      // Show success notification
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Changes saved successfully",
      });

      setTimeout(() => {
        // Redirect based on user role
        if (user.role === "student") {
          navigate("/Campañas"); // Redirect to campaigns page
          dispatch(resetState());
        } else if (user.role === "admin") {
          navigate("/admin/inicio"); // Redirect to admin homepage
          dispatch(resetState());
        }
      }, 1000); // Wait for 1 second
    } else if (error != null) {
      // Show error notification
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "Something went wrong",
      });
    }
  }, [error, success]);




  // Función de validación de campos obligatorios
const validateForm = () => {
  const requiredFields = [
    { field: "national_id_number", name: "Número de Identificación Nacional" },
    { field: "first_name", name: "Nombre" },
    { field: "last_name", name: "Apellidos" },
    { field: "date_of_birth", name: "Fecha de Nacimiento" },
    { field: "gender", name: "Género" },
    { field: "phone_number", name: "Número Telefónico" },
    { field: "address", name: "Dirección" },
    { field: "country", name: "País" },
    { field: "state", name: "Departamento" },
    { field: "city", name: "Ciudad" },
    { field: "occupation", name: "Ocupación" },
    { field: "education_level", name: "Semestre Actual" },
    { field: "marital_status", name: "Estado Civil" },
    { field: "program", name: "Programa Actual" },
  ];

  const missingFields = requiredFields
    .filter((field) => !formData[field.field])
    .map((field) => field.name);

  return missingFields;
};

  return (
    <ThemeProvider>
      <NavBar />
      <StyledContainer maxWidth="md">
        <StyledForm onSubmit={handleSubmit}>
          <Typography variant="h4">Perfil personal</Typography>
          <Typography variant="h7" gutterBottom>
            Completa tu información personal
          </Typography>

          {/* Parte de subir la foto de perfil */}
          <AvatarWrapper>
            <Avatar
              alt="Foto de perfil"
              src={profilePicture}
              sx={{ width: 96, height: 96 }}
            />
            <label htmlFor="upload-photo">
              <FileInput
                accept="image/*"
                id="upload-photo"
                type="file"
                onChange={handleFileChange}
              />
              <Button
                variant="outlined"
                component="span"
                startIcon={<CameraAltIcon />}
              >
                Cambiar foto
              </Button>
            </label>
          </AvatarWrapper>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormField
                fullWidth
                name="national_id_number"
                label="National ID Number"
                value={formData.national_id_number}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                fullWidth
                name="first_name"
                label="Nombre"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                fullWidth
                name="last_name"
                label="Apellidos"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                fullWidth
                name="date_of_birth"
                label="Fecha de nacimiento"
                type="date"
                value={formData.date_of_birth}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormField
                fullWidth
                select
                name="gender"
                label="Género"
                value={formData.gender} // Contiene el ID del género seleccionado
                onChange={handleChange}
              >
                {formList.gender.map((genderOption) => (
                  <MenuItem
                    key={genderOption.gender_id}
                    value={genderOption.gender_id}
                  >
                    {genderOption.gender}
                  </MenuItem>
                ))}
              </FormField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormField
                fullWidth
                name="phone_number"
                label="Numero telefonico"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormField
                fullWidth
                name="address"
                label="Dirección"
                multiline
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormField
                fullWidth
                select
                name="occupation"
                label="Ocupación"
                value={formData.occupation}
                onChange={handleChange}
              >
                {formList.occupation.map((occupationOption) => (
                  <MenuItem
                    key={occupationOption.occupation_id}
                    value={occupationOption.occupation_id}
                  >
                    {occupationOption.occupation_name}
                  </MenuItem>
                ))}
              </FormField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormField
                fullWidth
                select
                name="education_level"
                label="Semestre actual"
                value={formData.education_level}
                onChange={handleChange}
              >
                {formList.education_level.map((educationOption) => (
                  <MenuItem
                    key={educationOption.education_level_id}
                    value={educationOption.education_level_id}
                  >
                    {educationOption.level}
                  </MenuItem>
                ))}
              </FormField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormField
                fullWidth
                select
                name="marital_status"
                label="Estado Civil"
                value={formData.marital_status}
                onChange={handleChange}
              >
                {formList.marital_status.map((statusOption) => (
                  <MenuItem
                    key={statusOption.marital_status_id}
                    value={statusOption.marital_status_id}
                  >
                    {statusOption.status_name}
                  </MenuItem>
                ))}
              </FormField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormField
                fullWidth
                select
                name="program"
                label="Programa actual"
                value={formData.program}
                onChange={handleChange}
              >
                {formList.program.map((programOption) => (
                  <MenuItem
                    key={programOption.program_id}
                    value={programOption.program_id}
                  >
                    {programOption.program}
                  </MenuItem>
                ))}
              </FormField>
            </Grid>

           
            <Grid item xs={12} sm={6}>
  <FormField
    fullWidth
    select
    name="country"
    label="País"
    value={formData.country}
    onChange={handleChange}
  >
    {countriesData.countries.map(country => (
      <MenuItem key={country.id} value={country.id}>
        {country.name}
      </MenuItem>
    ))}
  </FormField>
</Grid>

{/* State Selector */}
<Grid item xs={12} sm={6}>
  <FormField
    fullWidth
    select
    name="state"
    label="Departamento"
    value={formData.state}
    onChange={handleChange}
    disabled={!formData.country}  // Deshabilitado hasta que se seleccione un país
  >
    {filteredStates.map(state => (
      <MenuItem key={state.id} value={state.id}>
        {state.name}
      </MenuItem>
    ))}
  </FormField>
</Grid>

{/* City Selector */}
<Grid item xs={12} sm={6}>
  <FormField
    fullWidth
    select
    name="city"
    label="Ciudad"
    value={formData.city}
    onChange={handleChange}
    disabled={!formData.state}  // Deshabilitado hasta que se seleccione un estado
  >
    {filteredCities.map(city => (
      <MenuItem key={city.id} value={city.id}>
        {city.name}
      </MenuItem>
    ))}
  </FormField>
</Grid>
          
          
           

          </Grid>

          <Button type="submit" variant="contained" color="primary">
            Guardar
          </Button>
        </StyledForm>
      </StyledContainer>

      <Footer />
    </ThemeProvider>
  );
};

export default FormProfile;
