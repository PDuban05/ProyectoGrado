import { Box, Card, CardHeader } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const MainContentWrapper = styled.main`
  flex: 1;
  width: 100%;
`;

export const ContentSection = styled.section`
  background-color: #f5f5f5; /* color gris claro */
  padding: 20vh 15%;
  width: 100%; 


      /* Pantallas de escritorio grandes */
      @media screen and (max-width: 1024px) {
 
}

/* Pantallas de tablets */
@media screen and (max-width: 768px) {
padding: 12vh 15px;

}

/* Pantallas móviles */
@media screen and (max-width: 480px) {
  /* flex-direction: column; */
  /* padding: 0 2%; */
  /* justify-content: flex-start; */
}
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px; /* espaciado entre elementos */
  align-items: center;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const ContentBox = styled.div`
  align-items: center;
  
`;

export const Title = styled.h1`
  font-size: 3rem; /* Tamaño de fuente para el título */
  margin-bottom: 16px; /* Espaciado debajo del título */
  color: #011224; /* Color del texto */
`;

export const Paragraph = styled.p`
  margin-bottom: 24px; /* Espaciado debajo del párrafo */
  font-size: 1.125rem; /* Tamaño de fuente para el párrafo */
  color: #555; /* Color del texto */
`;

export const StyledLink = styled(Link)`
  text-decoration: none; /* Eliminar subrayado del enlace */
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  background-color: #011224; /* Color del botón */
  color: white; /* Color del texto del botón */
  padding: 11px 20px;
  border-radius: 6px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Transición de 0.3 segundos */

  &:hover {
    background-color: #1565c0; /* Color del botón al pasar el cursor */
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom right, rgba(0, 0, 0, 0.5), transparent);
  border-radius: 8px;
`;

export const StyledImg = styled.img`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);


      /* Pantallas de escritorio grandes */
      @media screen and (max-width: 1024px) {
 
}

/* Pantallas de tablets */
@media screen and (max-width: 768px) {
 height: auto;

}

/* Pantallas móviles */
@media screen and (max-width: 480px) {
  /* flex-direction: column; */
  /* padding: 0 2%; */
  /* justify-content: flex-start; */
}
`;


export const SectionWrapper = styled.section`
  padding: 5rem 0; /* py-20 */
  
  @media (min-width: 768px) {
    padding: 8rem 0; /* md:py-32 */
  }
`;

export const Container = styled.div`
  margin: 0 auto; /* mx-auto */
  padding: 0 1.5rem; /* px-4 */
 
  @media (min-width: 768px) {
    padding: 0 1.5rem; /* md:px-6 */
  }
`;

export const TitleHome = styled.h2`
  font-size: 2.1rem; /* text-3xl */
  font-weight: bold;
  color: #1f2937; /* text-gray-900 */
  margin-bottom: 2rem; /* mb-8 */
  
  @media (min-width: 768px) {
    font-size: 2.25rem; /* md:text-4xl */
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem; /* gap-8 */
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr); /* md:grid-cols-3 */
  }
`;

export const GridItem = styled.div`
  background-color: #ffffff; /* bg-white */
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); /* shadow-lg */
  padding: 20px 20px 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const IconWrapper = styled.div`
  width: 3.5rem; /* Ajuste del tamaño del icono */
  height: 4rem;
  color: #1f2937; /* text-gray-900 */
  margin-bottom: 1rem; /* mb-4 */

  /* Aplicar tamaño a los íconos hijos */
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const GridItemTitle = styled.h3`
  font-size: 1.25rem; /* text-xl */
  font-weight: bold;
  color: #1f2937; /* text-gray-900 */
  margin-bottom: 0.5rem; /* mb-2 */
`;

export const GridItemText = styled.p`
  color: #4b5563; /* text-gray-600 */
`;



// Styled components
export const StyledCard = styled(Card)`
&&{
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.7);

/* Pantallas de tablets */
@media screen and (max-width: 768px) {
margin: 10px 10px;
}

}
 
`;

export const ResultContainer = styled(Box)`
&&{
      margin-top: 16px;
  padding: 16px;
  background-color: #e3f2fd;
  border: 1px solid #90caf9;
  border-radius: 8px;
}

`;

export const TitleContainer = styled(Box)`
&&{
     display: flex;
  align-items: center;
  gap: 8px;
}
 
`;

export const CardHeaderVerify = styled(CardHeader)`
  && {
    background: linear-gradient(90deg, rgba(0, 123, 255, 1) 0%, rgba(75, 0, 130, 1) 100%);
    color: white;
    text-align: center;
    padding: 16px;
  }
`;