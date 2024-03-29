import React, {useCallback} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Ios from '../images/iphone.png';
import Android from '../images/android.png';
import Observable from '../services/Observable';
import LocalizeComponent from '../localize/LocalizeComponent';
import {
  useHistory,
} from "react-router-dom";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {


  const open = props.status;
  const history = useHistory();

  const GoToHome = useCallback((item) => {

      return history.push({pathname: '/main'}), [history];

  });


  const handleClickOpen = (event) => {
    event.preventDefault();
      GoToHome();

      setTimeout(function(){
        Observable.sendData_subjectMob("openMobileDialog");
      },1000)

  };
  const handleClose = () => {
      Observable.sendData_subjectMob("closeMobileDialog");
  };

  return (
    <div>

      <a href="#"  onClick={handleClickOpen}>{LocalizeComponent.download_app}</a>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" className="dialogCenterText" onClose={handleClose}>
          {LocalizeComponent.download_app_2} for <a  target="_blank" href="https://apps.apple.com/us/app/echohub-io/id1563339758" >IOS</a> and <a href="https://play.google.com/store/apps/details?id=io.echohub.www&hl=en_US&gl=US">ANDROID</a>
        </DialogTitle>
        <DialogContent dividers>

        <div className="echohubMobileRoot">
            <div className="echohubMobile"><a  target="_blank" href="https://apps.apple.com/us/app/echohub-io/id1563339758" >ios version</a></div>
        </div>


        <div className="imgCenter">
        <a  target="_blank" href="https://apps.apple.com/us/app/echohub-io/id1563339758" ><img src={Ios} alt="echohub.io for ios" width="150" height="300"/></a>
        </div>





          <div className="echohubMobileRoot">
              <div className="echohubMobile"><a  target="_blank" href="https://play.google.com/store/apps/details?id=io.echohub.www&hl=en_US&gl=US">android version</a></div>
          </div>

          <div className="imgCenter">
          <a  target="_blank" href="https://play.google.com/store/apps/details?id=io.echohub.www&hl=en_US&gl=US"><img src={Android} alt="echohub.io for android" width="150" height="300"/></a>
          </div>



        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
