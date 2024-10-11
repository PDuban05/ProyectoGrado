import { CardActionArea, Modal, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CandidateModal from "./ModalInfCandidate"; // Import the modal component for displaying candidate information
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
} from "./StyledComponets/StyledVoting"; // Import styled components for layout and design
import axios from "axios"; // Import Axios for making HTTP requests

const EndingCampaign = ({ campaignData }) => {
  const [campaignInf, setCampaignInf] = useState(null); // State to hold campaign information
  const [candidates, setCandidates] = useState([]); // State to hold the list of candidates
  const [totalVotes, setTotalVotes] = useState(0); // State to hold the total votes cast
  const [hasVoted, setHasVoted] = useState(false); // State to check if the user has voted
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [voteAlert, setVoteAlert] = useState({ type: "", message: "" }); // State for alerts related to voting
  const navigate = useNavigate(); // Hook for navigation
  const { user, success } = useSelector((store) => store.auth); // Select user and success status from Redux store

  const [isLogin, setIsLogin] = useState(false); // State to check if user is logged in
  const [isAuth, setIsAuth] = useState(0); // State to check if user is verified
  const dispatch = useDispatch(); // Hook to dispatch actions to Redux store
  const [openSnackbar, setOpenSnackbar] = useState(false); // State to control Snackbar visibility

  const [selectedCandidate, setSelectedCandidate] = useState(null); // State to hold selected candidate for modal display
  const [openModal, setOpenModal] = useState(false); // State to control modal visibility

  // For storing the winning candidate
  const [winner, setWinner] = useState(null);

  // Load initial campaign data when component mounts or campaignData changes
  useEffect(() => {
    if (campaignData) {
      setCampaignInf(campaignData.campaign); // Set campaign info
      setCandidates(campaignData.candidates); // Set candidates
      setHasVoted(campaignData.hasVoted); // Check if user has voted

      setIsLogin(success); // Set login state
      setIsAuth(user.isVerified); // Set authentication state
      setLoading(true); // Start loading
    }
  }, [campaignData, user, success]);

  // Fetch voting results when campaign information is available
  useEffect(() => {
    if (campaignInf) {
      const idCampaign = campaignInf.campaign_id; // Get campaign ID

      // Make a POST request to get vote results
      axios.post("http://localhost:3001/resultVotes", { idCampaign })
        .then((response) => {
          if (response.data.success) {
            const voteCount = response.data.voteCount; // Get the vote count

            // Calculate total votes
            const totalVotes = Object.values(voteCount).reduce((acc, count) => acc + count, 0);
            setTotalVotes(totalVotes); // Update total votes

            // Update candidates with their respective votes
            setCandidates((prevCandidates) => {
              const updatedCandidates = prevCandidates.map((candidate) => {
                const votes = voteCount[candidate.candidate_id] || 0; // Get votes for each candidate
                return {
                  ...candidate,
                  votes, // Add votes to candidate object
                };
              });
              return updatedCandidates; // Return updated candidate list
            });
          } else {
            console.error(response.data.message); // Log error message if unsuccessful
          }
        })
        .catch((error) => {
          console.error("Error fetching result:", error); // Handle errors during fetching
        })
        .finally(() => {
          setLoading(false); // End loading state
        });
    }
  }, [campaignInf]);

 // Update this part where you calculate the winner
useEffect(() => {
  if (!loading) {
    // Provide a default candidate if there are no candidates
    const initialCandidate = { votes: 0 }; // Adjust based on the structure of your candidate object
    // Use the initial candidate as the default value for reduce
    const topCandidate = candidates.reduce((prev, current) =>
      current.votes > prev.votes ? current : prev,
      initialCandidate // This is the initial value
    );

    // Only update the winner if there are candidates
    if (candidates.length > 0) {
      setWinner(topCandidate); // Set the winning candidate
    }
  }
}, [loading, candidates]);

  // Handle candidate card click to open candidate modal
  const handleCandidateClick = (candidate) => {
    setSelectedCandidate(candidate); // Set selected candidate
    setOpenModal(true); // Open candidate modal
  };

  // Close the candidate modal
  const handleCloseCandidateModal = () => {
    setOpenModal(false); // Close modal
    setSelectedCandidate(null); // Clear selected candidate
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
