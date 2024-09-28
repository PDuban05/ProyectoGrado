import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import VerificationModal from "../pages/dashboard/Verificate/ModalVerifity";

const Guard = () => {
  const isAuthenticated = useSelector((state) => state.passrecover.codeVerificationSuccess);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
export default Guard;


export const EmailSentGuard = () => {
  const isEmailSent = useSelector((state) => state.passrecover.success); // Verifica si el código fue enviado correctamente
  return isEmailSent ? <Outlet /> : <Navigate to="/login" />; // Redirige si el código no fue enviado
};

export const GuardVerificode = () => {
  const isEmailSent = useSelector((state) => state.auth.success); // Verifica si el código fue enviado correctamente
  return isEmailSent ? <Outlet /> : <Navigate to="/login" />; // Redirige si el código no fue enviado
};


export const ProfileGuard = () => {
  const isAuth = useSelector((state) => state.auth.success);
  // Verifica si el código fue enviado correctamente
  return isAuth ? <Outlet /> : <Navigate to="/login" />;

};

export const CandidateGuard = () => {
  const isAuth = useSelector((state) => state.auth.success);
  const { user } = useSelector((state) => state.auth);

  // Si no está autenticado, redirige al login
  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  // Si está autenticado pero no verificado, mostramos el modal
  if (user.isVerified !== 1) {
    return <VerificationModal />;
  }

  // Si está autenticado y verificado, permite el acceso a la ruta
  return <Outlet />;
};