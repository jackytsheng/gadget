import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import Instruction from './Instruction';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const ListWrapper = styled.div`
  padding: 5px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Information = ({ size }: any) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Wrapper>
      <Button
        variant='outlined'
        color='primary'
        size={size}
        onClick={handleClickOpen}
      >
        How to Play
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <ListWrapper>
          <Instruction />
        </ListWrapper>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            I Get It
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
};

export default Information;
