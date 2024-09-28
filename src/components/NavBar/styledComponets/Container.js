import { Select, Toolbar } from "@mui/material";
import styled from "styled-components";

export const StyledAppBar = styled.div`
  && {
    transition: transform 0.3s;
    width: 100%;
    height: 6vh;
    position: fixed;
    z-index: 2;

      /* Pantallas de escritorio grandes */
      @media screen and (max-width: 1024px) {
 
  }

  /* Pantallas de tablets */
  @media screen and (max-width: 768px) {
   width: 100vw;
    margin: 0;
    padding: 0 
  
  }

  /* Pantallas móviles */
  @media screen and (max-width: 480px) {
    /* flex-direction: column; */
    /* padding: 0 2%; */
    /* justify-content: flex-start; */
  }
  }
`;
export const StyledToolbar = styled(Toolbar)`
&&{

  width: 100%;
  height: 100%;
  padding:0 ;
  margin: 0;
  background-color: white;
  backdrop-filter: blur(6px);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;


    /* Pantallas de escritorio grandes */
    @media screen and (max-width: 1024px) {
    padding: 0 10%;
  }

  /* Pantallas de tablets */
  @media screen and (max-width: 768px) {
   display: flex;
    margin: 0;
    padding: 0 
  
  }

  /* Pantallas móviles */
  @media screen and (max-width: 480px) {
    /* flex-direction: column; */
    /* padding: 0 2%; */
    /* justify-content: flex-start; */
  }
}


  

`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 15%;


  /* Pantallas de escritorio grandes */
  @media screen and (max-width: 1024px) {
    padding: 0 10%;
  }

  /* Pantallas de tablets */
  @media screen and (max-width: 768px) {
    /* flex-direction: column; */
    padding: 0 10px;
    /* justify-content: center; */
  }

  /* Pantallas móviles */
  @media screen and (max-width: 480px) {
    /* flex-direction: column; */
    /* padding: 0 2%; */
    /* justify-content: flex-start; */
  }
`;


export const Img = styled.img`
  width: 70px;
  height: 70px;
`;

export const ContainerLogo = styled.div`
  display: flex;
  align-items: center;
  height: 100%;


`;

export const ContainerMenu = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 50px;

  @media screen and (max-width: 768px) {
    gap: 10px;
  }
`;

export const StyledSelect = styled(Select)`
  && {
    .MuiSelect-select {
      font-size: 1rem;
      font-weight: 700;
      color: ${(props) => props.theme.textColor1};
    }

    .MuiOutlinedInput-notchedOutline {
      border-color: transparent;
    }

    .MuiSvgIcon-root {
      fill: ${(props) => props.theme.accent};
    }

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: transparent;
    }

    &:active .MuiOutlinedInput-notchedOutline {
      border-color: transparent;
    }
  }
`;