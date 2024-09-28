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

const ActiveCampaigns = () => {
  const [localCampaigns, setLocalCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post("http://localhost:3001/fetchActiveCampaigns")
      .then((response) => {
        if (response.data.success) {
          setLocalCampaigns(response.data.results);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching campaigns:", error);
        setLoading(false);
      });
  }, []);

  const formatDateOverlay = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate.replace(" ", "T")); // Convertir a formato ISO
    const end = new Date(endDate.replace(" ", "T")); // Convertir a formato ISO

    if (now < start) {
      return `Inicia: ${start.toLocaleDateString()}`;
    } else if (now > end) {
      return `Finalizó: ${end.toLocaleDateString()}`;
    }
    return `Finaliza: ${end.toLocaleDateString()}`;
  };

  const formatCampaignName = (name) => {
    return encodeURIComponent(name.replace(/\s+/g, "-").toLowerCase());
  };

  const getButton = (campaignId, campaignName) => {
    const formattedName = formatCampaignName(campaignName);

    return (
      <StyledLink to={`/voting/${formattedName}/${campaignId}`}>
        <StyledButton>Vote Now</StyledButton>
      </StyledLink>
    );
  };
  return (
    <Main>
      <Section>
        <Title>Campañas activas</Title>
        <Grid>
          {loading ? (
            Array.from(new Array(4)).map((_, index) => (
              <SkeletonCard key={index}>
                {" "}
                {/* Added key here */}
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
              <StyledCard key={campaign.campaign_id}>
                {" "}
                {/* Added key here */}
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

export default ActiveCampaigns;
