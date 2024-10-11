import ShieldCheckIcon from "@mui/icons-material/Security"; // Importing an icon for security representation
import { CircularProgress } from "@mui/material"; // Importing CircularProgress for loading state
import React, { useEffect, useState } from "react"; // Importing React and necessary hooks
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks for state management
import { useNavigate } from "react-router-dom"; // Importing navigation hook for routing
import Swal from "sweetalert2"; // Importing SweetAlert2 for user alerts
import { resetState, SendCode } from "../../../redux/states/verifity"; // Importing actions from Redux state
import { ActionButton, Footer, ModalBox, ModalDescription, ModalTitle, SpinnerContainer, StyledModal } from "./styledcomponetsVerificate/styledComponentsVerificate"; // Importing styled components

// Verification Modal Component
const VerificationModal = () => {
  const [open, setOpen] = useState(true); // State to manage modal visibility
  const navigate = useNavigate(); // Hook for navigation
  const handleOpen = () => setOpen(true); // Function to open modal
  const handleClose = () => setOpen(false); // Function to close modal
  const dispatch = useDispatch(); // Redux dispatch function
  const { user } = useSelector((state) => state.auth); // Select user information from Redux state
  const { success, error, loading } = useSelector((state) => state.VerifyUser); // Select verification state from Redux

  const handleVerify = () => {
    dispatch(SendCode(user.email)); // Dispatch action to send verification code to user's email
  };

  useEffect(() => {
    if (success) {
      dispatch(resetState()); // Reset verification state upon success
      handleClose(); // Close the modal
      navigate("/VerificarCuenta"); // Navigate to account verification page
    } else if (error != null) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end", // Position of the toast notification
        showConfirmButton: false, // Do not show confirm button
        timer: 3000, // Duration for the toast to be displayed
        timerProgressBar: true, // Show progress bar on the toast
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer; // Stop timer when mouse enters
          toast.onmouseleave = Swal.resumeTimer; // Resume timer when mouse leaves
        },
      });
      Toast.fire({
        icon: "error", // Type of toast notification
        title: "Algo no ha ido como se esperaba" + " - " + error, // Display error message
      });
    }
  }, [success, error, loading]); // Effect to handle side effects based on success, error, and loading state

  const handleCancel = () => {
    console.log("Verificación cancelada"); // Log cancellation
    navigate("/campañas"); // Navigate to campaigns page
    handleClose(); // Close the modal
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
