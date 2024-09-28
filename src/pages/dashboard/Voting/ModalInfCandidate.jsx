import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { styled } from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LanguageIcon from "@mui/icons-material/Language"; // Para el sitio web

// Estilos personalizados usando styled-components
const CustomDialog = styled(Dialog)`
  && {
    .MuiDialog-paper {
      width: 625px;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
    }
  }
`;

const CustomAvatar = styled(Avatar)`
  && {
    width: 64px;
    height: 64px;
    border: 2px solid #3b82f6;
  }
`;

const CustomDialogTitle = styled(DialogTitle)`
  && {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 1.5rem;
    font-weight: 600;
    color: #374151;
  }
`;

const CustomDialogDescription = styled(Typography)`
  && {
    color: #3b82f6;
    font-weight: 500;
    margin-top: 0.25rem;
  }
`;

const CustomCard = styled(Card)`
  && {
    margin-top: 1rem;
    background: rgba(249, 250, 251, 0.5);
  }
`;

const CustomCardContent = styled(CardContent)`
  && {
    padding: 16px;
  }
`;

const BiographyTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #4b5563;
`;

const BiographyText = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const CustomScrollArea = styled.div`
  max-height: 300px;
  overflow-y: auto;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
`;

const CloseButton = styled(Button)`
  && {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 10px 0;
    @media (min-width: 640px) {
      width: auto;
    }
  }
`;

const SocialMediaIcons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 1rem;
`;

const CandidateModal = ({ candidate, setopen, onClose }) => {
  const socialMediaLinks = candidate.social_media_links
  ? JSON.parse(candidate.social_media_links)
  : {};

  return (
    <CustomDialog open={setopen}>
      <CustomDialogTitle>
        <CustomAvatar
          src={`http://localhost:3001${
            candidate.profile_picture_url && candidate.profile_picture_url.trim() !== ""
              ? candidate.profile_picture_url
              : "/uploads/profileDefault/profileDefault.jpg"
          }`}
        />



                    
        <div>
          <h2>{candidate.first_name + " " + candidate.last_name}</h2>
          <CustomDialogDescription>
            {candidate.campaign_slogan}
          </CustomDialogDescription>
        </div>
      </CustomDialogTitle>

      <DialogContent>
        <CustomCard>
          <CustomCardContent>
            <BiographyTitle>Biografía</BiographyTitle>
            <CustomScrollArea>
              <BiographyText>{candidate.biography}</BiographyText>
            </CustomScrollArea>
          </CustomCardContent>
        </CustomCard>

        {/* Sección de íconos de redes sociales */}
        <SocialMediaIcons>
          {socialMediaLinks.facebook && (
            <IconButton
              href={socialMediaLinks.facebook}
              target="_blank"
              aria-label="Facebook"
            >
              <FacebookIcon color="primary" />
            </IconButton>
          )}
          {socialMediaLinks.instagram && (
            <IconButton
              href={socialMediaLinks.instagram}
              target="_blank"
              aria-label="Instagram"
            >
              <InstagramIcon color="secondary" />
            </IconButton>
          )}
          {socialMediaLinks.youtube && (
            <IconButton
              href={socialMediaLinks.youtube}
              target="_blank"
              aria-label="YouTube"
            >
              <YouTubeIcon color="error" />
            </IconButton>
          )}
          {socialMediaLinks.webside && (
            <IconButton
              href={socialMediaLinks.webside}
              target="_blank"
              aria-label="Website"
            >
              <LanguageIcon />
            </IconButton>
          )}
        </SocialMediaIcons>

        <div>
          <CloseButton
            variant="outlined"
            onClick={onClose}
            startIcon={<CloseIcon />}
          >
            Cerrar
          </CloseButton>
        </div>
      </DialogContent>
    </CustomDialog>
  );
};

export default CandidateModal;
