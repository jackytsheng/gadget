import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const sizeSm = 60;
const size = 110;
const padding = 70;
const radius = 30;
const cogColor = '#DFE0DF';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BaseBoardStyle = styled.div`
  width: ${sizeSm * 3 + padding}px;
  height: ${sizeSm * 3 + padding}px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  text-align: center;
  border-radius: ${radius}px;
  background-color: rgba(255, 255, 255, 0.4);

  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
    border-radius: ${radius + 21}px;
    border: 15px solid rgba(0, 0, 0, 0.05);
  }

  @media (min-width: 450px) {
    width: ${size * 3 + padding}px;
    height: ${size * 3 + padding}px;
  }
`;

const Board = styled(BaseBoardStyle)`
  position: relative;
  margin: 40px auto;
`;

const Row = styled.div`
  display: block;
`;

const Slot = styled.div`
  display: inline-block;
  width: ${sizeSm}px;
  height: ${sizeSm}px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.15);
  margin: 5px;
  @media (min-width: 450px) {
    height: ${size}px;
    width: ${size}px;
    border-radius: ${radius}px;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:active {
    border: 2px solid rgba(0, 0, 0, 0.09);
  }
`;

const Setting = styled(BaseBoardStyle)`
  position: absolute;
  background-color: ${cogColor};
  z-index: 1;
`;

const IconWrapper = styled.div`
  width: 30px;
  position: absolute;
  top: -15px;
  left: -15px;
  width: 30px;
  height: 30px;
  font-size: 2em;
  background-color: ${cogColor};
  border-radius: 50%;
  border: 10px solid ${cogColor};
  cursor: pointer;
  z-index: 2;
  color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
    border-radius: 51px;
    border: 15px solid rgba(0, 0, 0, 0.05);
  }
  &:hover {
    box-shadow: 1px 1px 2px 5px rgb(0 0 0 / 5%);
  }
`;

const TicTacBiggerToe = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Wrapper>
      <Board>
        <IconWrapper>
          <FontAwesomeIcon
            icon={faCog}
            onClick={() => setModalOpen(!modalOpen)}
          />
        </IconWrapper>
        {modalOpen && <Setting />}
        <Row>
          <Slot id='0'></Slot>
          <Slot id='1'></Slot>
          <Slot id='2'></Slot>
        </Row>
        <Row>
          <Slot id='3'></Slot>
          <Slot id='4'></Slot>
          <Slot id='5'></Slot>
        </Row>
        <Row>
          <Slot id='6'></Slot>
          <Slot id='7'></Slot>
          <Slot id='8'></Slot>
        </Row>
      </Board>
    </Wrapper>
  );
};

export default TicTacBiggerToe;
