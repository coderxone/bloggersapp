import React from 'react';
import Observable from '../../services/Observable';
import LocalizeComponent from '../../localize/LocalizeComponent';
import CircularProgressComponent from '../../helperComponents/CircularProgressComponent';


const ShowPush = (props) => {

  const item = props.item;
  const distance = props.distance;
  const status = props.status;
  const timerVariable = props.timerVariable;
  const timerCircleVariable = props.timerCircleVariable;
  const StartTask = (item) => {
    let sendObj = {
      action:"starttask",
      status:1,
      item:item
    }

    Observable.sendAny(sendObj);
  }

  const rejectOrder = (item) => {
    let sendObj = {
      action:"rejectorder",
      status:1,
      item:item
    }

    Observable.sendAny(sendObj);
  }


  return (
    <div className="mainPush_root">
      <div className="declineButtonBlock">
         <div className="declineButtonStyle" onClick={event => rejectOrder(item)}>
             {LocalizeComponent.Decline}
         </div>
      </div>
      <div className="mainPush">
        <div className="mainPushColumsOne">
          <div className="mainPushColumsOneLeft">
              <div className="mainPushColumsOneLeft_1">{LocalizeComponent.do_before} {item.date}</div>
              <div className="mainPushColumsOneLeft_2">{item.url}</div>
              <div className="mainPushColumsOneLeft_3">{LocalizeComponent.distance}: {distance}</div>

          </div>
          <div className="mainPushColumsOneRight">
            <div className="CircularProgressParent">
              <CircularProgressComponent status={status} timerVariable={timerVariable} timerCircleVariable={timerCircleVariable}/>
            </div>

          </div>

        </div>
        <div className="mainPushColumsTwo">

          <div className="mainPushColumsTwo_1">
            <div className="gorizontalGreyLine">
            </div>
            <div className="mainPushColumsTwo_1_Price">
              ${Math.round(item.sum / item.peoplecount - 1)}
            </div>
            <div className="mainPushColumsTwo_2_Second">
                {LocalizeComponent.tips}
            </div>
            <div className="mainPushColumsTwo_3_Third">
              {LocalizeComponent.high}
            </div>
          </div>
          <div className="mainPushColumsTwo_2">
              <div className="buttonStylePush" onClick={event => StartTask(item)}>
                  <div className="buttonStylePushText buttonStylePushTextAdd">{LocalizeComponent.accept}</div>
              </div>
          </div>


        </div>

      </div>
    </div>
  );
}

export default ShowPush;
