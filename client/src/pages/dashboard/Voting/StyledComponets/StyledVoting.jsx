import { Alert, Button, Skeleton } from "@mui/material";
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