import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
import Header from '../shared/layout/header/Header';
import "./model.css";
import { Steps, Button, message } from 'antd';
import 'antd/dist/antd.css';

import { doSearch } from "../../functions/project";
import Step1Form from '../forms/Step1Form';
import Step2Form from '../forms/Step2Form';
import { useDispatch, useSelector } from 'react-redux';

const { Step } = Steps;

const Model = () => {
  const [projects, setProjects] = useState([]);
  const [current, setCurrent] = React.useState(0);
  const [values, setValues] = useState({});
  const [modelDTO, setModelDTO] = useState({});
  const [configFlowDTO, setConfigFlowDTO] = useState({});

  let dispatch = useDispatch();

  const next = () => {
    setCurrent(current + 1);
    dispatch({
      type: 'ADD_VALUE',
      payload: {...values, modelDTO, configFlowDTO}
    });
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    // loadProject();
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeModel = (e) => {
    setModelDTO({ ...modelDTO, [e.target.name]: e.target.value });
  };

  const handleChangeConfigFlow = (e) => {
    setConfigFlowDTO({ ...configFlowDTO, [e.target.name]: e.target.value });
  };

  const handleChangeSelect = (e, action) => {
    // console.log(e, action);
    setConfigFlowDTO({ ...configFlowDTO, [action.name]: e });
  };

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

  const steps = [
    {
      title: 'Information',
      content: <Step1Form
      handleChangeModel={handleChangeModel}
      handleChangeConfigFlow={handleChangeConfigFlow}
      setModelDTO={setModelDTO}
      setConfigFlowDTO={setConfigFlowDTO}
      modelDTO={modelDTO}
      configFlowDTO={configFlowDTO} 
      handleChangeSelect={handleChangeSelect}
      />,
    },
    {
      title: 'Browser data source',
      content: <Step2Form />,
    },
    {
      title: 'Select features, label',
      content: 'Last-content',
    },
    {
      title: 'Select models',
      content: 'Last-content',
    },
    {
      title: 'Select saved location',
      content: 'Last-content',
    },
  ];

  return (
    <>
      <Header />
      <div className="run-model">
        <div className="run-model-content">
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
          <div className="steps-action">
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" onClick={() => message.success('Processing complete!')}>
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                Previous
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
