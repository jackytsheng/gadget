import React from "react";
import CenterWrapper from "../../Layout/CenterWrapper";
import styled from 'styled-components';
import Grid, { NUMBER_COLOR } from "./components/Grid";
import updateGrid, {
  randomGenerator,
  generateAvailableCoor,
} from "./updateGrid.js";
import Button from "@material-ui/core/Button";



const BG_COLOR = "#bbada0";
const BORDER_COLOR = '#766d64';
const WIDTH = '280px';
const SCORE_COLOR = NUMBER_COLOR;

const GRID_WIDTH = "380px";
const GRID_WIDTH_SM = "315px";


const Wrapper = styled(CenterWrapper)`
  @media (max-width: 850px) {
    flex-direction: column;
  }
  @media (max-width: 500px) {
    margin-top: 40px;
    justify-content: flex-start;
  }
`;

const Title = styled.div`
  width: ${GRID_WIDTH};
  margin-bottom: 20px;
  font-size: 50px;
  font-weight: 700;
  @media (max-width: 500px) {
    font-size: 25px;
    margin-bottom: 10px;
    width: ${GRID_WIDTH_SM};
  }
`;
const SubTitle = styled.div`
  width: ${GRID_WIDTH};
  font-size: 20px;
  @media (max-width: 500px) {
    font-size: 18px;
    width: ${GRID_WIDTH_SM};
  }
`;

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

const RoundDiv = styled.div`
  border-radius:5px;
`

const GameBoard = styled(RoundDiv)`
  position:relative;
  font-family: "Ubuntu", sans-serif;
  display: flex;
  flex-direction:column;
  background-color: #fbf8ef;
  padding:10px;
  border: solid;
  border-color: ${BORDER_COLOR};
  overflow: hidden;
  margin-bottom:30px;
`;
const TopRow = styled.div`
  display: flex;
`;

const Logo = styled(RoundDiv)`
  background-color: #e7c34b;
  height: 60px;
  width: 60px;
`;

const LogoText = styled.div`
  color:${NUMBER_COLOR};
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 1px;
`;


const Score = styled(RoundDiv)`
  background-color: ${BG_COLOR};
  height: 60px;
  width: 70px;
  margin-left: 10px;
  display: flex;
  flex-direction:column;
`;

const ScoreText = styled.div`
  color: #ece0d2;
  margin-top: 5px;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  letter-spacing: 0.3px;
`;

const ScoreNumber = styled.div`
  flex: 1;
  color: ${SCORE_COLOR};
  font-weight:600;
  font-size : ${props => props.fontSize};
  letter-spacing: 0.5px;
  padding-bottom:5px;
`;
ScoreNumber.defaultProps = {
  fontSize: "20px",
};

const Description = styled.div`
  margin:10px 0;
  display:flex;
`

const Text = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #807871;
`;
const SquareBoard = styled.div`
  width: ${WIDTH};
  height: ${WIDTH};
`;

const FillerBlock = styled.div`
  flex:1;
`

const PopUpWrapper = styled(CenterWrapper)`
  flex-direction: column;
`;
const FlexVertical = styled.div`
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

const LosePop = styled.div`
  position: absolute;
  z-index: 30;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #eee4da96;
`;
const LostText = styled.div`
  font-size: 25px;
  font-weight: 500;
  margin-bottom: 10px;
  color: ${BORDER_COLOR};
  letter-spacing: 0.3px;
`;

const RestartBtn = styled(Button)`
  margin-top: 15px !important;
  width: 120px;
  letter-spacing: 0.5px !important;
  font-weight: 600 !important;
  height: 40px;
  background-color: ${BG_COLOR} !important;
  font-size: 20px !important;
  color: ${NUMBER_COLOR} !important;
  border-radius: 5px;
  border: 2px solid ${BORDER_COLOR} !important;
  cursor: pointer;
  &:hover {
    color: ${BORDER_COLOR} !important;
    background-color: #eee4da96 !important;
  }
`;

// TODO: Added info about only supporting laptop

class TwoZeroFourEight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameBoard: JSON.stringify(
        Array(4)
          .fill(0)
          .map((row) => Array(4).fill(0))
      ),
      availableCoordinate: JSON.stringify(generateAvailableCoor()),
      lost: false,
      score: 0,
      best: localStorage.getItem("best") ? localStorage.getItem("best") : 0,
      swipe: { xDown: null, yDown: null },
    };
    this.handleKeypress = this.handleKeypress.bind(this);
    this.restart = this.restart.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
  }
  // Copy code from: https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android

  handleTouchStart(evt) {
    const xDown = evt.touches[0].clientX;
    const yDown = evt.touches[0].clientY;
    this.setState({ swipe: { xDown, yDown } });
  }

  handleTouchMove(evt) {
    const { xDown, yDown } = this.state.swipe;
    if (!xDown || !yDown) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    let { gameBoard, score, lost } = this.state;
    gameBoard = JSON.parse(gameBoard);

    let keyPress;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        /* right swipe */
        keyPress = "Left";
        console.log("swipe left");
      } else {
        /* right swipe */
        keyPress = "Right";
        console.log("swipe right");
      }
    } else {
      if (yDiff > 0) {
        /* up swipe */
        keyPress = "Up";
        console.log("swipe up");
      } else {
        /* down swipe */
        keyPress = "Down";
        console.log("swipe down");
      }
    }
    /* reset values */
    this.setState({ swipe: { xDown: null, yDown: null } });
    const [newGameBoard, newScore, newCoor, newLost] = updateGrid(
      keyPress,
      gameBoard,
      score,
      lost
    );
    this.setState({
      gameBoard: JSON.stringify(newGameBoard),
      score: newScore,
      availableCoordinate: JSON.stringify(newCoor),
      lost: newLost,
    });
  }

  handleKeypress(evt) {
    // Only for arrow key
    if (evt.keyCode > 36 && evt.keyCode < 41) {
      let { gameBoard, score, lost } = this.state;
      gameBoard = JSON.parse(gameBoard);
      const keyPress = evt.key.replace("Arrow", "");
      const [newGameBoard, newScore, newCoor, newLost] = updateGrid(
        keyPress,
        gameBoard,
        score,
        lost
      );
      this.setState({
        gameBoard: JSON.stringify(newGameBoard),
        score: newScore,
        availableCoordinate: JSON.stringify(newCoor),
        lost: newLost,
      });
    }
  }
  restart() {
    this.setState(
      {
        gameBoard: JSON.stringify(
          Array(4)
            .fill(0)
            .map((row) => Array(4).fill(0))
        ),
        availableCoordinate: JSON.stringify(generateAvailableCoor()),
        lost: false,
        score: 0,
      },
      this.gameStart
    );
  }
  gameStart() {
    let { gameBoard, availableCoordinate } = this.state;
    gameBoard = JSON.parse(gameBoard);
    availableCoordinate = JSON.parse(availableCoordinate);
    [gameBoard, availableCoordinate] = randomGenerator(
      gameBoard,
      availableCoordinate
    );
    this.setState({
      gameBoard: JSON.stringify(gameBoard),
      availableCoordinate: JSON.stringify(availableCoordinate),
    });
  }

  componentDidMount() {
    this.gameStart();

    console.log("Added listener");
    window.addEventListener("keydown", this.handleKeypress);
    window.addEventListener("touchstart", this.handleTouchStart, false);
    window.addEventListener("touchmove", this.handleTouchMove, false);
  }
  componentDidUpdate() {
    console.log(JSON.parse(this.state.gameBoard));
    const { score, best } = this.state;
    if (score > best) {
      localStorage.setItem("best", score);
      this.setState({ best: score });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeypress);
    window.removeEventListener("touchstart", this.handleTouchStart, false);
    window.removeEventListener("touchmove", this.handleTouchMove, false);
    console.log("Removing listener");
  }

  render() {
    return (
      <Wrapper>
        <FlexVerticalWrapper>
          <Title>2048 Clone</Title>
          <SubTitle>By Jiajin Zheng</SubTitle>
        </FlexVerticalWrapper>
        <FlexVertical>
          <GameBoard>
            {this.state.lost ? (
              <LosePop>
                <PopUpWrapper>
                  <LostText>Your lost !</LostText>
                  <LostText>Your score is {this.state.score}</LostText>
                  <RestartBtn variant="outlined" onClick={this.restart}>
                    Restart
                  </RestartBtn>
                </PopUpWrapper>
              </LosePop>
            ) : null}
            <TopRow>
              <Logo>
                <CenterWrapper>
                  <LogoText>2048</LogoText>
                </CenterWrapper>
              </Logo>
              <FillerBlock />
              <Score>
                <ScoreText>SCORE</ScoreText>
                <ScoreNumber
                  fontSize={this.state.score > 99999 ? "15px" : "20px"}
                >
                  <CenterWrapper>{this.state.score}</CenterWrapper>
                </ScoreNumber>
              </Score>
              <Score>
                <ScoreText>BEST</ScoreText>
                <ScoreNumber
                  fontSize={this.state.best > 99999 ? "15px" : "20px"}
                >
                  <CenterWrapper>{this.state.best}</CenterWrapper>
                </ScoreNumber>
              </Score>
            </TopRow>
            <Description>
              <Text>Join the numbers and get to the 2048 tile! </Text>
            </Description>
            <SquareBoard>
              {this.state.gameBoard ? (
                <Grid gameBoard={JSON.parse(this.state.gameBoard)} />
              ) : null}
            </SquareBoard>
          </GameBoard>
        </FlexVertical>
      </Wrapper>
    );
  }
}

export default TwoZeroFourEight;