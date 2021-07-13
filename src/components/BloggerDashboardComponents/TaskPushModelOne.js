import React, {useState} from 'react';
import { connect } from 'react-redux';
import Observable from '../../services/Observable';
import LocalizeComponent from '../../localize/LocalizeComponent';
import CircularProgressComponent from '../../helperComponents/CircularProgressComponent';

const ShowPushModel1 = (props) => {

  const item = props.item;
  //console.log(item)
  const status = props.status;
  const timerVariable = props.timerVariable;
  const timerCircleVariable = props.timerCircleVariable;
  const StartTask = (item) => {
    let sendObj = {
      action:"starttask",
      status:1,
      item:item,
      type:"m1"
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
    <div className="mainPush_rootModel1">
      <div className="declineButtonBlockM1">
         <div className="declineButtonStyleM1" onClick={event => rejectOrder(item)}>
             {LocalizeComponent.Decline}
         </div>
      </div>
      <div className="mainPushModel1">
        <div className="mainPushColumsOneM1">
          <div className="mainPushColumsOneLeft">
              <div className="mainPushColumsOneLeft_1">{LocalizeComponent.do_before} {item.date}</div>
              <div className="mainPushColumsOneLeft_2">{item.url}</div>
              <div className="mainPushColumsOneLeft_3">{LocalizeComponent.type_of_post}: {LocalizeComponent.type1}</div>

          </div>
          <div className="mainPushColumsOneRight">
            <div className="CircularProgressParent">
              <CircularProgressComponent status={status} timerVariable={timerVariable} timerCircleVariable={timerCircleVariable}/>
            </div>

          </div>

        </div>
        <div className="mainPushColumsCenterBlockM1">
          <div className="mainPushColumsCenterBlockM1Description textOverFlow">
            {item.description}
          </div>
        </div>
        <div className="mainPushColumsTwoModel1">

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


 export default connect()(ShowPushModel1);
