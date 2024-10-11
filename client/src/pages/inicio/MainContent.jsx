import HowToVoteOutlinedIcon from '@mui/icons-material/HowToVoteOutlined';
import { Button, ContentBox, ContentSection, GradientOverlay, GridContainer, ImageContainer, MainContentWrapper, Paragraph, StyledImg, StyledLink, Title } from './StyledComponets/HomeContainer';



const MainContent = () => {


  return (
    <MainContentWrapper>
      <ContentSection>
        <GridContainer>
          <ContentBox>
            <Title>Vota de manera segura y confiable</Title>
            <Paragraph>
              Nuestro sistema de votación en línea te permite participar en decisiones importantes de manera fácil y transparente.
            </Paragraph>
            <StyledLink to="/Campañas">

              <Button>
                <HowToVoteOutlinedIcon style={{ marginRight: '8px' }} />
                Votar ahora
              </Button>
            </StyledLink>
          </ContentBox>
          <ImageContainer>
            <StyledImg src="https://firebasestorage.googleapis.com/v0/b/prueba-4dd37.appspot.com/o/pexels-element5-1550337.jpg?alt=media&token=0afd9c90-c699-4527-855c-20fd3685e10e" alt="Votación" />
            <GradientOverlay />
          </ImageContainer>
        </GridContainer>
      </ContentSection>
    </MainContentWrapper>
  );
};

export default MainContent;
