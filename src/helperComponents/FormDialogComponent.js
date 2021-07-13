import React,{ useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Observable from '../services/Observable';
import LocalizeComponent from '../localize/LocalizeComponent';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const Behavior = props.status;
  const action = props.action;

  const [text,setText] = useState("");

  const ListenInput = (event) => {
  //  console.log(event.target.value);
    setText(event.target.value);
  }

  const Confirm = (currentText) => {

      var object = {
        text:currentText,
        action:action,
      }

      Observable.reject_subject(object);
  }

  const handleClose = () => {
    var object = {
      action:"close",
    }

    Observable.reject_subject(object);
  }

  return (
    <div>

      <Dialog open={Behavior} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{LocalizeComponent.form_confirm}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {LocalizeComponent.to_decline}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={LocalizeComponent.reason}
            multiline
            type="text"
            fullWidth
            onChange={event => ListenInput(event)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {LocalizeComponent.cancel}
          </Button>
          <Button onClick={event => Confirm(text)} color="primary">
            {LocalizeComponent.form_confirm}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
