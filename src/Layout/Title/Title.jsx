import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";

const FlexVerticalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 20px 0;
  @media (max-width: 500px) {
    margin: 5px 0;
  }
`; 

const TitleContainer = styled.div`
  width: ${(props) => props.width + "px"};
  margin-bottom: 20px;
  font-size: 50px;
  font-weight: 700;
  @media (max-width: 500px) {
    font-size: 25px;
    margin-bottom: 10px;
    width: ${(props) => props.width + "px"};
  }
`;
const SubTitleContainer = styled.div`
  width: ${(props) => props.width + "px"};
  font-size: 20px;
  @media (max-width: 500px) {
    font-size: 18px;
    width: ${(props) => props.width + "px"};
  }
`;



class Title extends React.Component{

  render(){
    return (
      <FlexVerticalWrapper>
        <TitleContainer width={this.props.width}>
          {this.props.title}
        </TitleContainer>
        <SubTitleContainer width={this.props.width}>
          By Jiajin Zheng
        </SubTitleContainer>
      </FlexVerticalWrapper>
    );
  }
}


Title.propTypes = {
  width: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default Title; 

