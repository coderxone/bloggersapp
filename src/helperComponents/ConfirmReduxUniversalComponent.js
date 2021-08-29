import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Observable from '../services/Observable';
import { useSelector, useDispatch } from 'react-redux'
import { openSystemDialog,turnOnCreatorsFormCheckbox } from '../features/counter-slice'



export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  var check = 0;

  const confirmText = useSelector((state) => state.counter.ConfirmReduxUniversalComponent.confirm)
  const cancelText = useSelector((state) => state.counter.ConfirmReduxUniversalComponent.cancel)
  const dialogStatus = useSelector((state) => state.counter.ConfirmReduxUniversalComponent.status)
  const dialogText = useSelector((state) => state.counter.ConfirmReduxUniversalComponent.text)

  const dispatch = useDispatch()

  const Cancel = (() => {
    dispatch(openSystemDialog(0));
  });

  const Continue = () => {
    dispatch(turnOnCreatorsFormCheckbox());
    dispatch(openSystemDialog(0));
  }

  const CloseEvent = () => {
    Observable.sendData_subject("cancel");
  }

  return (
    <div>
       <Dialog
         open={dialogStatus}
         onClose={CloseEvent}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
       >
           <DialogTitle id="alert-dialog-title">{dialogText}</DialogTitle>

           <DialogActions>
             <Button onClick={Cancel} color="primary">
               {cancelText}
             </Button>
             <Button onClick={Continue} color="primary" autoFocus>
               {confirmText}
             </Button>
           </DialogActions>
         </Dialog>

    </div>
  );
}
