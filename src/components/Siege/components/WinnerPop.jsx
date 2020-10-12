import React from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

export const WinnerPopStyle = styled.div`
  position: absolute;
  z-index: 100;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props=>props.bgcolor};
`;

export const WinnerPop = ({ bgcolor, children }) => (
  <WinnerPopStyle bgcolor={bgcolor}>{children }</WinnerPopStyle>
);


WinnerPop.propTypes ={
  bgcolor: PropTypes.string.isRequired
}

export const TextStyle = styled.div`
  font-size: 25px;
  font-weight: 500;
  margin-bottom: 10px;
  color: ${(props) => props.color};
  letter-spacing: 0.3px;
  @media (max-width: 1000px) {
    margin-bottom: 0;
    font-size: 20px;
  }
`;
export const Text = ({ color,children }) => <TextStyle color={color}>{children}</TextStyle>;

Text.propTypes = {
  color: PropTypes.string.isRequired,
};




const RestartBtnStyle = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px !important;
  width: 120px;
  letter-spacing: 0.5px !important;
  font-weight: 600 !important;
  height: 40px;
  background-color: ${(props) => props.bgcolor} !important;
  font-size: 20px !important;
  color: ${(props) => props.btncolor}!important;
  border-radius: 5px;
  border: 2px solid ${(props) => props.btnbordercolor} !important;
  cursor: pointer;
  transition: none !important;
  &:hover {
    color: ${(props) => props.btnhovercolor} !important;
    background-color: ${(props) => props.btnhoverbgcolor} !important;
  }
`;

export const RestartBtn = ({
  bgcolor,
  btncolor,
  btnbordercolor,
  btnhovercolor,
  btnhoverbgcolor,
  children,
  ...props
}) => (
  <RestartBtnStyle
    {...props}
    bgcolor={bgcolor}
    btncolor={btncolor}
    btnbordercolor={btnbordercolor}
    btnhovercolor={btnhovercolor}
    btnhoverbgcolor={btnhoverbgcolor}
>{children}</RestartBtnStyle>
);

RestartBtn.propTypes = {
  bgcolor: PropTypes.string.isRequired,
  btncolor: PropTypes.string.isRequired,
  btnbordercolor: PropTypes.string.isRequired,
  btnhovercolor: PropTypes.string.isRequired,
  btnhoverbgcolor: PropTypes.string.isRequired,
};

