import Footer from "../../components/Footer/footer"; // Importing the Footer component for displaying the footer section
import NavBar from "../../components/NavBar/NavBar"; // Importing the NavBar component for navigation
import { Container } from "../../components/styledComponets/Containers/Containers"; // Importing a styled Container for layout
import ThemeProvider from "../../components/styledComponets/Theme/ThemeProvider"; // Importing ThemeProvider for theming support
import ActiveCampaigns from "./ActiveCampaigns"; // Importing ActiveCampaigns component to show ongoing campaigns
import FinishedCampaigns from "./FinishedCampaigns"; // Importing FinishedCampaigns component to show completed campaigns
import UpcomingCampaigns from "./UpcomingCampaigns"; // Importing UpcomingCampaigns component to show upcoming campaigns

const Dashboard = () => { // Dashboard component definition

  return (
    <ThemeProvider> {/* Wrapping the dashboard in the ThemeProvider for consistent theming */}
      <NavBar /> {/* Rendering the navigation bar */}
      <Container> {/* Rendering the main container for the dashboard content */}
        <ActiveCampaigns /> {/* Rendering the ActiveCampaigns component */}
        <UpcomingCampaigns /> {/* Rendering the UpcomingCampaigns component */}
        <FinishedCampaigns /> {/* Rendering the FinishedCampaigns component */}
      </Container>
      <Footer /> {/* Rendering the footer */}
    </ThemeProvider>
  );
};

export default Dashboard; // Exporting the Dashboard component
