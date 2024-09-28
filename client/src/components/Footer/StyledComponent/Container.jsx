import { Typography as MuiTypography } from '@mui/material';
import { Link } from "react-router-dom";
import styled from 'styled-components';

// Estilo para el contenedor principal del Footer
export const FooterContainer = styled.footer`
  background-color: #011224; // Azul
  color: white; // Letras blancas
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  text-align: center;
  width: 100%;

      /* Pantallas de escritorio grandes */
      @media screen and (max-width: 1024px) {
 
}

/* Pantallas de tablets */
@media screen and (max-width: 768px) {
 
 
 

}

/* Pantallas móviles */
@media screen and (max-width: 480px) {

}
 
  
  

  @media (min-width: 768px) {
    flex-direction: row;
    text-align: left;
  }
`;

export const StyledContainer = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row; 
padding :0 20% ;

    /* Pantallas de escritorio grandes */
    @media screen and (max-width: 1024px) {
 
}

/* Pantallas de tablets */
@media screen and (max-width: 768px) {
 width: 100vw;
 padding: 0;
 margin: 0;
 flex-direction: column;
 gap: 10px;
  

}

/* Pantallas móviles */
@media screen and (max-width: 480px) {
 
}

`

// Estilo para el contenedor que contiene el logo y el nombre
export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }

  img {
    width: auto;
    height: 25px;
    margin-right: 8px;
    filter: invert(100%) brightness(200%);
  }
`;

// Estilo para el contenedor de los enlaces
export const LinksContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

// Estilo para los enlaces
export const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// Estilo para el texto de derechos reservados
export const RightsText = styled(MuiTypography)`

  
`;

