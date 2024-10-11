import { TextField } from "@mui/material";
import styled from "styled-components";

export const Container = styled.article`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`;

export const StyledForm = styled.form`
width: 25%;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  backdrop-filter: blur(100px);
  background-color: ${(props) => props.theme.backgroundContainer};
  margin: 10% 0;

      /* Pantallas de escritorio grandes */
      @media screen and (max-width: 1024px) {
 
}

/* Pantallas de tablets */
@media screen and (max-width: 768px) {
  width: 80%;
 
 

}

/* Pantallas móviles */
@media screen and (max-width: 480px) {
 width: 95%;
}

`;

export const StyledBox = styled.div`
    margin: 10px 0;
    
  
`
export const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 8px;
    width: auto;
    margin: 0 8px;

    & fieldset {
      border-color: #d9d9d9;
      transition: border-color 0.3s;
    }

    &:hover fieldset {
      border-color: #c0c0c0;
    }

    &.Mui-focused fieldset {
      border-color: #1976d2; /* Color del borde cuando el campo está enfocado */
      box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2); /* Sombra al enfocar */
    }

    input {
      text-align: center;
      font-size: 18px;
      padding: 10px 12px;
    }
  }

  & .MuiInputBase-input {
    padding: 0;
    height: 1.6em; /* Ajusta esto según tus necesidades */
    font-size: 1.25em; /* Ajusta el tamaño de la fuente */
  }
`;


