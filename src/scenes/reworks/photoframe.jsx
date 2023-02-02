import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import Box from '@mui/material/Box';
import { height } from '@mui/system';
import { logDOM } from '@testing-library/react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({imgURL}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const link = {imgURL}
  console.log(`image url : ${imgURL}`);

  return (
    <div>
      <Button size="medium" variant="contained" onClick={handleClickOpen} sx={{bgcolor:colors.blueAccent[600], fontSize:"14px"}}>
        照片
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          重工照片
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {imgURL==="" || imgURL===null? <Box height={"50vh"} width={"80vh"} sx={{display:"flex", justifyContent:"center"}}>
              <img src={`${'https://www.topperstutors.com/img/upload.png'}?w=164&h=164&fit=crop&auto=format`} height={"100%"}  />
          </Box> :
          <Box height={"50vh"} width={"80vh"} sx={{display:"flex", justifyContent:"center"}}>
          <img src={`${imgURL}?w=164&h=164&fit=crop&auto=format`} height={"100%"}  />
          </Box>
          }

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} variant="contained">
            收起
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}