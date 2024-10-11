import { CardActionArea } from '@mui/material'; // Importing CardActionArea for creating interactive card elements
import axios from 'axios'; // Importing axios for making HTTP requests
import { useEffect, useState } from 'react'; // Importing React hooks for managing state and side effects
import { formatCampaignName, formatDateOverlay } from '../../utilities/functions'; // Importing utility functions for formatting campaign names and dates
import { CardContent, CardDescription, CardFooter, CardTitle, DateOverlay, Grid, Image, Main, Section, SkeletonButton, SkeletonCard, SkeletonDescription, SkeletonImage, SkeletonTitle, StyledCard, StyledLink, Title, ViewCampaignButton } from './Styledcomponents/StyledMainComponets'; // Importing styled components for layout and styling

const UpcomingCampaigns = () => {
  const [localCampaigns, setLocalCampaigns] = useState([]); // State to hold the upcoming campaigns
  const [loading, setLoading] = useState(true); // State to manage loading status

  // Fetch upcoming campaigns from the backend API when the component mounts
  useEffect(() => {
    axios.post('http://localhost:3001/fetchUpcomingCampaigns') // API call to fetch upcoming campaigns
      .then(response => {
        if (response.data.success) {
          setLocalCampaigns(response.data.results); // Update state with the results if successful
          setLoading(false); // Stop loading when data is fetched
        } else {
          setLoading(false); // Stop loading if the request was not successful
        }
      })
      .catch(error => {
        console.error('Error fetching campaigns:', error); // Log error if the API call fails
        setLoading(false); // Stop loading on error
      });
  }, []); // Empty dependency array to run effect only on initial mount

  // Function to create a button for viewing campaign details
  const getButton = (campaignId, campaignName) => {
    const formattedName = formatCampaignName(campaignName); // Format the campaign name for the URL

    return (
      <StyledLink to={`/voting/${formattedName}/${campaignId}`} >
        <ViewCampaignButton>ver detalles</ViewCampaignButton> {/* Button for viewing campaign details */}
      </StyledLink>
    );
  };

  return (
    <Main>
      <Section>
        <Title>Proximas Campañas</Title> {/* Title for the upcoming campaigns section */}
        <Grid>
          {loading ? ( // Check if data is loading
            Array.from(new Array(4)).map((_, index) => ( // Render skeleton loading cards
              <SkeletonCard key={index}> {/* Added key for React list rendering */}
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
          ) : localCampaigns.length > 0 ? ( // If there are campaigns to display
            localCampaigns.map((campaign) => ( // Map through the campaigns to render them
              <StyledCard key={campaign.campaign_id}> {/* Added key for React list rendering */}
                <CardActionArea>
                  <Image
                    image={`http://localhost:3001${
                      campaign.image_url && campaign.image_url.trim() !== "" // Check if campaign image URL is valid
                        ? campaign.image_url // Use provided image URL
                        : "/uploads/profileDefault/campaignDefault.jpg" // Fallback image if not available
                    }`}
                  />
                  <DateOverlay>
                    {formatDateOverlay(campaign.start_date, campaign.end_date)} {/* Overlay showing campaign dates */}
                  </DateOverlay>
                </CardActionArea>
                <CardContent>
                  <CardTitle>{campaign.name}</CardTitle> {/* Display campaign name */}
                  <CardDescription>{campaign.description}</CardDescription> {/* Display campaign description */}
                </CardContent>
                <CardFooter>
                  {getButton(campaign.campaign_id, campaign.name)} {/* Render button to view details */}
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

export default UpcomingCampaigns; // Exporting the UpcomingCampaigns component
