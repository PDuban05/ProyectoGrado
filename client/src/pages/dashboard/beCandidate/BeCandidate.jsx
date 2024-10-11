import { Button, Grid, InputAdornment, MenuItem, Typography } from "@mui/material"; // Importing necessary Material UI components
import axios from "axios"; // Importing axios for making HTTP requests
import { useEffect, useState } from "react"; // Importing React hooks for managing state and lifecycle
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks for state management
import Swal from "sweetalert2"; // Importing SweetAlert2 for displaying alerts

import { Facebook, Instagram, Language, YouTube } from "@mui/icons-material"; // Importing icons for social media links
import { useNavigate } from "react-router-dom"; // Importing useNavigate for programmatic navigation
import Footer from "../../../components/Footer/footer"; // Importing Footer component
import NavBar from "../../../components/NavBar/NavBar"; // Importing NavBar component
import ThemeProvider from "../../../components/styledComponets/Theme/ThemeProvider"; // Importing ThemeProvider for consistent theming
import {
    FormField,
    StyledContainer,
    StyledForm
} from "../Perfil/StyledComponets/ProfileStyled"; // Importing styled components for the form
import { RegisterCandidate, resetState } from "../../../redux/states/RegisterCandidate"; // Importing actions for Redux state management

const BeCandidate = () => {
    // State to manage form data for candidate registration
    const [formData, setFormData] = useState({
        person_id: "", // ID of the person registering
        political_party: "", // Political party of the candidate
        campaign_slogan: "", // Slogan for the campaign
        biography: "", // Biography of the candidate
        social_media_links: {
            youtube: "", // YouTube link
            instagram: "", // Instagram link
            facebook: "", // Facebook link
            webside: "" // Website link
        },
        campaign_id: "" // ID of the campaign
    });

    const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store
    const [campaigns, setCampaigns] = useState([]); // State to store available campaigns
    const { user } = useSelector((state) => state.auth); // Retrieving user information from Redux store
    const [loading, setLoading] = useState(true); // State to manage loading status
    const navigate = useNavigate(); // Hook for navigation
    const { success, error } = useSelector((state) => state.RegisterCandidate); // Retrieving success and error messages from Redux store

    useEffect(() => {
        // Fetch upcoming campaigns when the component mounts
        axios
            .post("http://localhost:3001/fetchUpcomingCampaigns")
            .then((response) => {
                if (response.data.success) {
                    // Store the results of the campaigns
                    setCampaigns(response.data.results); 
                    setLoading(false); // Set loading to false after fetching
                } else {
                    setLoading(false); // Set loading to false if no campaigns were found
                }
            })
            .catch((error) => {
                console.error("Error fetching campaigns:", error); // Log any errors during fetching
                setLoading(false); // Set loading to false in case of an error
            });
    }, []); // Empty dependency array means this runs once on mount

    useEffect(() => {
        // Set the user ID in formData when the component mounts
        if (user) {
            setFormData((prevData) => ({
                ...prevData,
                person_id: user.id // Attach the user's ID
            }));
        }
    }, [user]); // Runs whenever the user state changes

    const handleChange = (e) => {
        const { name, value } = e.target; // Destructure the name and value from the event
        if (name in formData.social_media_links) {
            // If the changed field is a social media link
            setFormData({
                ...formData,
                social_media_links: {
                    ...formData.social_media_links,
                    [name]: value // Update the specific social media link
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value // Update the regular form field
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        dispatch(RegisterCandidate(formData)); // Dispatch the RegisterCandidate action with formData
    };

    useEffect(() => {
        // Handle success or error messages after attempting to register the candidate
        if (success) {
            Swal.fire({
                icon: "success",
                title: "You have registered successfully", // Show success alert
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            });

            setTimeout(() => {
                navigate("/Campañas"); // Navigate to the campaigns page after 2 seconds
                dispatch(resetState()); // Reset the state after navigation
            }, 2000);
        } else if (error != null) {
            Swal.fire({
                icon: "error",
                title: error, // Show error alert with the error message
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            });
        }
    }, [error, success]); // Runs whenever error or success state changes

    return (
        <ThemeProvider>
            <NavBar />
            <StyledContainer maxWidth="md">
                <StyledForm onSubmit={handleSubmit}>
                    <Typography variant="h4">Formulario para ser candidato</Typography>
                    <Typography variant="h7" gutterBottom>
                        Completa la información para aplicar a la campaña
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormField
                                fullWidth
                                name="political_party"
                                label="Partido político"
                                value={formData.political_party}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormField
                                fullWidth
                                name="campaign_slogan"
                                label="Eslogan de campaña"
                                value={formData.campaign_slogan}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormField
                                fullWidth
                                name="biography"
                                label="Biografía"
                                multiline
                                rows={4}
                                value={formData.biography}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/* Campos para los enlaces de redes sociales */}
                        <Grid item xs={12} sm={6}>
                            <FormField
                                fullWidth
                                name="youtube"
                                label="YouTube"
                                value={formData.social_media_links.youtube}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <YouTube />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormField
                                fullWidth
                                name="webside"
                                label="Sitio web"
                                value={formData.social_media_links.webside}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Language />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
      
                        <Grid item xs={12} sm={6}>
                            <FormField
                                fullWidth
                                name="instagram"
                                label="Instagram"
                                value={formData.social_media_links.instagram}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Instagram />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormField
                                fullWidth
                                name="facebook"
                                label="Facebook"
                                value={formData.social_media_links.facebook}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Facebook />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        {/* Selector para las campañas */}
                        <Grid item xs={12}>
                            <FormField
                                select
                                fullWidth
                                name="campaign_id"
                                label="Selecciona la campaña en la que quieres ser candidato"
                                value={formData.campaign_id}
                                onChange={handleChange}
                            >
                                {campaigns.map((campaign) => (
                                    <MenuItem key={campaign.campaign_id} value={campaign.campaign_id}>
                                        {campaign.name}
                                    </MenuItem>
                                ))}
                            </FormField>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Cargando..." : "Guardar cambios"}
                            </Button>
                        </Grid>
                    </Grid>
                </StyledForm>
            </StyledContainer>
            <Footer />
        </ThemeProvider>
    );
};

export default BeCandidate;
