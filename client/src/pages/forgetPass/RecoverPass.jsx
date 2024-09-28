import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar";
import { StyledButton } from "../../components/styledComponets/Bottons/botton";
import { Container, StyledBox, StyledForm } from "../../components/styledComponets/Containers/Containers";
import { Text2, Text4 } from "../../components/styledComponets/Text/Text";
import ThemeProvider from "../../components/styledComponets/Theme/ThemeProvider";
import { sendVerificationEmail } from "../../redux/states/RecoverPass";
import { StyledDivForm, StyledFooterForm } from "../Register/StyledComponets/containerForm";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/footer";

const RecoverPass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Usar useNavigate para la navegación
  const {  error, success } = useSelector((state) => state.passrecover);
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
    // Despachar la acción y esperar la respuesta
      dispatch(sendVerificationEmail(formData ));
  }


  useEffect(() => {
    if (success) {
     
      navigate("/inputcode")
    }
  }, [success, navigate]);

  useEffect(() => {
    if (error) {
      console.error('Error:', error);
    }
  }, [error]);

  

  return (
    <ThemeProvider>
      <NavBar />
      <Container>
        <StyledForm onSubmit={handleSubmit}>
          <StyledDivForm>
            <Text2>Recuperar contraseña</Text2>
            <StyledBox>
              <TextField
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                fullWidth
                required
                error={!!error}
                helperText={error && "Correo electrónico no registrado"}
              />
            </StyledBox>
            <StyledButton type="submit">Recuperar Contraseña</StyledButton>
          </StyledDivForm>

          <StyledFooterForm>
            <Text4>Se enviará un código a tu correo.</Text4>
          </StyledFooterForm>
        </StyledForm>
      </Container>
      <Footer/>
    </ThemeProvider>
  );
};

export default RecoverPass;
