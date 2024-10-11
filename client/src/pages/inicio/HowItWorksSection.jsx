import styled from 'styled-components';
import PersonIcon from '@mui/icons-material/Person';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Container, Grid, GridItem, GridItemText, GridItemTitle, IconWrapper, SectionWrapper, TitleHome } from './StyledComponets/HomeContainer';



const HowItWorksSection = () => {
  return (
    <SectionWrapper>
      <Container>
        <TitleHome>Cómo funciona</TitleHome>
        <Grid>
          <GridItem>
            <IconWrapper>
              <PersonIcon />
            </IconWrapper>
            <GridItemTitle>Regístrate</GridItemTitle>
            <GridItemText>Crea una cuenta segura y verifica tu identidad.</GridItemText>
          </GridItem>
          <GridItem>
            <IconWrapper>
              <HowToVoteIcon />
            </IconWrapper>
            <GridItemTitle>Vota</GridItemTitle>
            <GridItemText>Elige tus opciones y emite tu voto de manera segura.</GridItemText>
          </GridItem>
          <GridItem>
            <IconWrapper>
              <BarChartIcon />
            </IconWrapper>
            <GridItemTitle>Resultados</GridItemTitle>
            <GridItemText>Revisa los resultados de las votaciones de manera transparente.</GridItemText>
          </GridItem>
        </Grid>
      </Container>
    </SectionWrapper>
  );
};

export default HowItWorksSection;
