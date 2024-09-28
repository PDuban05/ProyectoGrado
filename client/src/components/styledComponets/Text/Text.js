import { Link } from "react-router-dom";
import styled from "styled-components";
import { Typography as MuiTypography } from '@mui/material';

export const StyledLink = styled(Link)`
  font-size: 1rem;
  font-weight: bold;
  color: ${(props) => props.theme.textColor1};
 
  display: flex;
  text-align: right;

  :hover {
    color: #00c365;
    
  }
`;


export const TextIco = styled(MuiTypography)`
  font-size: 1.5rem;


`;



export const Text1 = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${(props) => props.theme.textColor1};
`;


export const Text2 = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.textColor2};
`;

export const Text3 = styled.span`
  font-size: 2.5rem;
  font-weight: 900;
  color: ${(props) => props.theme.textColor1};
`;

export const Text4 = styled.p`
  font-size: 1.125rem;
  font-weight: 500;
  color: ${(props) => props.theme.textColor2};
`;
export const Text5 = styled.span`
  color: ${(props) => props.theme.textColor3};
  font-size: 1rem;
  font-weight: 500;
  text-transform: capitalize;
  transition: all 0.5s ease 0s;
`;

export const Text51 = styled(Text5)`
  color: ${(props) => props.theme.textColor4};
  font-weight: 700;
`;
export const Text52 = styled(Text5)`
  color: #0d2636;
  font-weight: 700;
`;

export const Text6 = styled.h2`
  color: ${(props) => props.theme.textColor4};
  font-size: 1.7rem;
  font-weight: 700;
  text-transform: capitalize;
  transition: all 0.5s ease 0s;
`;

export const Text7 = styled.p`
  font-family: "Lato", sans-serif;
  color: ${(props) => props.theme.textColor4};
  font-size: 1.2rem;
  font-weight: 400;
  transition: all 0.5s ease 0s;
`;

export const Text71 = styled(Text7)`
  color: #f6f6ff;
  font-size: 1rem;
`;

export const Point = styled.span`
  font-family: "Saira Stencil One", cursive;
  color: #e38445;
  font-size: 1.75rem;
  font-weight: 500;
  transition: all 0.5s ease 0s;
`;