import React from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Btn from '@material-ui/core/Button';
import MuiCard from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TypoGraphy from '@material-ui/core/Typography';

const Card = withStyles({
  root: {
    borderRadius: '25px',
    boxShadow: '1rem 1rem 2rem rgb(0 0 0 / 20%)',
  },
})(MuiCard);

const Typography = withStyles({
  root: {
    color: '#3b3e40',
  },
})(TypoGraphy);

const Button = withStyles({
  root: {
    borderRadius: '20px',
  },
})(Btn);

const CardWrapper = styled(Card)`
  max-width: ${(props) => props.width};
  margin: 10px;
`;

const CardMediaWrapper = styled(CardMedia)`
  height: ${(props) => props.height};
`;
const ChipWrapper = styled.div`
  width: 100%;
  margin: 10px 0;
  & > * {
    margin-right: 5px !important;
  }
`;
export default ({
  title,
  subTitle,
  description,
  handleClick,
  width,
  img,
  height,
  stacks,
}) => (
  <CardWrapper width={width}>
    <CardActionArea>
      <CardMediaWrapper image={img} height={height} />
      <CardContent>
        <Typography gutterBottom variant='h5' component='h2'>
          {title}
        </Typography>
        <TypoGraphy variant='subtitle2' color='textSecondary' component='p'>
          {subTitle}
        </TypoGraphy>
        <ChipWrapper>
          {stacks.map((stack) => (
            <Chip
              variant='outlined'
              key={title + stack}
              size='small'
              label={stack}
              clickable
              color='primary'
            />
          ))}
        </ChipWrapper>
        <Typography variant='body2' component='div'>
          {description}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button variant='outlined' color='primary' onClick={handleClick}>
        View Project
      </Button>
    </CardActions>
  </CardWrapper>
);
