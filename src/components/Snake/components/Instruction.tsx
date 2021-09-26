import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {
  ArrowBack,
  ArrowForward,
  ArrowDownward,
  ArrowUpward,
} from '@material-ui/icons';
import SwipeRight from '../../../svgs/SwipeRight';
import SwipeDown from '../../../svgs/SwipeDown';
import SwipeUp from '../../../svgs/SwipeUp';
import SwipeLeft from '../../../svgs/SwipeLeft';

import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    listItemPadding: {
      padding: '2px 5px',
    },
    primaryColor: {
      color: '#3f51b5',
    },
    avatarBg: {
      backgroundColor: '#3f51b526',
    },
  })
);

const generate = (Icon: any, text: any, classes: any) => {
  return (
    <ListItem className={classes.listItemPadding}>
      <ListItemAvatar>
        <Avatar className={classes.avatarBg}>{Icon}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={text} />
    </ListItem>
  );
};

export default function InteractiveList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Typography variant='h6'>Desktop</Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {generate(
                <ArrowForward color='primary' />,
                'Move Right',
                classes
              )}
              {generate(<ArrowBack color='primary' />, 'Move Left', classes)}
              {generate(
                <ArrowDownward color='primary' />,
                'Move Down',
                classes
              )}
              {generate(<ArrowUpward color='primary' />, 'Move Up', classes)}
            </List>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='h6'>Mobile</Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {generate(<SwipeRight />, 'Move Right', classes)}
              {generate(<SwipeLeft />, 'Move Left', classes)}
              {generate(<SwipeDown />, 'Move Down', classes)}
              {generate(<SwipeUp />, 'Move Up', classes)}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
