import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";

const StyledMobileStepper = withStyles({
  root: {
    maxWidth: "100%",
    flexGrow: 1,
    background:"transparent",
  },
  progress: {
    width: "100%"
  }
})(MobileStepper);

const ProgressMobileStepper = (props) => {

  const currentState = props.step;
  const count = props.count;



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
