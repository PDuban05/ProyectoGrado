import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Modal, Box, Typography, Button, CircularProgress } from "@mui/material";
import ShieldCheckIcon from "@mui/icons-material/Security";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetState, SendCode } from "../../../redux/states/verifity";
import Swal from "sweetalert2";

// Estilos personalizados para el modal y los elementos del contenido
const StyledModal = styled(Modal)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    
  }
`;

const ModalBox = styled(Box)`
  && {
    position: relative;
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    padding: 24px;

    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    outline: none;
  }
`;

const ModalTitle = styled(Typography)`
  && {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
`;

const ModalDescription = styled(Typography)`
  && {
    color: #555;
    margin-top: 16px;
    margin-bottom: 16px;
  }
`;

const ActionButton = styled(Button)`
  && {
    margin-top: 16px;
    &:first-child {
      margin-right: 8px;
    }
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 24px;
`;

// Spinner de carga centrado
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

// Componente Modal de Verificación
const VerificationModal = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { success, error, loading } = useSelector((state) => state.VerifyUser);

  const handleVerify = () => {
    dispatch(SendCode(user.email));
  };

  useEffect(() => {
    if (success) {
      dispatch(resetState());
      handleClose();
      navigate("/VerificarCuenta");
    } else if (error != null) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "Algo no ha ido como se esperaba" + " - " + error,
      });
    }
  }, [success, error, loading]);

  const handleCancel = () => {
    console.log("Verificación cancelada");
    navigate("/campañas");
    handleClose();
  };

  return (
    <>
      <StyledModal
        open={open}
        aria-labelledby="verification-modal-title"
        aria-describedby="verification-modal-description"
      >
        <ModalBox>
          <ModalTitle id="verification-modal-title">
            <ShieldCheckIcon fontSize="large" color="primary" />
            Verificación de Cuenta
          </ModalTitle>
          <ModalDescription>
            Por favor, verifica tu cuenta antes de proceder.
          </ModalDescription>

          {/* Mostrar spinner de carga si loading es true */}
          {loading ? (
            <SpinnerContainer>
              <CircularProgress color="primary" />
            </SpinnerContainer>
          ) : (
            <Footer>
              <ActionButton
                variant="contained"
                color="primary"
                onClick={handleVerify}
              >
                Verificar Cuenta
              </ActionButton>
              <ActionButton
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
              >
                Cancelar
              </ActionButton>
            </Footer>
          )}
        </ModalBox>
      </StyledModal>
    </>
  );
};

export default VerificationModal;
