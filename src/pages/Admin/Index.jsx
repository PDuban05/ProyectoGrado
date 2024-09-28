import Plus from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Search from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "../../components/NavBar/NavBar";
import ThemeProvider from "../../components/styledComponets/Theme/ThemeProvider";
import Footer from "../../components/Footer/footer";
import CampaignModal from "./Modal";
import axios from "axios";
import { UpdateCampaign, UpdateCandidates } from "../../redux/states/UpdateCampaign";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { CreateCampaign } from "../../redux/states/CreateCampaign";
import { DeleteCampaign } from "../../redux/states/deleteCampaign";
import { CampaignTitle, Container, DataGridContainer, SearchBar, StyledBox, StyledButton, StyledCard, TableContainer } from "./StyledComponentsAdmin/StyledComponent";



export default function Index() {
  const [campaigns, setCampaigns] = useState([]);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const {success,error} = useSelector((state) => state.updateCampaign );
  const createCampaign = useSelector((state) => state. createCampaign );

  

  // Fetch campaigns from the server
  useEffect(() => {
    axios
      .post("http://localhost:3001/fetchCampaignsAdmin")
      .then((response) => {
        if (response.data.success) {
          setCampaigns(
            response.data.campaigns.map((campaign) => ({
              ...campaign,
              votes: campaign.voters.length,
              status: formatDateOverlay(campaign.start_date, campaign.end_date), // Calculate the number of votes
              // Other necessary fields
            }))
          );
        } else {
          console.log("Error fetching campaigns:", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching campaigns:", error);
      });

      
  }, [success, createCampaign.success]);

  const formatDateOverlay = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate.replace(" ", "T")); // Convertir a formato ISO
    const end = new Date(endDate.replace(" ", "T")); // Convertir a formato ISO

    if (now < start) {
      return `Preparación`;
    } else if (now > end) {
      return `Finalizada`;
    }
    return `Activa`;
  };

  const handleCreateCampaign = (newCampaign) => {
    setCampaigns([
      ...campaigns,
      { ...newCampaign, campaign_id: campaigns.length + 1 },
    ]);
    setOpenDialog(false);


    dispatch(CreateCampaign(newCampaign))

   
  };



  const baseUrl = 'http://localhost:3001';
  const handleUpdateCampaign = async (
    updatedCampaign,
    approvedCandidates,
    unapprovedCandidates
  ) => {
    // Actualizar el estado de las campañas en base al ID de la campaña

 
    setCampaigns((prevCampaigns) =>
      prevCampaigns.map((campaign) => {
        if (campaign.campaign_id === updatedCampaign.campaignId) {
          // Actualiza todos los campos de la campaña con los valores de updatedCampaign
          return {
            ...campaign,
            name: updatedCampaign.name,
            description: updatedCampaign.description,
            start_date: updatedCampaign.startDate,
            end_date: updatedCampaign.endDate,
            image_url: updatedCampaign.imageUrl.replace(baseUrl, '')
          };
        }
        return campaign;
      })
    );
    // Restablecer la campaña en edición y cerrar el diálogo
    setEditingCampaign(null);
    setOpenDialog(false);

    console.log("Updated Campaign:", updatedCampaign);
    

    dispatch(UpdateCandidates(approvedCandidates,unapprovedCandidates))
    // Verificar si hay una imagen seleccionada para subir
    if (updatedCampaign.uploadImage != "") {
      try {
        // Crear un FormData para enviar la imagen al servidor
        const imageData = new FormData();
        imageData.append("file", updatedCampaign.uploadImage);
        console.log("Image Data:", imageData);

        // Realizar la solicitud para subir la imagen
        const uploadResponse = await axios.post(
          `http://localhost:3001/upload/${updatedCampaign.campaignId}/campaign`,
          imageData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Upload Response:", uploadResponse);

        if (uploadResponse.data.success) {
          // Actualizar el campo 'imageUrl' en el objeto updatedCampaign
          const imageUrl = uploadResponse.data.imageUrl;
          const updatedCampaignWithImage = {
            ...updatedCampaign, // Mantener las propiedades actuales de la campaña
            imageUrl: imageUrl, // Actualizar solo el campo imageUrl
          };

          setCampaigns((prevCampaigns) =>
            prevCampaigns.map((campaign) => {
              if (campaign.campaign_id === updatedCampaign.campaignId) {
                return {
                  ...campaign,
                  image_url: uploadResponse.data.imageUrl,
                };
              }
              return campaign;
            })
          );
          console.log("Updated Campaign with Image:", updatedCampaignWithImage);

          // Si tienes alguna acción para actualizar la campaña en el backend, despáchala aquí.
          dispatch(UpdateCampaign(updatedCampaignWithImage));
        } else {
          console.error(
            "Error al subir la imagen:",
            uploadResponse.data.message
          );
        }
      } catch (error) {
        console.error("Error al subir la imagen:", error);
      }
    } else {

      const updateCampaign = {
        ...updatedCampaign,
        imageUrl: updatedCampaign.imageUrl.replace(baseUrl, '')
      };

      console.log(updateCampaign)

      dispatch(UpdateCampaign(updateCampaign));
    }
  };




  const handleDeleteCampaign = (id) => {


    Swal.fire({
      title: "¿Estas seguro que quieres eliminar esta campaña",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      icon: "warning",

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Eliminado", "", "success");
        setCampaigns(campaigns.filter((c) => c.campaign_id !== id));
        dispatch(DeleteCampaign(id))

      } 
    });

    
    console.log(id)



  };

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { field: "name", headerName: "Nombre", flex: 1 },
    {
      field: "votes",
      headerName: "Participantes",
      flex: 1,
    },
    { field: "status", headerName: "Estado", flex: 1 },
    {
      field: "actions",
      headerName: "Acciones",
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              setEditingCampaign(params.row);
              setOpenDialog(true);
            }}
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteCampaign(params.row.campaign_id)}
          >
            <Delete />
          </IconButton>
        </>
      ),
      flex: 1,
    },
  ];


  useEffect(() => {
    if (success || createCampaign.success) {
      // Abrir el modal
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
        title: "Cambios realizados correctamente"
      });

    
    
   
      
      
    }else if(error != null){

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
        title: "Algo no a ido como se esperaba"
      });
    }
  }, [error, success, createCampaign.success])

  return (
    <ThemeProvider>
    <NavBar />
    <Container>
      <StyledCard>
        <CampaignTitle>Dashboard de Campañas</CampaignTitle>
        <CardContent>
          <StyledBox>
            <StyledButton
              variant="contained"
              color="primary"
              onClick={() => {
                setOpenDialog(true);
                setEditingCampaign(null);
              }}
              startIcon={<Plus />}
            >
              Nueva Campaña
            </StyledButton>
            <SearchBar
              variant="outlined"
              label="Buscar campañas"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </StyledBox>

          {/* Contenedor de la tabla */}
          <TableContainer>
            <DataGridContainer
              rows={filteredCampaigns}
              getRowId={(row) => row.campaign_id}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              autoHeight
            />
          </TableContainer>
        </CardContent>
      </StyledCard>

      <CampaignModal
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={
          editingCampaign ? handleUpdateCampaign : handleCreateCampaign
        }
        initialData={editingCampaign}
      />
    </Container>
    <Footer />
  </ThemeProvider>
  );
}
