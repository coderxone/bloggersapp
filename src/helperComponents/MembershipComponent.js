import React,{useEffect,useCallback} from 'react';
import Observable from '../services/Observable';
import { controlMembership,closeMembershipDialog,openSystemDialog,turnOnCreatorsFormCheckbox,multiSave } from '../features/counter-slice';
import { useSelector, useDispatch } from 'react-redux';
import ProfileService  from '../services/ProfileService';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LocalizeComponent from '../localize/LocalizeComponent';
import CheckIcon from '@material-ui/icons/Check';
import { useHistory } from "react-router-dom";
import config from '../config/config';

const MembershipComponent = (props) => {

    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const history = useHistory();

    var check = 0;

    const confirmText = useSelector((state) => state.counter.membershipDialog.confirm)
    const cancelText = useSelector((state) => state.counter.membershipDialog.cancel)
    const dialogStatus = useSelector((state) => state.counter.membershipDialog.membershipDialogStatus)


    const Cancel = (() => {
      dispatch(closeMembershipDialog());
    });

    const GotoSubscribePage = useCallback((item) => {

        return history.push({pathname: '/subscribe'}), [history];

    });

    const Continue = () => {
      dispatch(closeMembershipDialog());
      GotoSubscribePage();
    }

    const CloseEvent = () => {
      dispatch(closeMembershipDialog());
      //Observable.sendData_subject("cancel");
    }


    useEffect(() => {

      let listenProfile = ProfileService.listenUserDataG().subscribe(data => {
        console.log(data)
        if(data.result.membership == 1){
          dispatch(controlMembership(true));

          let membershipStatus = config.getUserItemName('membership');

          if(membershipStatus == false){
            dispatch(multiSave({name:'membership',value:'1'}));
          }
          //multiSave
        }else if(data.result.membership == 0){
          dispatch(controlMembership(false));
        }
      });

      let listenObserve = Observable.subscribeByTimer_15_second().subscribe(data => {

          ProfileService.getOwnData();

      });

      ProfileService.getOwnData();

      let membershipStatus = config.getUserItemName('membership');

      if(membershipStatus !== false && membershipStatus == "1"){
        dispatch(controlMembership(true));
      }


      return () => {
        listenProfile.unsubscribe();
        listenObserve.unsubscribe();
      }


    },[]);

    return (
      <div>
         <Dialog
           open={dialogStatus}
           onClose={CloseEvent}
           aria-labelledby="alert-dialog-title"
           aria-describedby="alert-dialog-description"
         >
         <DialogTitle>{LocalizeComponent.membershipDialogText1}</DialogTitle>


             <div className="secondTabViewBox">

                   <ul className="commonViewBox">
                     <li className="rightLiViewBox ">
                         <CheckIcon className="leftViewBox"/>
                         <div className="rightViewBox">{LocalizeComponent.membershipDialogText2}</div>
                     </li>

                     <li className="rightLiViewBox ">
                         <CheckIcon className="leftViewBox"/>
                         <div className="rightViewBox">{LocalizeComponent.membershipDialogText3}</div>
                     </li>
                     <li className="rightLiViewBox ">
                         <CheckIcon className="leftViewBox"/>
                         <div className="rightViewBox">{LocalizeComponent.membershipDialogText4}</div>
                     </li>
                     <li className="rightLiViewBox ">
                         <CheckIcon className="leftViewBox"/>
                         <div className="rightViewBox">{LocalizeComponent.membershipDialogText5}</div>
                     </li>
                     <li className="rightLiViewBox ">
                         <CheckIcon className="leftViewBox"/>
                         <div className="rightViewBox">{LocalizeComponent.membershipDialogText6}</div>
                     </li>

                   </ul>

               </div>




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
    )

}

export default MembershipComponent;
