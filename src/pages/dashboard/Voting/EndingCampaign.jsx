import { CardActionArea, Modal, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CandidateModal from "./ModalInfCandidate";
import {
  CandidateCard,
  Card,
  CardBody,
  CardContainer,
  CardFooter,
  CardGrid,
  CardHeader,
  CardImage,
  CardImageContainer,
  CardInfo,
  CardOverlay,
  CardPosition,
  CardTitle,
  Container,
  StatCard,
  StyledAlert,
  StyledSkeletonCard,
  StyledSkeletonImage,
  StyledSkeletonText,
  WinnerIndicator,
} from "./StyledComponets/StyledVoting";
import axios from "axios";

const EndingCampaign = ({ campaignData }) => {
  const [campaignInf, setCampaignInf] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [voteAlert, setVoteAlert] = useState({ type: "", message: "" });
  const navigate = useNavigate();
  const { user, success } = useSelector((store) => store.auth);

  const [isLogin, setIsLogin] = useState(false);
  const [isAuth, setIsAuth] = useState(0);
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // Para el candidato ganador
  const [winner, setWinner] = useState(null);

  // Cargar los datos iniciales de la campaña
  useEffect(() => {
    if (campaignData) {
      setCampaignInf(campaignData.campaign);
      setCandidates(campaignData.candidates);
      setHasVoted(campaignData.hasVoted);

      setIsLogin(success);
      setIsAuth(user.isVerified);
      setLoading(true); // Iniciar con estado de carga
    }
  }, [campaignData, user, success]);

  // Obtener resultados de votos
  useEffect(() => {
    if (campaignInf) {
      const idCampaign = campaignInf.campaign_id;

      axios.post("http://localhost:3001/resultVotes", { idCampaign })
        .then((response) => {
          if (response.data.success) {
            const voteCount = response.data.voteCount;

            // Calcular el total de votos
            const totalVotes = Object.values(voteCount).reduce((acc, count) => acc + count, 0);

            setTotalVotes(totalVotes);
            setCandidates((prevCandidates) => {
              const updatedCandidates = prevCandidates.map((candidate) => {
                const votes = voteCount[candidate.candidate_id] || 0;
                return {
                  ...candidate,
                  votes,
                };
              });
              return updatedCandidates;
            });
          } else {
            console.error(response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching result:", error);
        })
        .finally(() => {
          setLoading(false); // Finalizar estado de carga
        });
    }
  }, [campaignInf]);

  // Actualizar candidatos y encontrar el ganador cuando el loading es false
  useEffect(() => {
    if (!loading) {
      const topCandidate = candidates.reduce((prev, current) =>
        current.votes > prev.votes ? current : prev
      );
      setWinner(topCandidate);
    }
  }, [loading, candidates]);

  const handleCandidateClick = (candidate) => {
    setSelectedCandidate(candidate);
    setOpenModal(true);
  };

  const handleCloseCandidateModal = () => {
    setOpenModal(false);
    setSelectedCandidate(null);
  };

  return (
    <Container>
      {voteAlert.message && (
        <Snackbar
          open={openSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          onClose={() => setOpenSnackbar(false)}
          autoHideDuration={3000}
          sx={{ width: "100%" }}
        >
          <StyledAlert elevation={6} variant="filled" severity={voteAlert.type}>
            {voteAlert.message}
          </StyledAlert>
        </Snackbar>
      )}

      <Card>
        <CardHeader>
          <Typography variant="h5">Candidatos</Typography>
        </CardHeader>
        <CardContainer>
          {loading ? (
            <CardGrid>
              {Array.from(new Array(4)).map((_, index) => (
                <StyledSkeletonCard key={index}>
                  <StyledSkeletonImage variant="rectangular" />
                  <StyledSkeletonText variant="text" />
                  <StyledSkeletonText variant="text" />
                </StyledSkeletonCard>
              ))}
            </CardGrid>
          ) : (
            <CardGrid>
              {candidates.map((candidate) => (
                <CandidateCard key={candidate.candidate_id}>
                  <CardActionArea
                    onClick={() => handleCandidateClick(candidate)}
                  >
                    <CardImageContainer>
                      <CardImage
                        src={`http://localhost:3001${
                          candidate.profile_picture_url &&
                          candidate.profile_picture_url.trim() !== ""
                            ? candidate.profile_picture_url
                            : "/uploads/profileDefault/profileDefault.jpg"
                        }`}
                      />
                      <CardOverlay />
                      <CardInfo>
                        <CardTitle>
                          {candidate.first_name + " " + candidate.last_name}
                        </CardTitle>
                        <CardPosition>{candidate.campaign_slogan}</CardPosition>
                      </CardInfo>
                    </CardImageContainer>
                  </CardActionArea>
                  <CardBody>
                    <CardFooter>
                      {candidate.votes} votos
                      {winner && candidate.candidate_id === winner.candidate_id && (
                        <WinnerIndicator>Ganador</WinnerIndicator>
                      )}
                    </CardFooter>
                  </CardBody>
                </CandidateCard>
              ))}
            </CardGrid>
          )}
        </CardContainer>
      </Card>

      <Card>
        <CardHeader>
          <Typography variant="h5">Estadísticas</Typography>
        </CardHeader>
        <CardContainer>
          <StatCard>
            <div>
              <Typography variant="h6">Votos totales</Typography>
              <Typography variant="body2">Número de votos emitidos</Typography>
            </div>
            <Typography variant="h5">{totalVotes}</Typography>
          </StatCard>
        </CardContainer>
      </Card>

      <Modal
        open={openModal}
        onClose={handleCloseCandidateModal}
        aria-labelledby="voting-modal-title"
        aria-describedby="voting-modal-description"
      >
        <CandidateModal
          candidate={selectedCandidate}
          setopen={openModal}
          onClose={handleCloseCandidateModal}
        />
      </Modal>
    </Container>
  );
};

export default EndingCampaign;
