import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import VerificationModal from "../pages/dashboard/Verificate/ModalVerifity";

/**
 * Guard to protect routes where users must have successfully verified a recovery code.
 * If the verification has not been successful, redirects to the login page.
 * @returns {JSX.Element} - Outlet if authenticated, otherwise Navigate to "/login".
 */
const Guard = () => {
  const isAuthenticated = useSelector((state) => state.passrecover.codeVerificationSuccess); // Check if the user has successfully verified the code
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />; // If verified, render the route, otherwise redirect to login
};

export default Guard;

/**
 * EmailSentGuard checks whether an email with a recovery code was successfully sent.
 * If not, it redirects the user to the login page.
 * @returns {JSX.Element} - Outlet if email was successfully sent, otherwise Navigate to "/login".
 */
export const EmailSentGuard = () => {
  const isEmailSent = useSelector((state) => state.passrecover.success); // Checks if the recovery email was successfully sent
  return isEmailSent ? <Outlet /> : <Navigate to="/login" />; // If email sent, render the route, otherwise redirect to login
};

/**
 * GuardVerificode ensures the user has received a verification code.
 * If the code was not sent successfully, the user will be redirected to the login page.
 * @returns {JSX.Element} - Outlet if email verification was successful, otherwise Navigate to "/login".
 */
export const GuardVerificode = () => {
  const isEmailSent = useSelector((state) => state.auth.success); // Checks if the email verification code was successfully sent
  return isEmailSent ? <Outlet /> : <Navigate to="/login" />; // If code sent, render the route, otherwise redirect to login
};

/**
 * ProfileGuard ensures that a user is authenticated before accessing protected profile routes.
 * @returns {JSX.Element} - Outlet if authenticated, otherwise Navigate to "/login".
 */
export const ProfileGuard = () => {
  const isAuth = useSelector((state) => state.auth.success); // Checks if the user is authenticated
  return isAuth ? <Outlet /> : <Navigate to="/login" />; // If authenticated, render the route, otherwise redirect to login
};

/**
 * CandidateGuard ensures that a user is authenticated and verified before accessing candidate-related routes.
 * If the user is not authenticated, it redirects to the login page.
 * If the user is authenticated but not verified, it shows a verification modal.
 * @returns {JSX.Element} - Outlet if authenticated and verified, otherwise Navigate or VerificationModal.
 */
export const CandidateGuard = () => {
  const isAuth = useSelector((state) => state.auth.success); // Checks if the user is authenticated
  const { user } = useSelector((state) => state.auth); // Access user details from the auth state

  // If not authenticated, redirect to the login page
  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  // If authenticated but not verified, show verification modal
  if (user.isVerified !== 1) {
    return <VerificationModal />;
  }

  // If authenticated and verified, render the route
  return <Outlet />;
};
