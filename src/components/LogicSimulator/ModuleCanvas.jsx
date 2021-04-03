import React from 'react';
import styled from "styled-components";
import theme from './Theme';

const MIDDLE_ROW_HEIGHT= `${theme.height.large.replace('px','')-100}px`;
const Wrapper = styled.div({
  width: '700px',
  minWidth: '700px',
  borderRadius: '10px',
  display:"flex",
  alignItems:'center',
  flexDirection:'column',
  height:theme.height.large,
  margin:'0 20px',
  backgroundColor: theme.color.Ebony
});
const InnerWrapper = styled.div({
  width: '600px',
  // border:`solid ${theme.color.Artichoke} 2px`,
  height: MIDDLE_ROW_HEIGHT,
  backgroundColor: theme.color.Artichoke,
});

const ModuleNameField = styled.input({
  height:'50px',
  textAlign:'center',
  fontSize:theme.font.large,
  backgroundColor: theme.color.Ebony,
  color:theme.color.AshGray,
  outline:'none',
  letterSpacing:'4px',
  border:'none',
  "::placeholder": {
    color: theme.color.Artichoke,
    opacity: 0.5,
  },
})
const SignalInput = styled.div({
  height: MIDDLE_ROW_HEIGHT,
  flex:1,
})
const SignalOutput = styled.div({
  height: MIDDLE_ROW_HEIGHT,
  flex:1,
})
const Row =styled.div({
  width:'100%',
  display:"flex",
  justifyContent:'center',
  alignItems:'center',
  height: MIDDLE_ROW_HEIGHT
})
export default () =>
<Wrapper>
  <ModuleNameField placeholder="Enter Module Name"/>
  <Row>
    <SignalInput/>
    <InnerWrapper/>
    <SignalOutput/>
  </Row>
</Wrapper>
