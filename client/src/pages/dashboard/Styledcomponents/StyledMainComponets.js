import { Button, Card, CardMedia, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Main = styled.main`
  width: 100%;
  flex: 1;
  padding: 10vh 15%;
`;

export const Section = styled.section`
  padding: 12px 0;

  @media (min-width: 768px) {
    padding: 16px 0;
  }

  @media (min-width: 1024px) {
    padding: 20px 0;
  }
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const StyledCard = styled(Card)`
  && {
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border: 0;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
    padding: 0 0 15px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &:hover {
      box-shadow: 0 15px 20px rgba(0, 0, 0, 0.15);
    }
  }
`;


export const StyledCardAdmin = styled(StyledCard)`
  
  
`;

export const Image = styled(CardMedia)`
  width: 100%;
  height: auto;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  object-fit: cover;
  aspect-ratio: 16 / 9;
`;

export const ImageAdmin = styled(Image)`

`;

export const CardContent = styled.div`
  padding: 1rem;
`;

export const CardContentAdmin = styled(CardContent)`

`;

export const CardTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const CardTitleAdmin = styled(CardTitle)`
 
`;

export const CardDescription = styled.p`
  color: #6b7280;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardDescriptionAdmin = styled(CardDescription)`
 
 
`;




export const CardFooter = styled.div`
  display: flex;
  justify-content: center;
`;

export const CardFooterAdmin = styled(CardFooter)`

`;


export const StyledButton = styled(Button)`
  && {
    width: 85%;
    padding: 8px 0;
    background-color: #011224;
    color: white;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #1d4ed8;
    }
  }
`;

export const ViewResultsButton = styled(StyledButton)`
  && {
    background-color: white;
    color: #011224;
    border: 2px solid #6b7280;
    &:hover {
      background-color: #6b7280;
      color: white;
    }
  }
`;

export const ViewCampaignButton = styled(StyledButton)`
  && {
    background-color: white;
    color: #011224;
    border: 2px solid #6b7280;
    &:hover {
      background-color: #6b7280;
      color: white;
    }
  }
`;

export const DateOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.4); /* Fondo más suave */
  color: white;
  padding: 8px 16px;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.4); /* Sombra más suave */
  font-size: 0.875rem;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(1px); /* Difuminado suave */
  transition: background 0.3s ease, box-shadow 0.3s ease; /* Transiciones suaves */
`;

export const DateOverlayAdmin = styled(DateOverlay)`
  
`;






// Styled-components para Skeleton
export const SkeletonCard = styled.div`
  && {
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border: 0;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
    padding: 0 0 15px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  }
`;

export const SkeletonImage = styled(Skeleton)`
  && {
    width: 100%;
    height: 180px;
    border-radius: 8px 8px 0 0;
    margin-bottom: 16px;
  }
`;

export const SkeletonTitle = styled(Skeleton)`
  && {
    width: 60%;
    height: 24px;
    margin-bottom: 8px;
  }
`;

export const SkeletonDescription = styled(Skeleton)`
  && {
    width: 90%;
    height: 16px;
    margin-bottom: 8px;
  }
`;

export const SkeletonButton = styled(Skeleton)`
  && {
    width: 85%;
    height: 36px;
    margin-top: 16px;
    border-radius: 18px;
  }
`;

export const StyledLink = styled(Link)`
  && {
    width: 100%;
    display: flex;
    justify-content: center;
  
  }
`;
