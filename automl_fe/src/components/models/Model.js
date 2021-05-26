import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Header from '../shared/layout/header/Header';
import "./model.css";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { doSearch } from "../../functions/project";
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Information', 'Browser data source', 'Select features, label', 'Select models', 'Select saved loaction'];
}

// function getStepContent(stepIndex) {

//   }
// }

const Model = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState(0);

  useEffect(() => {
    loadProject();
  }, []);

  const loadProject = () => {
    doSearch({})
      .then((res) => {
        setProjects(res.data.data);
      })
      .catch((err) => {
        // setLoading(false);
        console.log(err);
      });
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <div className="step-content">
            <h4>Select project</h4>
            <form>
              <div className="form-group">
                <label for="exampleFormControlSelect1">Select project</label>
                <select className="form-control" id="exampleFormControlSelect1">
                  {projects.map((p) => {
                    return <option value={p.projectId}>{p.projectName}</option>
                  })}
                </select>
              </div>
              <h5>Model information</h5>
              <div className="form-group">
                <label for="exampleFormControlInput1">Model Name</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="" />
              </div>
              <div className="form-group">
                <label for="exampleFormControlTextarea1">Description</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
              <div className="form-group">
                <label for="exampleFormControlInput1">Run note</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="" />
              </div>
            </form>
          </div>
        );
      case 1:
        return (
          <div className="step-content">
            content1
          </div>
        );
      case 2:
        return (
          <div className="step-content">
            content1
          </div>
        );
      case 3:
        return (
          <div className="step-content">
            content1
          </div>
        );
      case 4:
        return (
          <div className="step-content">
            content1
          </div>
        );

      default:
        return 'Unknown stepIndex';
    }
  }

  return (
    <>
      <Header />
      <div className="run-model">
        <h3>Run new model</h3>
        <div className={classes.root}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div >
            {activeStep === steps.length ? (
              <div>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                <div className="btn-content">
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
              </Button>
                  <Button variant="contained" color="primary" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
