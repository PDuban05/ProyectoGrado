import { CardActionArea } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { formatCampaignName, formatDateOverlay } from '../../utilities/functions';
import { CardContent, CardDescription, CardFooter, CardTitle, DateOverlay, Grid, Image, Main, Section, SkeletonButton, SkeletonCard, SkeletonDescription, SkeletonImage, SkeletonTitle, StyledCard, StyledLink, Title, ViewCampaignButton } from './Styledcomponents/StyledMainComponets';

const UpcomingCampaigns = () => {
  const [localCampaigns, setLocalCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.post('http://localhost:3001/fetchUpcomingCampaigns')
      .then(response => {
        if (response.data.success) {
          setLocalCampaigns(response.data.results);
          setLoading(false);
        } else {

          setLoading(false);
        }
      })
      .catch(error => {
        console.error('Error fetching campaigns:', error);
        setLoading(false);
      });
  }, []);



  const getButton = (campaignId, campaignName) => {
    const formattedName = formatCampaignName(campaignName);

    return (
      <StyledLink to={`/voting/${formattedName}/${campaignId}`} >
        <ViewCampaignButton>view details</ViewCampaignButton>
      </StyledLink>
    );
  };

  return (
    <Main>
      <Section>
        <Title>Proximas Campañas</Title>
        <Grid>
          {loading ? (
            Array.from(new Array(4)).map((_, index) => (
              <SkeletonCard key={index}> {/* Added key here */}
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
          ) : localCampaigns.length > 0 ? (
            localCampaigns.map((campaign) => (
              <StyledCard key={campaign.campaign_id}> {/* Added key here */}
                <CardActionArea>
                <Image
                    image={`http://localhost:3001${
                      campaign.image_url && campaign.image_url.trim() !== ""
                        ? campaign.image_url
                        : "/uploads/profileDefault/campaignDefault.jpg"
                    }`}
                  />
                  <DateOverlay>
                    {formatDateOverlay(campaign.start_date, campaign.end_date)}
                  </DateOverlay>
                </CardActionArea>
                <CardContent>
                  <CardTitle>{campaign.name}</CardTitle>
                  <CardDescription>{campaign.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  {getButton(campaign.campaign_id, campaign.name)}
                </CardFooter>
              </StyledCard>
            ))
          ) : (
            <p>No campaigns available.</p>
          )}
        </Grid>
      </Section>
    </Main>
  );
};

export default UpcomingCampaigns;
