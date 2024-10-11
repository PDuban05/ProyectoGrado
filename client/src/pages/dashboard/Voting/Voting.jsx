import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Footer from '../../../components/Footer/footer';
import NavBar from '../../../components/NavBar/NavBar';
import ThemeProvider from '../../../components/styledComponets/Theme/ThemeProvider';
import { ResetState } from '../../../redux/states/VoteSlice';
import CountdownTimer from './CountdownTimer';
import {
  Card2,
  Main
} from './StyledComponets/StyledVoting';
import VotingCampaign from './VotingCampaigns';
import EndingCampaign from './EndingCampaign';

const CampaignOverview = () => {
  const { campaignId } = useParams();
  const [campaignData, setCampaignData] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((store) => store.auth);
  const vote = useSelector((store) => store.vote);
  const dispatch = useDispatch();

  useEffect(() => {
    if (campaignId  && user.user) {

     
      const userId = user.user.id
      
      axios.post('http://localhost:3001/fetchCampaigns', { campaignId: campaignId, userId: userId })
        .then(response => {
          if (response.data.success) {
            setCampaignData(response.data);
            setLoading(false);

            console.log(response)
          } else {
            console.error(response.data.message);
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching campaigns:', error);
          setLoading(false);
        });
    }
  }, [campaignId, user, vote.success]);

  useEffect(() => {
    if (vote.success) {
      Swal.fire({
        icon: 'success',
        title: 'El voto se ha efectuado con éxito',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });

      dispatch(ResetState());
    } else if (vote.error) {
      Swal.fire({
        icon: 'error',
        title: 'Algo no ha ido como se esperaba',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  }, [vote.error, vote.success]);

  // Función para verificar si la campaña ha terminado
  const isCampaignEnded = () => {
    if (!campaignData || !campaignData.campaign || !campaignData.campaign.end_date) {
      return false;
    }
    const endDate = new Date(campaignData.campaign.end_date);
    const now = new Date();
    return endDate < now;
  };

  return (
    <ThemeProvider>
      <NavBar />
      <Main>
        {!loading && campaignData && campaignData.campaign && (
          <Card2>
            <Typography variant="h3" color="initial">
              {campaignData.campaign.name}
            </Typography>
            <Typography variant="h6" color="initial">
              {campaignData.campaign.description}
            </Typography>

            <CountdownTimer
              startDate={campaignData.campaign.start_date}
              endDate={campaignData.campaign.end_date}
            />
          </Card2>
        )}

        {loading && (
          <Typography variant="h6" color="initial">Cargando campaña...</Typography>
        )}

        {campaignData && !loading && (
          isCampaignEnded() 
            ? <EndingCampaign campaignData={campaignData} />
            : <VotingCampaign campaignData={campaignData} />
        )}
      </Main>
      <Footer />
    </ThemeProvider>
  );
};

export default CampaignOverview;
