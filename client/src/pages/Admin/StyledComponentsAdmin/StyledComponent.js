import { Box, Button, Card, CardActions, CardMedia, Dialog, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";

export const StyledCard = styled(Card)`
  && {
    width: 100%;
    margin: auto;
    padding: 20px 0 0 0;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

export const StyledButton = styled(Button)`
  && {
    background-color: #1976d2;
    color: white;
    font-weight: bold;
    &:hover {
      background-color: #1565c0;
    }
  }
`;

export const SearchBar = styled(TextField)`
  && {
    .MuiOutlinedInput-root {
      background-color: rgba(255, 255, 255, 0.7);
    }
  }
`;

export const CampaignTitle = styled(Typography)`
  && {
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 24px;
    color: #04192e;
  }
`;

export const StyledBox = styled(Box)`
  && {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;
  }
`;

export const Container = styled(Box)`
  && {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 10%;
  }
`;

// Contenedor de la tabla
export const TableContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;
  overflow-x: auto; /* Permitir scroll horizontal si el contenido excede el ancho */
  overflow-y: hidden;

  /* Breakpoints para hacer la tabla responsiva */
  @media (max-width: 1024px) {
    .MuiDataGrid-root {
      font-size: 14px; /* Reducir el tamaño del texto en pantallas medianas */
    }
  }

  @media (max-width: 768px) {
    .MuiDataGrid-root {
      font-size: 12px; /* Reducir aún más el tamaño del texto en pantallas pequeñas */
    }

    .MuiDataGrid-columnHeader {
      display: none; /* Opción para ocultar headers si es necesario en pantallas móviles */
    }
  }

  @media (max-width: 480px) {
    .MuiDataGrid-root {
      font-size: 10px; /* Texto pequeño para dispositivos móviles */
    }
  }
`;

export const DataGridContainer = styled(DataGrid)`
  && {
    width: 100%;
    height: auto;

    /* Asegurarse de que el DataGrid sea completamente responsivo */
  @media (max-width: 1024px) {
    .MuiDataGrid-columnHeaderTitle {
      font-size: 0.875rem; /* Ajusta el tamaño del texto en la cabecera */
    }
  }

  @media (max-width: 768px) {
    .MuiDataGrid-columnHeaderTitle {
      font-size: 0.75rem; /* Aún más pequeño para tablets */
    }
  }

  @media (max-width: 480px) {
    .MuiDataGrid-columnHeaderTitle {
      font-size: 0.65rem; /* Pequeño para pantallas de móviles */
    }
  }

  }`;




// Styled components
export const StyledDialog = styled(Dialog)`
  && {
    border: 1px solid red;
    .MuiPaper-root {
      background: rgba(255, 255, 255, 0.9);
      border-radius: 16px;
    }
  }
`;

export const StyledTextField = styled(TextField)`
  && {
    .MuiOutlinedInput-root {
      border-radius: 8px;
    }
  }
`;

export const ContainerModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
`;

export const Section = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
`;

export const StyledCardModal = styled(Card)`
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

export const StyledCardMedia = styled(CardMedia)`
  && {
    height: 100%;
  }
`;

export const StyledCardActions = styled(CardActions)`
  && {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
   
  }
`;

export const Title = styled(Typography)`
  && {
    font-weight: bold;
    margin-bottom: 16px;
  }
`;

export const StyledButtonModal = styled(Button)`
  && {
    margin: 10px 0;
  }
`;





  
