import { Button, Container, TextField, Typography } from "@mui/material";
import styled from "styled-components";

export const StyledForm = styled.form`

  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  backdrop-filter: blur(100px);
  background-color: ${(props) => props.theme.backgroundContainer};
  padding: 30px;
`;

export const FormField = styled(TextField)`
  && {
    margin-bottom: 20px;
  }
`;

export const StyledContainer = styled(Container)`
  && {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 6% 0 ;

        /* Pantallas de escritorio grandes */
        @media screen and (max-width: 1024px) {
 
}

/* Pantallas de tablets */
@media screen and (max-width: 768px) {

  padding: 10% 0 ;
}

/* Pantallas móviles */
@media screen and (max-width: 480px) {

}




  }
`;

export const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  gap: 5px;
`;

export const FileInput = styled.input`
  display: none;
`;

