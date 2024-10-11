import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Avatar, Button, Grid, MenuItem, Typography } from "@mui/material";
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
  StyledForm
} from "./StyledComponets/ProfileStyled";

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
    city: "",
    state: "",
    country: "",
    profile_picture_url: "",
    occupation: "",
    education_level: "",
    marital_status: "",
    program: "",
  });

  const dispatch = useDispatch();

  // State to manage profile picture and selected file
  const [profilePicture, setProfilePicture] = useState("/placeholder.svg");
  const [selectedFile, setSelectedFile] = useState(null);
  const { user } = useSelector((state) => state.auth); // Get user info from Redux state
  const { success, error } = useSelector((state) => state.updateUser); // Get success/error states from Redux
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user information on component mount
  useEffect(() => {
    axios
      .post("http://localhost:3001/fetchUserInf", { id: user.id })
      .then((response) => {
        if (response.data.success) {
          const userData = response.data.results[0];
          // Format date of birth to 'YYYY-MM-DD'
          const formattedDate = userData.date_of_birth
            ? new Date(userData.date_of_birth).toISOString().split("T")[0]
            : "";

          // Update formData with user information
          setFormData({
            person_id: userData.person_id || "",
            national_id_number: userData.national_id_number || "",
            first_name: userData.first_name || "",
            last_name: userData.last_name || "",
            date_of_birth: formattedDate,
            gender: userData.gender || "",
            phone_number: userData.phone_number || "",
            address: userData.address || "",
            city: userData.city || "",
            state: userData.state || "",
            country: userData.country || "",
            profile_picture_url: userData.profile_picture_url || "",
            occupation: userData.occupation || "",
            education_level: userData.education_level || "",
            marital_status: userData.marital_status || "",
            program: userData.program || "",
          });
          
          // Set profile picture URL
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
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

    if (selectedFile) {
      try {
        // Create a FormData object to send the image to the server
        const imageData = new FormData();
        imageData.append("file", selectedFile);

        // Make request to upload the image
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
          // Update profile_picture_url with the received URL
          const imageUrl = uploadResponse.data.imageUrl;
          setFormData({
            ...formData,
            profile_picture_url: imageUrl,
          });

          // Dispatch action to update user profile
          dispatch(UpdateUser({ ...formData, profile_picture_url: imageUrl }));
        } else {
          console.error("Error uploading image:", uploadResponse.data.message);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      // If no image is selected, submit the form directly
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
        }
      });
      Toast.fire({
        icon: "success",
        title: "Changes saved successfully"
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
        }
      });
      Toast.fire({
        icon: "error",
        title: "Something went wrong"
      });
    }
  }, [error, success]);

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
                label="Genero"
                value={formData.gender}
                onChange={handleChange}
              >
                <MenuItem value="Male">Maculino</MenuItem>
                <MenuItem value="Female">Femenino</MenuItem>
                <MenuItem value="Other">Otro</MenuItem>
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
                name="city"
                label="Ciudad"
                value={formData.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                fullWidth
                name="state"
                label="Departamento"
                value={formData.state}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                fullWidth
                name="country"
                label="Pais"
                value={formData.country}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                fullWidth
                name="occupation"
                label="Ocupación"
                value={formData.occupation}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                fullWidth
                name="education_level"
                label="Semestre actual"
                value={formData.education_level}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                fullWidth
                select
                name="marital_status"
                label="Estado civil "
                value={formData.marital_status}
                onChange={handleChange}
              >
                <MenuItem value="Single">Soltero</MenuItem>
                <MenuItem value="Married">Casado</MenuItem>
                <MenuItem value="Divorced">Divorcidado</MenuItem>
              </FormField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                fullWidth
                name="program"
                label="Programa actual"
                value={formData.program}
                onChange={handleChange}
              />
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
