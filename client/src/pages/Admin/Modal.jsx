import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  CardMedia,
  CardActionArea,
  Chip,
  Autocomplete,
} from "@mui/material";
import styled from "styled-components";
import { useState, useEffect } from "react";
import {
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import {
  CardContentAdmin,
  CardDescriptionAdmin,
  CardFooterAdmin,
  CardTitleAdmin,
  DateOverlayAdmin,
  ImageAdmin,
  StyledCardAdmin,
} from "../dashboard/Styledcomponents/StyledMainComponets";
import { Container, ContainerModal, GridContainer, Section, StyledButtonModal, StyledCardActions, StyledCardMedia, StyledCardModal, StyledDialog, StyledTextField, Title } from "./StyledComponentsAdmin/StyledComponent";


// Function to format date to YYYY-MM-DD
const formatDate = (date) => {
  if (!date) return "";

  const d = new Date(date);
  // Obtener los componentes de la fecha y hora
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  // Retornar el formato esperado por datetime-local: YYYY-MM-DDTHH:MM
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// CampaignModal Component
export default function CampaignModal({
  open,
  onClose,
  onSubmit,
  initialData,
}) {
  const [campaignData, setCampaignData] = useState({
    campaignId: "",
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    imageUrl: "",
    uploadImage: "",
    status: "Planificada",
  });

  const [candidates, setCandidates] = useState([]);
  const [approvedCandidates, setApprovedCandidates] = useState([]);
  const [unapprovedCandidates, setUnapprovedCandidates] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (initialData) {
      // Construir la URL de la imagen
      setCampaignData({
        campaignId: initialData.campaign_id || "",
        name: initialData.name || "",
        description: initialData.description || "",
        startDate: formatDate(initialData.start_date) || "",
        endDate: formatDate(initialData.end_date) || "",
        imageUrl: "http://localhost:3001" + initialData.image_url,
        uploadImage: "",
        status: initialData.status || "Preparación",
      });
      const allCandidates = initialData.candidates || [];
      setCandidates(allCandidates);

      const approved = allCandidates.filter(
        (candidate) => candidate.is_approved === "true"
      );
      const unapproved = allCandidates.filter(
        (candidate) => candidate.is_approved === "false"
      );

      setApprovedCandidates(approved);
      setUnapprovedCandidates(unapproved);

      // Si estamos editando, seleccionamos "Todas" por defecto
      setSelectedCourses(initialData.courses ? initialData.courses : ["Todas"]);
    } else {
      setCampaignData({
        campaignId: "",
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        imageUrl: "",
        uploadImage: "",
        status: "Planificada",
      });

      setApprovedCandidates([]);
      setUnapprovedCandidates([]);
    }
  }, [initialData]);



  const handleChange = (e) => {
    setCampaignData({
      ...campaignData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(campaignData, approvedCandidates, unapprovedCandidates);

    setCampaignData({
      campaignId: "",
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      imageUrl: "",
      uploadImage: "",
      status: "Planificada",
    });

    setApprovedCandidates([]);
    setUnapprovedCandidates([]);

  };

  const handleApprove = (candidate) => {
    setUnapprovedCandidates(
      unapprovedCandidates.filter(
        (c) => c.candidate_id !== candidate.candidate_id
      )
    );
    setApprovedCandidates([
      ...approvedCandidates,
      { ...candidate, is_approved: "true" },
    ]);
  };

  const handleReject = (candidate) => {
    setApprovedCandidates(
      approvedCandidates.filter(
        (c) => c.candidate_id !== candidate.candidate_id
      )
    );
    setUnapprovedCandidates([
      ...unapprovedCandidates,
      { ...candidate, is_approved: "false" },
    ]);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    // Optionally, you can also create a URL object to preview the image
    if (file) {
      setCampaignData({
        ...campaignData,
        imageUrl: URL.createObjectURL(file),
        uploadImage: file,
      });
    }
  };

  const formatDateOverlay = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate); // Convertir a formato ISO
    const end = new Date(endDate);

    if (now < start) {
      return `Inicia: ${start.toLocaleDateString()}`;
    } else if (now > end) {
      return `Finalizó: ${end.toLocaleDateString()}`;
    }
    return `Finaliza: ${end.toLocaleDateString()}`;
  };






  const [selectedCourses, setSelectedCourses] = useState([]);

 
  const handleCoursesChange = (event, newValue) => {
    if (newValue.includes("Todas")) {
      // Si se selecciona "Todas", reemplaza las demás selecciones solo con "Todas"
      setSelectedCourses(["Todas"]);
    } else {
      // Si se seleccionan carreras individuales, excluye "Todas"
      setSelectedCourses(newValue.filter((course) => course !== "Todas"));
    }
  };


  return (
    <StyledDialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {initialData ? "Editar Campaña" : "Crear Nueva Campaña"}
        </DialogTitle>
        <DialogContent>
          <StyledTextField
            margin="dense"
            id="name"
            name="name"
            label="Nombre de la Campaña"
            fullWidth
            value={campaignData.name}
            onChange={handleChange}
            required
          />
          <StyledTextField
            margin="dense"
            id="description"
            name="description"
            label="Descripción"
            fullWidth
            value={campaignData.description}
            onChange={handleChange}
            required
          />
          <StyledTextField
            margin="dense"
            id="startDate"
            name="startDate"
            label="Fecha de Inicio"
            type="datetime-local"
            fullWidth
            value={campaignData.startDate}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
          />
          <StyledTextField
            margin="dense"
            id="endDate"
            name="endDate"
            label="Fecha de Finalización"
            type="datetime-local"
            fullWidth
            value={campaignData.endDate}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
          />


<Autocomplete
          multiple
          id="select-courses"
          options={courses}
          value={selectedCourses}
          onChange={handleCoursesChange}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={index}
                label={option}
                {...getTagProps({ index })}
                color="primary"
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Carreras Participantes"
              placeholder="Selecciona las carreras"
            />
          )}
        />

          {/* Image Upload Section */}
          <Section>
            <input
              accept="image/*"
              id="upload-image"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <label htmlFor="upload-image">
              <StyledButtonModal
                variant="contained"
                color="primary"
                component="span"
              >
                Cargar Imagen de la campaña
              </StyledButtonModal>
            </label>

            <StyledCardAdmin>
              <CardActionArea>
                <ImageAdmin image={campaignData.imageUrl} />
                <DateOverlayAdmin>
                  {formatDateOverlay(
                    campaignData.startDate,
                    campaignData.endDate
                  )}
                </DateOverlayAdmin>
              </CardActionArea>
              <CardContentAdmin>
                <CardTitleAdmin>{campaignData.name}</CardTitleAdmin>
                <CardDescriptionAdmin>
                  {campaignData.description}
                </CardDescriptionAdmin>
              </CardContentAdmin>
              <CardFooterAdmin></CardFooterAdmin>
            </StyledCardAdmin>
          </Section>

          {/* Candidate Selection Section */}
          <ContainerModal>
            <Section>
              <Title variant="h6">Candidatos No Aprobados</Title>
              <GridContainer>
                {unapprovedCandidates.length > 0 ? (
                  unapprovedCandidates.map((candidate) => (
                    <StyledCardModal key={candidate.candidate_id}>
                      {candidate.profile_picture_url  ? (
                        <StyledCardMedia
                          component="img"
                          image={`http://localhost:3001${candidate.profile_picture_url}`}
                          alt={`${candidate.first_name} ${candidate.last_name}`}
                        />
                      ) : (
                        // Mostrar placeholder si no hay imagen
                        <CardMedia
                        component="img"
                          image="http://localhost:3001/uploads/profileDefault/profileDefault.jpg"
                        />
                       
                      
                      )}

                      <CardContent>
                        <Typography variant="h7">
                          {candidate.first_name} {candidate.last_name}
                        </Typography>
                      </CardContent>
                      <StyledCardActions>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleApprove(candidate)}
                        >
                          Aprobar
                        </Button>
                      </StyledCardActions>
                    </StyledCardModal>
                  ))
                ) : (
                  <Typography variant="body2">
                    No hay candidatos por aprobar.
                  </Typography>
                )}
              </GridContainer>
            </Section>

            <Section>
              <Title variant="h6">Candidatos Aprobados</Title>
              <GridContainer>
                {approvedCandidates.length > 0 ? (
                  approvedCandidates.map((candidate) => (
                    <StyledCardModal key={candidate.candidate_id}>


                    {candidate.profile_picture_url  ? (
                        <StyledCardMedia
                          component="img"
                          image={`http://localhost:3001${candidate.profile_picture_url}`}
                          alt={`${candidate.first_name} ${candidate.last_name}`}
                        />
                      ) : (
                        // Mostrar placeholder si no hay imagen
                        <CardMedia
                        component="img"
                          image="http://localhost:3001/uploads/profileDefault/profileDefault.jpg"
                        />
                       
                      
                      )}


                      <CardContent>
                        <Typography variant="h6">
                          {candidate.first_name} {candidate.last_name}
                        </Typography>
                      </CardContent>
                      <StyledCardActions>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => handleReject(candidate)}
                        >
                          Rechazar
                        </Button>
                      </StyledCardActions>
                    </StyledCardModal>
                  ))
                ) : (
                  <Typography variant="body2">
                    No hay candidatos aprobados.
                  </Typography>
                )}
              </GridContainer>
            </Section>
          </ContainerModal>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancelar
          </Button>
          <Button type="submit" color="primary" >
            {initialData ? "Guardar Cambios" : "Crear"}
          </Button>
        </DialogActions>
      </form>
    </StyledDialog>
  );
}

 // Ejemplo de opciones de carreras universitarias
 const courses = [
  "Todas",
  "Ingeniería de Sistemas", "Derecho", "Medicina", "Arquitectura", "Psicología", "Administración de Empresas",
  "Ingeniería Industrial", "Contabilidad", "Economía", "Marketing", "Ciencias Políticas", "Biotecnología",
  "Química", "Física", "Matemáticas", "Historia", "Geografía",
   "Ingeniería Electrónica", "Ingeniería Mecánica",
  "Ingeniería Eléctrica", "Ingeniería Civil", "Ingeniería Química", "Relaciones Internacionales",
  "Trabajo Social", "Periodismo", "Diseño Gráfico", 
  "Negocios Internacionales",  "Agronomía", "Veterinaria", "Enfermería", "Fisioterapia",
   "Geología",
  "Filosofía", "Teología", "Odontología", "Ciencias Ambientales", "Criminología", "Logística",
  "Ingeniería en Telecomunicaciones", "Bioquímica", "Genética", "Ciencias del Deporte", "Ingeniería en Sistemas de Información",
  "Ingeniería en Software", "Ciencias Forenses", "Estadística",  
  // Puedes agregar más si es necesario
   // Opción especial
];



