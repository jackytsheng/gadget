import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const CardWrapper = styled(Card)`
  max-width: ${props=>props.width};
  margin: 10px;
`;

const CardMediaWrapper = styled(CardMedia)`
  height: ${(props) => props.height};
`;
export default ({ title, description, handleClick, width, img, height }) => (
  <CardWrapper width={width}>
    <CardActionArea>
      <CardMediaWrapper image={img} height={height}/>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button variant="outlined" color="primary" onClick={handleClick}>
        View Project
      </Button>
    </CardActions>
  </CardWrapper>
);
