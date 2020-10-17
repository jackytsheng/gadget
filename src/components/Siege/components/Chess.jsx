
import styled from "styled-components";

// const CHESS_COLOR_DARK = "#622f00";
// const CHESS_COLOR_LIGHT = "#f99d25";

const Chess = styled.img`
  width: 60px;
  height: 60px;
  z-index: ${(props) => (props.disabled ? 0 : 30)};
  &:hover {
    cursor: ${(props) => (props.disabled ? "auto" : "pointer")};
  }
  @media (max-width: 650px) {
    width: 47px;
    height: 47px;
  }
`;

export default Chess;