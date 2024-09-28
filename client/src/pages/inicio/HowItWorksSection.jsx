import styled from 'styled-components';
import PersonIcon from '@mui/icons-material/Person';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import BarChartIcon from '@mui/icons-material/BarChart';

const SectionWrapper = styled.section`
  padding: 5rem 0; /* py-20 */
  
  @media (min-width: 768px) {
    padding: 8rem 0; /* md:py-32 */
  }
`;

const Container = styled.div`
  margin: 0 auto; /* mx-auto */
  padding: 0 1.5rem; /* px-4 */
 
  @media (min-width: 768px) {
    padding: 0 1.5rem; /* md:px-6 */
  }
`;

const Title = styled.h2`
  font-size: 2.1rem; /* text-3xl */
  font-weight: bold;
  color: #1f2937; /* text-gray-900 */
  margin-bottom: 2rem; /* mb-8 */
  
  @media (min-width: 768px) {
    font-size: 2.25rem; /* md:text-4xl */
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem; /* gap-8 */
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr); /* md:grid-cols-3 */
  }
`;

const GridItem = styled.div`
  background-color: #ffffff; /* bg-white */
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); /* shadow-lg */
  padding: 20px 20px 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const IconWrapper = styled.div`
  width: 3.5rem; /* Ajuste del tamaño del icono */
  height: 4rem;
  color: #1f2937; /* text-gray-900 */
  margin-bottom: 1rem; /* mb-4 */

  /* Aplicar tamaño a los íconos hijos */
  svg {
    width: 100%;
    height: 100%;
  }
`;

const GridItemTitle = styled.h3`
  font-size: 1.25rem; /* text-xl */
  font-weight: bold;
  color: #1f2937; /* text-gray-900 */
  margin-bottom: 0.5rem; /* mb-2 */
`;

const GridItemText = styled.p`
  color: #4b5563; /* text-gray-600 */
`;

const HowItWorksSection = () => {
  return (
    <SectionWrapper>
      <Container>
        <Title>Cómo funciona</Title>
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
