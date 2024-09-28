
import Footer from "../../components/Footer/footer";
import NavBar from "../../components/NavBar/NavBar";
import { Container } from "../../components/styledComponets/Containers/Containers";
import ThemeProvider from "../../components/styledComponets/Theme/ThemeProvider";
import HowItWorksSection from "./HowItWorksSection";
import MainContent from "./MainContent"

const Inicio = () => {
  

  return (
    <ThemeProvider>
      <NavBar />
      <Container>
      <MainContent/>
      <HowItWorksSection/> 

      </Container>
      <Footer/>
    </ThemeProvider>
  );
};

export default Inicio;
