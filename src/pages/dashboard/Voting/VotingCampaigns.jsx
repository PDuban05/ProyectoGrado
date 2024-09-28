import { CardActionArea, Modal, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VoteAuth } from "../../../redux/states/VoteSlice";
import CandidateModal from "./ModalInfCandidate";
import VotingModal from "./ModalVoting";
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
  StyledButton,
  StyledSkeletonCard,
  StyledSkeletonImage,
  StyledSkeletonText,
} from "./StyledComponets/StyledVoting";

const VotingCampaign = ({ campaignData }) => {
  const [campaignInf, setCampaignInf] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [voteAlert, setVoteAlert] = useState({ type: "", message: "" });
  const navigate = useNavigate();
  const { user, success } = useSelector((store) => store.auth);
  
  const [IsLogin, setIsLogin] = useState(false);
  const [IsAuth, setIsAuth] = useState(0);
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (campaignData) {
      setCampaignInf(campaignData.campaign);
      setCandidates(campaignData.candidates);
      setTotalVotes(campaignData.totalVotes);
      setHasVoted(campaignData.hasVoted);

      setLoading(false);
      setIsLogin(success);
      setIsAuth(user.isVerified);
    }
  }, [campaignData, user]);

  const handleVoteClick = (candidate, isAuth) => {
    const now = new Date();
    const { start_date: startDate, end_date: endDate } = campaignData.campaign;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Verificar el estado de la campaña
    let alertMessage = "";
    let alertType = "";

    if (now > end) {
      alertMessage = "La campaña ya ha finalizado.";
      alertType = "error";
    } else if (now < start) {
      alertMessage = "La campaña aún no ha comenzado.";
      alertType = "";
    } else if (hasVoted) {
      alertMessage = "Ya has votado en esta campaña.";
      alertType = "";
    }

    // Si hay un mensaje de alerta, mostrar el Snackbar
    if (alertMessage) {
      setVoteAlert({ type: alertType, message: alertMessage });
      setOpenSnackbar(true);
    } else {
      // Si no hay alertas, mostrar el modal para votar
      setSelectedCandidate(candidate);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCandidate(null);
  };

  const handleConfirmVote = () => {
    dispatch(VoteAuth({ selectedCandidate, user }));
    handleCloseModal();
  };

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
                          candidate.profile_picture_url && candidate.profile_picture_url.trim() !== ""
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
                      <StyledButton
                        onClick={() => handleVoteClick(candidate, IsAuth)}
                      >
                        Vote
                      </StyledButton>
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

      {/* Modal */}
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="voting-modal-title"
        aria-describedby="voting-modal-description"
      >
        <VotingModal
          isAuth={IsAuth}
          isLogin={IsLogin}
          candidate={selectedCandidate}
          onConfirm={handleConfirmVote}
          onClose={handleCloseModal}
        />
      </Modal>

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

export default VotingCampaign;
