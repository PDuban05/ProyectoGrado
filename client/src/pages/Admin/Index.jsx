import Plus from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Search from "@mui/icons-material/Search";
import {
  CardContent,
  IconButton,
  InputAdornment
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Footer from "../../components/Footer/footer";
import NavBar from "../../components/NavBar/NavBar";
import ThemeProvider from "../../components/styledComponets/Theme/ThemeProvider";
import { CreateCampaign } from "../../redux/states/CreateCampaign";
import { DeleteCampaign } from "../../redux/states/deleteCampaign";
import { UpdateCampaign, UpdateCandidates } from "../../redux/states/UpdateCampaign";
import CampaignModal from "./Modal";
import { CampaignTitle, Container, DataGridContainer, SearchBar, StyledBox, StyledButton, StyledCard, TableContainer } from "./StyledComponentsAdmin/StyledComponent";



export default function Index() {
  const [campaigns, setCampaigns] = useState([]); // State to hold the list of campaigns
  const [editingCampaign, setEditingCampaign] = useState(null); // State for tracking the currently edited campaign
  const [searchTerm, setSearchTerm] = useState(""); // State for search functionality
  const [openDialog, setOpenDialog] = useState(false); // State to control opening/closing of the modal dialog
  const dispatch = useDispatch(); // Used for dispatching Redux actions
  const { success, error } = useSelector((state) => state.updateCampaign); // Selecting success and error states from the Redux store for campaign updates
  const createCampaign = useSelector((state) => state.createCampaign); // Selecting the create campaign state from Redux

  // Fetch campaigns from the server when the component mounts and also when 'success' or 'createCampaign.success' changes
  useEffect(() => {
    axios
      .post("http://localhost:3001/fetchCampaignsAdmin")
      .then((response) => {
        if (response.data.success) {
          // Map each campaign and add fields such as votes and status based on start/end date
          setCampaigns(
            response.data.campaigns.map((campaign) => ({
              ...campaign,
              votes: campaign.voters.length, // Calculating number of votes
              status: formatDateOverlay(campaign.start_date, campaign.end_date), // Determining campaign status based on dates
            }))
          );
        } else {
          console.log("Error fetching campaigns:", response); // Log error if the fetch was not successful
        }
      })
      .catch((error) => {
        console.error("Error fetching campaigns:", error); // Handle any errors in the request
      });
  }, [success, createCampaign.success]); // Re-run effect if 'success' or 'createCampaign.success' changes

  // Helper function to determine campaign status based on current date, start, and end date
  const formatDateOverlay = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate.replace(" ", "T")); // Convert start date to ISO format
    const end = new Date(endDate.replace(" ", "T")); // Convert end date to ISO format

    // Return different statuses based on whether the campaign has started, ended, or is active
    if (now < start) {
      return `Preparación`; // Campaign hasn't started yet
    } else if (now > end) {
      return `Finalizada`; // Campaign has ended
    }
    return `Activa`; // Campaign is currently active
  };

  // Handler for creating a new campaign, updating the state and triggering the modal close
  const handleCreateCampaign = (newCampaign) => {
    setCampaigns([
      ...campaigns,
      { ...newCampaign, campaign_id: campaigns.length + 1 }, // Add new campaign with a generated ID
    ]);
    setOpenDialog(false); // Close the modal dialog
    dispatch(CreateCampaign(newCampaign)); // Dispatch Redux action to create campaign
  };

  const baseUrl = 'http://localhost:3001';

  // Handler for updating campaign information, including updating approved/unapproved candidates and images
  const handleUpdateCampaign = async (
    updatedCampaign,
    approvedCandidates,
    unapprovedCandidates
  ) => {
    // Update the campaign list in the state by matching the campaign_id
    setCampaigns((prevCampaigns) =>
      prevCampaigns.map((campaign) => {
        if (campaign.campaign_id === updatedCampaign.campaignId) {
          // Update all fields with new data
          return {
            ...campaign,
            name: updatedCampaign.name,
            description: updatedCampaign.description,
            start_date: updatedCampaign.startDate,
            end_date: updatedCampaign.endDate,
            image_url: updatedCampaign.imageUrl.replace(baseUrl, ''), // Remove base URL for consistency
          };
        }
        return campaign;
      })
    );

    setEditingCampaign(null); // Reset editing state
    setOpenDialog(false); // Close the dialog

    console.log("Updated Campaign:", updatedCampaign);

    // Dispatch Redux action to update candidates
    dispatch(UpdateCandidates(approvedCandidates, unapprovedCandidates));

    // Check if an image is selected for uploading
    if (updatedCampaign.uploadImage !== "") {
      try {
        // Create FormData to send the image file to the server
        const imageData = new FormData();
        imageData.append("file", updatedCampaign.uploadImage); // Append the image file
        console.log("Image Data:", imageData);

        // Upload the image to the server
        const uploadResponse = await axios.post(
          `http://localhost:3001/upload/${updatedCampaign.campaignId}/campaign`,
          imageData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set headers for file upload
            },
          }
        );

        console.log("Upload Response:", uploadResponse);

        if (uploadResponse.data.success) {
          const imageUrl = uploadResponse.data.imageUrl; // Get new image URL from the response
          const updatedCampaignWithImage = {
            ...updatedCampaign, // Keep all current fields
            imageUrl: imageUrl, // Update the imageUrl field
          };

          setCampaigns((prevCampaigns) =>
            prevCampaigns.map((campaign) => {
              if (campaign.campaign_id === updatedCampaign.campaignId) {
                return {
                  ...campaign,
                  image_url: uploadResponse.data.imageUrl, // Update the image_url
                };
              }
              return campaign;
            })
          );
          console.log("Updated Campaign with Image:", updatedCampaignWithImage);

          dispatch(UpdateCampaign(updatedCampaignWithImage)); // Dispatch action to update campaign in backend
        } else {
          console.error("Error uploading the image:", uploadResponse.data.message); // Handle error in uploading
        }
      } catch (error) {
        console.error("Error uploading the image:", error); // Catch and log any errors in upload process
      }
    } else {
      // If no image is uploaded, update the campaign without changing the imageUrl
      const updateCampaign = {
        ...updatedCampaign,
        imageUrl: updatedCampaign.imageUrl.replace(baseUrl, ''),
      };

      dispatch(UpdateCampaign(updateCampaign)); // Dispatch Redux action to update campaign without new image
    }
  };

  // Handler for deleting a campaign by its ID
  const handleDeleteCampaign = (id) => {
    Swal.fire({
      title: "¿Estas seguro que quieres eliminar esta campaña", // Confirmation message for deletion
      showCancelButton: true,
      confirmButtonText: "Eliminar", // Button for confirmation
      icon: "warning", // Warning icon for visual feedback
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado", "", "success"); // Success message upon deletion
        setCampaigns(campaigns.filter((c) => c.campaign_id !== id)); // Remove the campaign from the state
        dispatch(DeleteCampaign(id)); // Dispatch Redux action to delete the campaign
      }
    });
  };

  // Filter campaigns based on search term entered by user
  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Search by name
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) // Search by description
  );

  // Table columns for displaying campaign data
  const columns = [
    { field: "name", headerName: "Nombre", flex: 1 }, // Campaign name
    { field: "votes", headerName: "Participantes", flex: 1 }, // Number of participants
    { field: "status", headerName: "Estado", flex: 1 }, // Campaign status (preparation, active, finished)
    {
      field: "actions",
      headerName: "Acciones",
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              setEditingCampaign(params.row); // Set the campaign to be edited
              setOpenDialog(true); // Open the dialog for editing
            }}
          >
            <Edit /> {/* Icon to edit campaign */}
          </IconButton>
          <IconButton
            onClick={() => handleDeleteCampaign(params.row.campaign_id)} // Handle campaign deletion
          >
            <Delete /> {/* Icon to delete campaign */}
          </IconButton>
        </>
      ),
      flex: 1,
    },
  ];

  // Show a success or error notification when success or error state changes
  useEffect(() => {
    if (success || createCampaign.success) {
      // Show success message using SweetAlert
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000, // Notification duration
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer; // Pause timer when mouse hovers
          toast.onmouseleave = Swal.resumeTimer; // Resume timer when mouse leaves
        },
      });
      Toast.fire({
        icon: "success",
        title: "Cambios realizados correctamente", // Message for successful changes
      });
    } else if (error != null) {
      // Show error message if there's an error
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000, // Notification duration
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "Error al realizar los cambios", // Message for error
      });
    }
  }, [success, createCampaign.success, error]); // Re-run the effect if any of these states change

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

{/* open modal */}

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
