import Footer from "../../components/Footer/footer";
import NavBar from "../../components/NavBar/NavBar";
import { Container } from "../../components/styledComponets/Containers/Containers";
import ThemeProvider from "../../components/styledComponets/Theme/ThemeProvider";
import ActiveCampaigns from "./ActiveCampaigns";
import FinishedCampaigns from "./FinishedCampaigns";
import UpcomingCampaigns from "./UpcomingCampaigns";

const Dashboard = () => {




  return (
    <ThemeProvider>
      <NavBar />
      <Container>
        <ActiveCampaigns />
        <UpcomingCampaigns />
        <FinishedCampaigns />
      </Container>
      <Footer />
    </ThemeProvider>
  );
};
export default Dashboard;
