import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  CardMedia,
  CardActionArea,
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

// Styled components
const StyledDialog = styled(Dialog)`
  && {
    border: 1px solid red;
    .MuiPaper-root {
      background: rgba(255, 255, 255, 0.9);
      border-radius: 16px;
    }
  }
`;

const StyledTextField = styled(TextField)`
  && {
    .MuiOutlinedInput-root {
      border-radius: 8px;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
`;

const Section = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
`;

const StyledCard = styled(Card)`
  && {
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 16px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden; // Ensure media content doesn't overflow
    display: flex;
    flex-direction: column;
    justify-content: space-between;

  }
`;

const StyledCardMedia = styled(CardMedia)`
  && {
    height: 100%;
  }
`;

const StyledCardActions = styled(CardActions)`
  && {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
   
  }
`;

const Title = styled(Typography)`
  && {
    font-weight: bold;
    margin-bottom: 16px;
  }
`;

const StyledButton = styled(Button)`
  && {
    margin: 10px 0;
  }
`;

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

      console.log(initialData);

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
              <StyledButton
                variant="contained"
                color="primary"
                component="span"
              >
                Cargar Imagen de la campaña
              </StyledButton>
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
          <Container>
            <Section>
              <Title variant="h6">Candidatos No Aprobados</Title>
              <GridContainer>
                {unapprovedCandidates.length > 0 ? (
                  unapprovedCandidates.map((candidate) => (
                    <StyledCard key={candidate.candidate_id}>
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
                    </StyledCard>
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
                    <StyledCard key={candidate.candidate_id}>


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
                    </StyledCard>
                  ))
                ) : (
                  <Typography variant="body2">
                    No hay candidatos aprobados.
                  </Typography>
                )}
              </GridContainer>
            </Section>
          </Container>
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
