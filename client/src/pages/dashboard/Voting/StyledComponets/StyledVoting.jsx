import { Alert, Avatar, Box, Button, CardContent, Dialog, DialogTitle, Skeleton, Typography } from "@mui/material";
import styled, { keyframes } from "styled-components";

export const Main = styled.main`
min-height: 100vh;
  flex: 1;
  padding: 10vh 10%;
  backdrop-filter: blur(10px);
  width: 100%;
 

      /* Pantallas de escritorio grandes */
      @media screen and (max-width: 1024px) {
 
}

/* Pantallas de tablets */
@media screen and (max-width: 768px) {


  padding:10vh  10px 

}

/* Pantallas móviles */
@media screen and (max-width: 480px) {
  /* flex-direction: column; */
  /* padding: 0 2%; */
  /* justify-content: flex-start; */
}


  

`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr ;
  gap: 2rem;
  margin: 0 auto;
  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
  }
`;



export const Card = styled.div`
height: fit-content;
  background-color: rgba(255, 255, 255, 0.8);
  color: #1a202c;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  backdrop-filter: blur(10px);

`;


export const Card2 = styled(Card)`
&&{

display: flex;
flex-direction: column;
margin: 0  auto  2rem auto;
padding:1.5rem ;
width: 100%;
}



    /* Pantallas de escritorio grandes */
    @media screen and (max-width: 1024px) {
 
}

/* Pantallas de tablets */
@media screen and (max-width: 768px) {
  padding: 0 0;
  margin: 0 0;


}

/* Pantallas móviles */
@media screen and (max-width: 480px) {
 
}
`;

export const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const StatCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 1rem;
  padding: 1rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const CardContainer = styled.div`
  padding: 1.5rem;
`;


export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* Por defecto, una columna */
  grid-auto-rows: minmax(auto, max-content);
  gap: 1.5rem;

  




/* Pantallas de tablets */
@media screen and (max-width: 768px) {

  grid-template-columns: 1fr 1fr; /* Dos columnas para pantallas medianas */
}

/* Pantallas móviles */
@media screen and (max-width: 480px) {
  grid-template-columns: 1fr; 

  
}









`;

export const CandidateCard = styled.div`
  background-color: white;
  color: black;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const CardImageContainer = styled.div`
  position: relative;
  height: 10rem;

  @media (min-width: 768px) {
    height: 15rem;
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
`;

export const CardInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 1rem;
  color: white;
`;

export const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
`;

export const CardPosition = styled.p`
  font-size: 0.875rem;
`;

export const CardBody = styled.div`
  padding: 1rem;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;



export const StyledButton = styled(Button)`

&&{
  width: 50%;
  background-color: #011224;
  color: white;
  padding: 0.2rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: #031931;
  } 
}
 
`;


export const StyledSkeletonCard = styled.div`

&&{
     display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
 
`;

export const StyledSkeletonImage = styled(Skeleton)`

&&{
  width: 100%;
  height: 200px;
}

`;

export const StyledSkeletonText = styled(Skeleton)`
&&{
 
 margin: 8px 8px;
 height: 20px;
}

`;


export const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

export const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

export const StyledAlert = styled(Alert)`
  && {
    height: 50px;
    position: fixed;
    left: 50%;
    bottom: ${(props) => props.scrollPosition + 16}px; // Ajusta la posición superior basándote en la posición del scroll
    transform: translateX(-50%);
    background-color: ${(props) =>
      props.severity === 'error'
        ? 'rgba(244, 67, 54, 0.9)' // Rojo con transparencia para error
        : props.severity === 'warning'
        ? 'rgba(255, 193, 7, 0.9)' // Amarillo con transparencia para advertencia
        : 'rgba(76, 175, 80, 0.9)'}; // Verde con transparencia para éxito
    color: white;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation: ${fadeIn} 0.5s ease-in, ${fadeOut} 0.5s ease-out 4s forwards;
    z-index: 10;
    transition: opacity 0.5s ease-out;
  }
`;


export const ContainerClock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);


      /* Pantallas de escritorio grandes */
      @media screen and (max-width: 1024px) {
 
}

/* Pantallas de tablets */
@media screen and (max-width: 768px) {
 
  margin: 0;
  padding: 0 ;
  gap:1rem;

}

/* Pantallas móviles */
@media screen and (max-width: 480px) {
  /* flex-direction: column; */
  /* padding: 0 2%; */
  /* justify-content: flex-start; */
}
`;

export const StyledCountdown = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  /* background-color: rgba(255, 255, 255, 0.7); */
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  /* box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); */
 

       /* Pantallas de escritorio grandes */
       @media screen and (max-width: 1024px) {
 
}

/* Pantallas de tablets */
@media screen and (max-width: 768px) {
  width: 100%;
  padding: 0;
 

}

/* Pantallas móviles */
@media screen and (max-width: 480px) {
  
}
`;

export const TimeBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
  min-width: 70px;

      /* Pantallas de escritorio grandes */
      @media screen and (max-width: 1024px) {
 
}

/* Pantallas de tablets */
@media screen and (max-width: 768px) {



}

/* Pantallas móviles */
@media screen and (max-width: 480px) {
  padding: 0.2rem;
 margin: 0;
  min-width: 30px;
}
`;

export const TimeLabel = styled.span`
  font-size: 0.875rem;
  color: #555;
  margin-top: 0.25rem;
`;
export const WinnerIndicator = styled.div`
  background-color: #f0f0f5; // Color sutil similar a un gris claro
  color: #333; // Color de texto oscuro para buen contraste
  font-size: 0.75rem; // Tamaño de fuente pequeño
  font-weight: 600; // Peso de fuente moderado para ser visible
  padding: 0.25rem 0.5rem; // Espaciado alrededor del texto
  border-radius: 0.5rem; // Bordes redondeados para un look suave
  margin-left: 1rem; // Espacio a la izquierda del texto de votos
  text-transform: uppercase; // Texto en mayúsculas para un toque elegante
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Sombra sutil para un efecto de profundidad
  display: inline-block; // Para que el fondo no se extienda más allá del texto
`;





// Estilos personalizados usando styled-components
export const CustomDialog = styled(Dialog)`
  && {
    .MuiDialog-paper {
      width: 625px;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
    }
  }
`;

export const CustomAvatar = styled(Avatar)`
  && {
    width: 64px;
    height: 64px;
    border: 2px solid #3b82f6;
  }
`;

export const CustomDialogTitle = styled(DialogTitle)`
  && {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 1.5rem;
    font-weight: 600;
    color: #374151;
  }
`;

export const CustomDialogDescription = styled(Typography)`
  && {
    color: #3b82f6;
    font-weight: 500;
    margin-top: 0.25rem;
  }
`;

export const CustomCard = styled(Card)`
  && {
    margin-top: 1rem;
    background: rgba(249, 250, 251, 0.5);
  }
`;

export const CustomCardContent = styled(CardContent)`
  && {
    padding: 16px;
  }
`;

export const BiographyTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #4b5563;
`;

export const BiographyText = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
  white-space: pre-wrap;
`;

export const CustomScrollArea = styled.div`
  max-height: 300px;
  overflow-y: auto;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
`;

export const CloseButton = styled(Button)`
  && {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 10px 0;
    @media (min-width: 640px) {
      width: auto;
    }
  }
`;

export const SocialMediaIcons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 1rem;
`;




// Estilos personalizados para el modal y los elementos del contenido
export const StyledModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 450px;
  height: 200px;
  padding: 20px;
  transform: translate(-50%, -50%);
  background-color: rgb(255, 254, 254);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  border: 1px solid #ffffff;
`;

export const StyledButtonVoting = styled(Button)`
  && {
    margin: 0 5px;
    padding: 8px 16px;
    background-color: rgba(255, 255, 255, 0.5);
    color: #011224;
    border: 1px solid #b3b4b6;
    &:hover {
      background-color: rgba(255, 255, 255, 0.7);
      color: #041d36;
    }
  }
`;

export const ConfirmButton = styled(Button)`
  && {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    font-size: 14px;
    font-weight: 700;
    text-transform: none;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export const RegisterButton = styled(Button)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    background-color: rgba(255, 255, 255, 0.5);
    color: rgb(161, 158, 158); 
    font-weight: 700;
    border: 1px solid #b3b4b6;
    font-size: 14px;
    text-transform: none;
    &:hover {
      background-color: rgba(255, 255, 255, 0.7);
      color: #041d36;
    }
  }
`;

export const StyledBox = styled(Box)`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;

export const StyledContainer = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 35px;
  }
`;

export const StyledTypography = styled(Typography)`
  && {
    font-size: 13.5px;
    font-weight: 600;
    margin: 5px 0 0 0;
    color: rgb(161, 158, 158);
  }
`;

export const StyledTypographyTittle = styled(Typography)`
  && {
    font-weight: 600;
    color: rgba(10, 9, 9, 0.849);
  }
`;