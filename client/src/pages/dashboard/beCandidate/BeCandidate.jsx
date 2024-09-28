import { Button, Grid, InputAdornment, MenuItem, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { Facebook, Instagram, Language, YouTube } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer/footer";
import NavBar from "../../../components/NavBar/NavBar";
import ThemeProvider from "../../../components/styledComponets/Theme/ThemeProvider";
import {
    FormField,
    StyledContainer,
    StyledForm
} from "../Perfil/StyledComponets/ProfileStyled";
import { RegisterCandidate, resetState } from "../../../redux/states/RegisterCandidate";

const BeCandidate = () => {
    const [formData, setFormData] = useState({
        person_id: "",
        political_party: "",
        campaign_slogan: "",
        biography: "",
        social_media_links: {
            youtube: "",
            instagram: "",
            facebook: "",
            webside: ""
        },
        campaign_id: ""
    });

    const dispatch = useDispatch();
    const [campaigns, setCampaigns] = useState([]); // Almacenar las campañas disponibles
    const { user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { success, error } = useSelector((state) => state.RegisterCandidate);

    

    useEffect(() => {
        axios
            .post("http://localhost:3001/fetchUpcomingCampaigns")
            .then((response) => {
                if (response.data.success) {
                    // Almacenar los resultados de las campañas
                    setCampaigns(response.data.results); 
                
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error("Error fetching campaigns:", error);
                setLoading(false);
            });
    }, []);


    useEffect(() => {
        // Establecer el ID del usuario en el formData cuando se cargue el componente
        if (user) {
            setFormData((prevData) => ({
                ...prevData,
                person_id: user.id // Adjuntamos el id del usuario
            }));
        }
    }, [user]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in formData.social_media_links) {
            setFormData({
                ...formData,
                social_media_links: {
                    ...formData.social_media_links,
                    [name]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(RegisterCandidate(formData));
        
        
    };

    useEffect(() => {
        if (success) {
            Swal.fire({
                icon: "success",
                title: "Te has registrado correctamente",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            });

            setTimeout(() => {
                navigate("/Campañas");
                dispatch(resetState());
            }, 2000);
        } else if (error != null) {
            Swal.fire({
                icon: "error",
                title: error,
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            });
        }
    }, [error, success]);

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
