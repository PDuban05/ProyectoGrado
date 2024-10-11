import styled from "styled-components";
import Button from "@mui/material/Button";

export const StyledButton = styled(Button)`
  && {
    width: 100%;
    display: block;
    margin: 0 auto;
    background: #007aff;
    color: white;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    z-index: 100;
    text-transform: capitalize;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
      background: #0066d6;
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }
  }
`;

export const StyledButton2 = styled(StyledButton)`
  && {
    background:transparent;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.textColor1};
    border: 1px solid grey;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
      background: #dddddd;
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }
  }
`;

export const StyledButton3 = styled(Button)`
  && {
    width: 133px;
    height: 48px;
    display: block;
    color: #e30613;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: "Inter", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    z-index: 100;
    text-transform: capitalize;
    border: 1px solid rgba(227, 6, 19, 0.5);
    border-radius: 8px;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }
  }
`;

export const StyleButtonAdd = styled(StyledButton3)`
  && {
    border-color: green;
    color: green;
  }
`;

export const StyleButtonEdit = styled(StyledButton3)`
  && {
    width: 20px;
    height: 40px;
    border-color: green;
    color: green;
    display: flex;
    align-items: center;
    margin: 0 auto;
  }
`;

export const StyleButtonDelete = styled(StyledButton3)`
  && {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    border: none;
  }
`;

export const StyleButtondelete2 = styled(StyledButton3)`
  && {
    width: 20px;
    height: 40px;
    border-color: #e30613;
    color: #e30613;
    display: flex;
    align-items: center;
  }
`;

export const StyleButtonCount = styled(StyledButton3)`
  && {
    width: 20px;
    height: 20px;
    border-color: transparent;
    color: #737780;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
`;

export const StyleButtonCount2 = styled.button`
  width: 40%;
  height: 100%;
  border-color: transparent;
  color: #737780;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

export const StyleButtoncancel = styled(StyledButton3)`
  && {
    width: 20px;
    height: 40px;
    border-color: #9c9999;
    color: #9c9999;
    display: flex;
    align-items: center;
  }
`;

export const StyledButton4 = styled(Button)`
  && {
    min-width: 200px;
    height: 48px;
    display: block;
    color: #fff;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: "Inter", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    z-index: 100;
    text-transform: capitalize;
    border: 1px solid rgba(227, 6, 19, 0.5);
    border-radius: 8px;
    background-color: #e30613;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
      background-color: #fa0011;
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }
  }
`;

export const StyledButton5 = styled(StyledButton4)`
  && {
    color: ${({ color, theme }) => color || theme.text};
    border: 1px solid ${({ theme }) => theme.text};
    background: none;

    &:hover {
      background: none;
    }
  }
`;

export const StyledRadio = styled.input.attrs({ type: "radio" })`
  width: 18px;
  height: 18px;
  background-color: #ffffff;
  border: 2px solid #d32f2f;
  border-radius: 50%;
  transition: all 150ms;
  accent-color: red;
  &:checked {
    background-color: #d32f2f;
  }
`;
