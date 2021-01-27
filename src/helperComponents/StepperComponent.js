import React, {useState} from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";

const StyledMobileStepper = withStyles({
  root: {
    maxWidth: "100%",
    flexGrow: 1,
    background:"#161730",
  },
  progress: {
    width: "100%"
  }
})(MobileStepper);

const ProgressMobileStepper = (props) => {

  const currentState = props.step;
  const count = props.count;


  const handleNext = () => {

  };

  const handleBack = () => {

  };

  return(
    <StyledMobileStepper
      variant="progress"
      steps={count}
      position="static"
      activeStep={currentState}

    />

  );


}



export default withStyles(null, { withTheme: true })(ProgressMobileStepper);
