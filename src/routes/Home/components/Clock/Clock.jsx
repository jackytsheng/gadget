import React from 'react';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
  border: solid 3px #3b3e40;
  border-radius: 100%;
  position: absolute;
  top: 30%;
  left: 15%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const time = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const DarkColor = '#3b3e40';

const Clock = styled.div`
  height: ${({ shrink }) => 200 / shrink}px;
  width: ${({ shrink }) => 200 / shrink}px;
  background: white;
  box-sizing: border-box;
  border-radius: 100%;
  border: 5px solid #c5e9fb;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .top {
    position: absolute;
    width: 1px;
    height: ${({ shrink }) => 8 / shrink}px;
    background: ${DarkColor};
    left: 0;
    right: 0;
    margin: 0 auto;
  }
  .right {
    position: absolute;
    width: ${({ shrink }) => 8 / shrink}px;
    height: ${({ shrink }) => 3 / shrink}px;
    background: ${DarkColor};
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto 0;
  }
  .bottom {
    position: absolute;
    width: ${({ shrink }) => 3 / shrink}px;
    height: ${({ shrink }) => 8 / shrink}px;
    background: ${DarkColor};
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
  }
  .left {
    position: absolute;
    width: ${({ shrink }) => 8 / shrink}px;
    height: ${({ shrink }) => 3 / shrink}px;
    background: ${DarkColor};
    top: 0;
    bottom: 0;
    left: 0;
    margin: auto 0;
  }
  .center {
    height: 1px;
    width: 1px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background: ${DarkColor};
    border-radius: 100%;
  }
  .shadow {
    height: ${({ shrink }) => 200 / shrink}px;
    width: ${({ shrink }) => 200 / shrink}px;
    position: absolute;
    left: ${({ shrink }) => 60 / shrink}px;
    top: ${({ shrink }) => 60 / shrink}px;
    transform: rotate(135deg);
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1));
  }
  .hour {
    width: 1px;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;
    align-items: center;

    //animation: time 86400s infinite linear;
    animation: ${time} 60s infinite linear;
    &:before {
      position: absolute;
      content: '';
      background: ${DarkColor};
      height: ${({ shrink }) => 60 / shrink}px;
      width: ${({ shrink }) => 3 / shrink}px;
      top: ${({ shrink }) => 30 / shrink}px;
    }
  }
  .minute {
    width: 1px;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;
    align-items: center;

    //animation: time 3600s infinite linear;
    animation: ${time} 30s infinite linear;
    &:before {
      position: absolute;
      content: '';
      background: ${DarkColor};
      height: ${({ shrink }) => 40 / shrink}px;
      width: ${({ shrink }) => 1 / shrink}px;
      top: ${({ shrink }) => 50 / shrink}px;
    }
  }
  .second {
    width: 1px;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;
    align-items: center;

    //animation: time 60s infinite linear;
    animation: ${time} 15s infinite linear;
    &:before {
      position: absolute;
      content: '';
      background: #f05354;
      height: ${({ shrink }) => 45 / shrink}px;
      width: ${({ shrink }) => 2 / shrink}px;
      top: ${({ shrink }) => 45 / shrink}px;
    }
  }
`;

export default () => {
  return (
    <Wrapper>
      <Clock shrink={4}>
        <div className={'top'}></div>
        <div className={'right'}></div>
        <div className={'bottom'}></div>
        <div className={'left'}></div>
        <div className={'center'}></div>
        <div className={'shadow'}></div>
        <div className={'hour'}></div>
        <div className={'minute'}></div>
        <div className={'second'}></div>
      </Clock>
    </Wrapper>
  );
};
