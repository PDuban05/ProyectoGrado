import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../../components/Footer/footer";
import NavBar from "../../components/NavBar/NavBar";
import { StyledButton } from "../../components/styledComponets/Bottons/botton";
import { Container, StyledBox, StyledForm, StyledTextField } from "../../components/styledComponets/Containers/Containers";
import { Text2, Text4 } from "../../components/styledComponets/Text/Text";
import ThemeProvider from "../../components/styledComponets/Theme/ThemeProvider";
import { verifyUser } from "../../redux/states/AuthUser";
import { verifyCode } from "../../redux/states/RecoverPass";
import { StyledDivForm, StyledFooterForm } from "../Register/StyledComponets/containerForm";

const InputCode = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Usar useNavigate para la navegación
  const { codeVerificationError, codeVerificationSuccess } = useSelector((state) => state.passrecover);
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);
  const { success } = useSelector((state) => state.auth);

  const handleChange = (index) => (e) => {
    const value = e.target.value;

    // Permitir solo un dígito
    if (value.length > 1 || isNaN(value)) return;

    // Actualizar el estado con el valor del campo
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    // Mover el foco al siguiente campo si existe
    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index) => (e) => {
    if (e.key === "Backspace" && codes[index] === "") {
      if (index > 0) {
        const newCodes = [...codes];
        newCodes[index - 1] = "";
        setCodes(newCodes);
        inputs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = (e) => {




    e.preventDefault();
    const code = codes.join("");
    dispatch(verifyCode({ code }));
  };

  useEffect(() => {

    if(codeVerificationSuccess && success){
   

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Te has verificado con exito",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        navigate("/campañas");
      });

      dispatch(verifyUser())


    }


    else if (codeVerificationSuccess) {
      navigate("/inputnewpassword");
    }




  }, [codeVerificationSuccess, navigate]);

  return (
    <ThemeProvider>
      <NavBar />
      <Container>
        <StyledForm onSubmit={handleSubmit}>
          <StyledDivForm>
            <Text2>Insertar código</Text2>
            <StyledBox style={{ display: "flex", justifyContent: "space-between" }}>
              {codes.map((code, index) => (
                <StyledTextField
                  key={index}
                  value={code}
                  onChange={handleChange(index)}
                  onKeyDown={handleKeyDown(index)}
                  type="text"
                  inputProps={{ maxLength: 1 }}
                  fullWidth
                  required
                  error={!!codeVerificationError}
                  helperText={codeVerificationError && index === 5 ? "El código es inválido" : ""}
                  inputRef={(el) => (inputs.current[index] = el)}
                />
              ))}
            </StyledBox>
            <StyledButton type="submit">Enviar</StyledButton>
          </StyledDivForm>

          <StyledFooterForm>
            <Text4>Escribe el código que fue enviado a tu correo</Text4>
          </StyledFooterForm>
        </StyledForm>
      </Container>
      <Footer/>
    </ThemeProvider>
  );
};

export default InputCode;
