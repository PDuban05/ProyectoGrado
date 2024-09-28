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

const ContainerLink = styled.nav`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 50px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

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

const StyledMenu = styled(Menu)`
  && {
    margin-top: 0px;
    .MuiPaper-root {
      border-radius: 12px;
    }
  }
`;

const NavBar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [IsLoading, setLoading] = useState(true);
  const [profilePicture, setProfilePicture] = useState("/placeholder.svg");

  const handleScroll = () => {
    const position = window.pageYOffset;
    setShowNavbar(scrollPosition > position || position === 0);
    setScrollPosition(position);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const handleBeCandidate = () => {

    navigate("/serCandidato");
  };
  const handleProfileClick = () => {
    setAnchorEl(null); // Cierra el menú
    navigate("/perfil"); // Redirige a la ruta "/perfil"
  };

  const { user, success } = useSelector((state) => state.auth);





  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  useEffect(() => {
    // Obtener token de localStorage
    let token = localStorage.getItem("authToken");

    // Si no existe en localStorage, intenta buscar en sessionStorage
    if (!token || token === "null" || token === "undefined") {
      token = sessionStorage.getItem("authToken");
    }

    // Si el token existe en alguno de los dos lugares, lo inicializamos


    console.log(token)
    dispatch(initializeToken(token));

  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setLoading(false);
      setProfilePicture(`http://localhost:3001${user.profilePicture}`);

    } else {
      setLoading(true)
    }
  }, [user, success]);

  console.log(user.role)

  return (
    <StyledAppBar>
      <Collapse orientation="vertical" in={showNavbar}>
        <StyledToolbar>
          <Slide direction="down" in={showNavbar}>
            <Content>
              <Link to='/'>
                <ContainerLogo>
                  <StyledImg src="https://firebasestorage.googleapis.com/v0/b/prueba-4dd37.appspot.com/o/votayalogo.png?alt=media&token=733bf5d9-6eb6-4568-9a90-0ce9e3a018e3" alt="VotaOnline Logo" />
                  <TextIco variant="h6">VotaOnline</TextIco>
                </ContainerLogo>
              </Link>

              <ContainerMenu>
                <ContainerLink>
                  {/* Verifica si el usuario no es "admin" antes de mostrar el enlace "SerCandidato" */}
                  {user.role !== "admin" ? (
                    <>
                      <StyledLink to='/serCandidato'>SerCandidato</StyledLink>
                    </>
                  ) : (
                    // Si el rol es "admin", muestra el enlace para "Ver campañas"
                    <StyledLink to='/Campañas'>Ver campañas</StyledLink>
                  )}
                </ContainerLink>


                {!IsLoading ? (
                  <>
                    <AvatarButton
                      onClick={handleMenuClick}
                      aria-controls={open ? 'avatar-menu' : undefined}
                      aria-haspopup="true"
                    >
                      <Avatar src={profilePicture} />
                    </AvatarButton>
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
                      {/* Oculta la opción "Ser candidato" si el rol es "admin" */}
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
