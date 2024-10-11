import { CardActionArea } from '@mui/material'; // Importing CardActionArea component from Material UI for interactive card areas
import axios from 'axios'; // Importing axios for making HTTP requests
import { useEffect, useState } from 'react'; // Importing React hooks for state and side effects
import { formatCampaignName, formatDateOverlay } from '../../utilities/functions'; // Importing utility functions for formatting
import { CardContent, CardDescription, CardFooter, CardTitle, DateOverlay, Grid, Image, Main, Section, SkeletonButton, SkeletonCard, SkeletonDescription, SkeletonImage, SkeletonTitle, StyledCard, StyledLink, Title, ViewCampaignButton } from './Styledcomponents/StyledMainComponets'; // Importing styled components for UI layout

const FinishedCampaigns = () => {
  const [localCampaigns, setLocalCampaigns] = useState([]); // State to hold finished campaigns
  const [loading, setLoading] = useState(true); // State to manage loading status

  // Fetch finished campaigns from the backend API on component mount
  useEffect(() => {
    axios.post('http://localhost:3001/fetchFinishedCampaigns') // API call to fetch finished campaigns
      .then(response => {
        if (response.data.success) {
          setLocalCampaigns(response.data.results); // Update local state with fetched campaigns
          setLoading(false); // Stop loading when data is fetched
        } else {
          setLoading(false); // Stop loading if the request was not successful
        }
      })
      .catch(error => {
        console.error('Error fetching campaigns:', error); // Log error if API call fails
        setLoading(false); // Stop loading on error
      });
  }, []); // Empty dependency array to run effect only on mount

  // Function to generate a button for viewing campaign results
  const getButton = (campaignId, campaignName) => {
    const formattedName = formatCampaignName(campaignName); // Format the campaign name for the URL

    return (
      <StyledLink to={`/voting/${formattedName}/${campaignId}`} >
        <ViewCampaignButton>ver resultados</ViewCampaignButton> {/* Button for viewing results */}
      </StyledLink>
    );
  };

  return (
    <Main>
      <Section>
        <Title>Campañas Finalizadas</Title> {/* Title for finished campaigns section */}
        <Grid>
          {loading ? ( // Check if loading data
            Array.from(new Array(4)).map((_, index) => ( // Create skeleton placeholders
              <SkeletonCard key={index}> {/* Added key here for React list rendering */}
                <SkeletonImage variant="rectangular" /> {/* Placeholder for image */}
                <CardContent>
                  <SkeletonTitle variant="text" /> {/* Placeholder for title */}
                  <SkeletonDescription variant="text" /> {/* Placeholder for description */}
                  <SkeletonDescription variant="text" width="80%" /> {/* Placeholder for additional description */}
                </CardContent>
                <CardFooter>
                  <SkeletonButton variant="rectangular" /> {/* Placeholder for button */}
                </CardFooter>
              </SkeletonCard>
            ))
          ) : localCampaigns.length > 0 ? ( // If campaigns are available
            localCampaigns.map((campaign) => ( // Map through campaigns and render them
              <StyledCard key={campaign.campaign_id}> {/* Added key here for React list rendering */}
                <CardActionArea>
                  <Image
                    image={`http://localhost:3001${
                      campaign.image_url && campaign.image_url.trim() !== "" // Check if image URL is valid
                        ? campaign.image_url // Use the provided image URL
                        : "/uploads/profileDefault/campaignDefault.jpg" // Fallback image
                    }`}
                  />
                  <DateOverlay>
                    {formatDateOverlay(campaign.start_date, campaign.end_date)} {/* Overlay displaying campaign dates */}
                  </DateOverlay>
                </CardActionArea>
                <CardContent>
                  <CardTitle>{campaign.name}</CardTitle> {/* Display the campaign name */}
                  <CardDescription>{campaign.description}</CardDescription> {/* Display the campaign description */}
                </CardContent>
                <CardFooter>
                  {getButton(campaign.campaign_id, campaign.name)} {/* Render button to view results */}
                </CardFooter>
              </StyledCard>
            ))
          ) : (
            <p>No campaigns available.</p> // Message displayed if no campaigns are found
          )}
        </Grid>
      </Section>
    </Main>
  );
};

export default FinishedCampaigns; // Exporting the FinishedCampaigns component