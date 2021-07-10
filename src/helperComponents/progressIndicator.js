import React from 'react';

import LocalizeComponent from '../localize/LocalizeComponent';

const progressIndicator = (props) => {

  const first = props.first;
  const second = props.second;
  const name = props.name;

  return (
    <div className="completitionBlockB activityM activityMT ">
        <div className="left_childCompletitionBlockB ">
          {name}
        </div>
        <div className="right_childCompletitionBlockB ">
            <div className="progressButton">
                <div style={{width : first}} className="leftprogressButton"></div>
                <div style={{width : second}} className="rightprogressButton"></div>
            </div>

            <div className="completition_percent">
                <div className="completition_percent_text">
                  {first}
                </div>
            </div>

        </div>

    </div>
  )
}

export default progressIndicator;
