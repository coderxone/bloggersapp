import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Observable from '../services/Observable';



export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  var text = props.text;
  var leftText = props.left;
  var rightText = props.right;
  var status = props.status;
  var check = 0;

  const Cancel = (() => {
    Observable.sendData_subject("cancel");
  });

  const Continue = () => {
    Observable.sendData_subject("confirm");
  }

  const CloseEvent = () => {
    Observable.sendData_subject("cancel");
  }

  return (
    <div>
       <Dialog
         open={status}
         onClose={CloseEvent}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
       >
           <DialogTitle id="alert-dialog-title">{text}</DialogTitle>

           <DialogActions>
             <Button onClick={Cancel} color="primary">
               {leftText}
             </Button>
             <Button onClick={Continue} color="primary" autoFocus>
               {rightText}
             </Button>
           </DialogActions>
         </Dialog>

    </div>
  );
}
