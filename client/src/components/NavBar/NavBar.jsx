import { Collapse, Slide, Avatar, Menu, MenuItem, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StyledButton2 } from "../styledComponets/Bottons/botton";
import { StyledImg } from "../styledComponets/Icons/Icons";
import { StyledLink, TextIco } from "../styledComponets/Text/Text";
import {
  ContainerLogo,
  ContainerMenu,
  Content,
  StyledAppBar,
  StyledToolbar
} from "./styledComponets/Container";
import { useDispatch, useSelector } from "react-redux";
import { initializeToken, logout } from "../../redux/states/AuthUser";

// Styles for the navigation links container, hidden on smaller screens
const ContainerLink = styled.nav`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 50px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

// Custom button for the Avatar, ensuring it has no shadow and rounded shape
const AvatarButton = styled(Button)`
  && {
    padding: 0;
    border-radius: 50%;
    box-shadow: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

// Styling for the menu, adding custom margins and border radius
const StyledMenu = styled(Menu)`
  && {
    margin-top: 0px;
    .MuiPaper-root {
      border-radius: 12px;
    }
  }
`;

const NavBar = () => {
  // State to manage the visibility of the Navbar on scroll
  const [showNavbar, setShowNavbar] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // State to manage the anchor element for the menu (Avatar click)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl); // Boolean to check if the menu is open
  
  // Navigation hook from react-router-dom
  const navigate = useNavigate();
  
  // Dispatch function from Redux
  const dispatch = useDispatch();
  
  // State to manage loading status and user profile picture
  const [IsLoading, setLoading] = useState(true);
  const [profilePicture, setProfilePicture] = useState("/placeholder.svg");

  // Handle the scroll event to show/hide Navbar based on scroll position
  const handleScroll = () => {
    const position = window.pageYOffset;
    setShowNavbar(scrollPosition > position || position === 0);
    setScrollPosition(position);
  };

  // Handle when Avatar is clicked to open the menu
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the Avatar menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Logout function, clears the auth state and navigates to home
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Function to navigate to the "Be a candidate" page
  const handleBeCandidate = () => {
    navigate("/serCandidato");
  };

  // Navigate to profile page when profile option is clicked
  const handleProfileClick = () => {
    setAnchorEl(null); // Close the menu
    navigate("/perfil"); // Navigate to "/perfil"
  };

  // Getting the user and authentication success state from Redux
  const { user, success } = useSelector((state) => state.auth);

  // Effect to listen to the scroll event and adjust Navbar visibility
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  // Effect to initialize the token from either localStorage or sessionStorage
  useEffect(() => {
    // Get token from localStorage
    let token = localStorage.getItem("authToken");

    // If token doesn't exist in localStorage, check sessionStorage
    if (!token || token === "null" || token === "undefined") {
      token = sessionStorage.getItem("authToken");
    }

    // Initialize token if found in any storage
    dispatch(initializeToken(token));
  }, [dispatch]);

  // Effect to manage loading state and update the profile picture once authentication is successful
  useEffect(() => {
    if (success) {
      setLoading(false);
      setProfilePicture(`http://localhost:3001${user.profilePicture}`);
    } else {
      setLoading(true);
    }
  }, [user, success]);

  return (
    <StyledAppBar>
      {/* Collapse the navbar based on scrolling */}
      <Collapse orientation="vertical" in={showNavbar}>
        <StyledToolbar>
          <Slide direction="down" in={showNavbar}>
            <Content>
              {/* Link to home page */}
              <Link to='/'>
                <ContainerLogo>
                  <StyledImg src="https://firebasestorage.googleapis.com/v0/b/prueba-4dd37.appspot.com/o/votayalogo.png?alt=media&token=733bf5d9-6eb6-4568-9a90-0ce9e3a018e3" alt="VotaOnline Logo" />
                  <TextIco variant="h6">VotaOnline</TextIco>
                </ContainerLogo>
              </Link>

              <ContainerMenu>
                <ContainerLink>
                  {/* Check if user exists and has a valid role */}
                  {user && user.role ? (
                    <>
                      {/* Show "SerCandidato" if the user is not an admin */}
                      {user.role !== "admin" ? (
                        <StyledLink to='/serCandidato'>SerCandidato</StyledLink>
                      ) : (
                        // If the user is an admin, show "Ver campañas"
                        <StyledLink to='/Campañas'>Ver campañas</StyledLink>
                      )}
                    </>
                  ) : null}

                    <StyledLink to='/verificarVoto'>Verificar voto</StyledLink>
                </ContainerLink>

                {/* Check loading status before showing Avatar */}
                {!IsLoading ? (
                  <>
                    {/* Avatar button for opening the menu */}
                    <AvatarButton
                      onClick={handleMenuClick}
                      aria-controls={open ? 'avatar-menu' : undefined}
                      aria-haspopup="true"
                    >
                      <Avatar src={profilePicture} />
                    </AvatarButton>

                    {/* Avatar menu with options */}
                    <StyledMenu
                      id="avatar-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleMenuClose}
                      PaperProps={{
                        style: {
                          marginTop: 5,
                          borderRadius: '10px',
                        },
                      }}
                    >
                      <MenuItem onClick={handleProfileClick}>Perfil</MenuItem>
                      {/* Hide "Ser candidato" option if the user is an admin */}
                      {user.role !== "admin" && (
                        <MenuItem onClick={handleBeCandidate}>Ser candidato</MenuItem>
                      )}
                      <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                    </StyledMenu>
                  </>
                ) : (
                  <StyledButton2>
                    <Link to='/login'>Iniciar Sesión</Link>
                  </StyledButton2>
                )}
              </ContainerMenu>
            </Content>
          </Slide>
        </StyledToolbar>
      </Collapse>
    </StyledAppBar>
  );
};

export default NavBar;
