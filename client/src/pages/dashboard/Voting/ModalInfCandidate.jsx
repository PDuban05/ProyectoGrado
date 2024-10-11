import CloseIcon from "@mui/icons-material/Close"; // Importing close icon for the close button
import FacebookIcon from "@mui/icons-material/Facebook"; // Importing Facebook icon
import InstagramIcon from "@mui/icons-material/Instagram"; // Importing Instagram icon
import LanguageIcon from "@mui/icons-material/Language"; // Importing language icon for the website link
import YouTubeIcon from "@mui/icons-material/YouTube"; // Importing YouTube icon
import {
  DialogContent, // Material UI component for dialog content
  IconButton // Material UI component for icon buttons
} from "@mui/material";
import React from "react"; // Importing React
import {
  BiographyText, // Styled component for biography text
  BiographyTitle, // Styled component for biography title
  CloseButton, // Styled component for close button
  CustomAvatar, // Styled component for custom avatar
  CustomCard, // Styled component for custom card
  CustomCardContent, // Styled component for custom card content
  CustomDialog, // Styled component for custom dialog
  CustomDialogDescription, // Styled component for custom dialog description
  CustomDialogTitle, // Styled component for custom dialog title
  CustomScrollArea, // Styled component for scrollable area
  SocialMediaIcons // Styled component for social media icons
} from "./StyledComponets/StyledVoting";

// CandidateModal component that displays candidate details in a modal
const CandidateModal = ({ candidate, setopen, onClose }) => {
  // Parse social media links from candidate data
  const socialMediaLinks = candidate.social_media_links
    ? JSON.parse(candidate.social_media_links)
    : {}; // If social media links exist, parse them; otherwise, set to an empty object

  return (
    <CustomDialog open={setopen}> {/* Open the modal based on the setopen state */}
      <CustomDialogTitle> {/* Title section of the dialog */}
        <CustomAvatar // Display candidate's profile picture
          src={`http://localhost:3001${
            candidate.profile_picture_url && candidate.profile_picture_url.trim() !== ""
              ? candidate.profile_picture_url // Use candidate's profile picture if available
              : "/uploads/profileDefault/profileDefault.jpg" // Default picture if not available
          }`}
        />
        
        <div>
          <h2>{candidate.first_name + " " + candidate.last_name}</h2> {/* Candidate's full name */}
          <CustomDialogDescription>
            {candidate.campaign_slogan} {/* Candidate's campaign slogan */}
          </CustomDialogDescription>
        </div>
      </CustomDialogTitle>

      <DialogContent> {/* Content section of the dialog */}
        <CustomCard> {/* Card for displaying the biography */}
          <CustomCardContent>
            <BiographyTitle>Biografía</BiographyTitle> {/* Title for biography section */}
            <CustomScrollArea> {/* Scrollable area for the biography text */}
              <BiographyText>{candidate.biography}</BiographyText> {/* Display candidate's biography */}
            </CustomScrollArea>
          </CustomCardContent>
        </CustomCard>

        {/* Section for social media icons */}
        <SocialMediaIcons>
          {socialMediaLinks.facebook && ( // Check if Facebook link exists
            <IconButton
              href={socialMediaLinks.facebook} // Set link to Facebook
              target="_blank" // Open link in a new tab
              aria-label="Facebook" // Accessibility label
            >
              <FacebookIcon color="primary" /> {/* Facebook icon */}
            </IconButton>
          )}
          {socialMediaLinks.instagram && ( // Check if Instagram link exists
            <IconButton
              href={socialMediaLinks.instagram} // Set link to Instagram
              target="_blank" // Open link in a new tab
              aria-label="Instagram" // Accessibility label
            >
              <InstagramIcon color="secondary" /> {/* Instagram icon */}
            </IconButton>
          )}
          {socialMediaLinks.youtube && ( // Check if YouTube link exists
            <IconButton
              href={socialMediaLinks.youtube} // Set link to YouTube
              target="_blank" // Open link in a new tab
              aria-label="YouTube" // Accessibility label
            >
              <YouTubeIcon color="error" /> {/* YouTube icon */}
            </IconButton>
          )}
          {socialMediaLinks.webside && ( // Check if website link exists
            <IconButton
              href={socialMediaLinks.webside} // Set link to website
              target="_blank" // Open link in a new tab
              aria-label="Website" // Accessibility label
            >
              <LanguageIcon /> {/* Language icon */}
            </IconButton>
          )}
        </SocialMediaIcons>

        <div>
          <CloseButton // Button to close the modal
            variant="outlined"
            onClick={onClose} // Close the modal when clicked
            startIcon={<CloseIcon />} // Add close icon to the button
          >
            Cerrar {/* Button text: Close */}
          </CloseButton>
        </div>
      </DialogContent>
    </CustomDialog>
  );
};

export default CandidateModal; // Exporting the CandidateModal component
