import { CardActionArea } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
  DateOverlay,
  Grid,
  Image,
  Main,
  Section,
  SkeletonButton,
  SkeletonCard,
  SkeletonDescription,
  SkeletonImage,
  SkeletonTitle,
  StyledButton,
  StyledCard,
  StyledLink,
  Title,
} from "./Styledcomponents/StyledMainComponets";
import { formatDateOverlay } from "../../utilities/functions";

const ActiveCampaigns = () => {
  // Local state to store active campaigns
  const [localCampaigns, setLocalCampaigns] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  // Fetch active campaigns from the backend when the component mounts
  useEffect(() => {
    axios
      .post("http://localhost:3001/fetchActiveCampaigns") // API call to fetch campaigns
      .then((response) => {
        if (response.data.success) {
          setLocalCampaigns(response.data.results); // Update state with campaigns
          setLoading(false); // Stop loading once data is fetched
        } else {
          setLoading(false); // Stop loading even if no data is available
        }
      })
      .catch((error) => {
        console.error("Error fetching campaigns:", error); // Handle error case
        setLoading(false); // Stop loading on error
      });
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  // Function to format the campaign name to be URL-friendly
  const formatCampaignName = (name) => {
    return encodeURIComponent(name.replace(/\s+/g, "-").toLowerCase());
  };

  // Function to return a voting button with a formatted campaign link
  const getButton = (campaignId, campaignName) => {
    const formattedName = formatCampaignName(campaignName); // Format the campaign name

    return (
      <StyledLink to={`/voting/${formattedName}/${campaignId}`}>
        <StyledButton>Votar ahora</StyledButton>
      </StyledLink>
    );
  };

  return (
    <Main>
      <Section>
        <Title>Campañas activas</Title> {/* Display the section title */}
        <Grid>
          {loading ? ( // Show skeleton loading UI if data is still being fetched
            Array.from(new Array(4)).map((_, index) => (
              <SkeletonCard key={index}>
                <SkeletonImage variant="rectangular" />
                <CardContent>
                  <SkeletonTitle variant="text" />
                  <SkeletonDescription variant="text" />
                  <SkeletonDescription variant="text" width="80%" />
                </CardContent>
                <CardFooter>
                  <SkeletonButton variant="rectangular" />
                </CardFooter>
              </SkeletonCard>
            ))
          ) : localCampaigns.length > 0 ? ( // If campaigns are available, display them
            localCampaigns.map((campaign) => (
              <StyledCard key={campaign.campaign_id}>
                <CardActionArea>
                  {/* Display campaign image */}
                  <Image
                    image={`http://localhost:3001${
                      campaign.image_url && campaign.image_url.trim() !== ""
                        ? campaign.image_url
                        : "/uploads/profileDefault/campaignDefault.jpg"
                    }`}
                  />
                  <DateOverlay>
                    {/* Display start and end dates as overlay */}
                    {formatDateOverlay(campaign.start_date, campaign.end_date)}
                  </DateOverlay>
                </CardActionArea>
                <CardContent>
                  <CardTitle>{campaign.name}</CardTitle> {/* Display campaign name */}
                  <CardDescription>{campaign.description}</CardDescription> {/* Display campaign description */}
                </CardContent>
                <CardFooter>
                  {getButton(campaign.campaign_id, campaign.name)} {/* Render voting button */}
                </CardFooter>
              </StyledCard>
            ))
          ) : (
            <p>No campaigns available.</p> // Display message if no campaigns are found
          )}
        </Grid>
      </Section>
    </Main>
  );
};

export default ActiveCampaigns;
