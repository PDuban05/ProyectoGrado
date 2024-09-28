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