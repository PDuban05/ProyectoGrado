import { FooterContainer, LinksContainer, LogoContainer, RightsText, StyledContainer, StyledLink } from './StyledComponent/Container';


const Footer = () => {
  return (
    <FooterContainer>
      <StyledContainer>
        
        {/* Primer Contenedor */}
        <LogoContainer>
          <img src="https://firebasestorage.googleapis.com/v0/b/prueba-4dd37.appspot.com/o/votayalogo.png?alt=media&token=733bf5d9-6eb6-4568-9a90-0ce9e3a018e3" alt="VotaOnline Logo" />
          <RightsText variant="h6">VotaOnline</RightsText>
        </LogoContainer>
        
        {/* Segundo Contenedor */}
        <LinksContainer>
          <StyledLink href="/about">Sobre Nosotros</StyledLink>
          <StyledLink href="/services">Servicios</StyledLink>
          <StyledLink href="/contact">Contacto</StyledLink>
        </LinksContainer>
        
        {/* Tercer Contenedor */}
        <RightsText>
          © 2024 Todos los derechos reservados para VotaOnline.
        </RightsText>

      </StyledContainer>
    </FooterContainer>
  );
};

export default Footer;

