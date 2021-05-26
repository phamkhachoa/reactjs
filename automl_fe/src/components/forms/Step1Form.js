import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Checkbox
} from 'antd';
import 'antd/dist/antd.css';
import "./step.css";

//redux
import { useDispatch, useSelector } from 'react-redux';
import { doSearch } from "../../functions/project";

const plainOptions = ['Train', 'Test'];
const defaultCheckedList = ['Train', 'Test'];
const CheckboxGroup = Checkbox.Group;

const Step1Form = (props) => {

    const [projects, setProjects] = useState([]);
    const [checkedList, setCheckedList] = React.useState(defaultCheckedList);

    // const { model } = useSelector((state) => ({ ...state }));
    // const [projectId, setProjectId] = useState();
    // const [modelName, setModelName] = useState();
    // const [modelDescription, setModelDescription] = useState();
    // const [runNote, setRunNote] = useState();
    // const [values, setValues] = useState({});

    // let dispatch = useDispatch();

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

    // const handleChange = (e) => {
    //     setValues({ ...values, [e.target.name]: e.target.value });
    //     console.log(values);
    //     dispatch({
    //         type: 'ADD_VALUE',
    //         payload: values
    //     });
    // };

    return (
        <div className="form-control-cus">
            <Form>
                <h4>Select Project</h4>
                <Form.Item className="input-cus">
                    <Select>
                        {projects.map((p) => {
                            return <Select.Option value={p.projectId}>{p.projectName}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <h4>Model information</h4>
                <h5>Model name *</h5>
                <Form.Item className="input-cus-2">
                    <Input onChange={props.handleChange} value={props.values.modelName} name="modelName"/>
                </Form.Item>
                <h5>Model description</h5>
                <Form.Item name={['user', 'introduction']} className="input-cus-2">
                    <Input.TextArea />
                </Form.Item>
                <h5>Run note *</h5>
                <Form.Item className="input-cus-2">
                    <Input />
                </Form.Item>
                <h5>Task *</h5>
                <div>
                    <CheckboxGroup options={plainOptions} value={checkedList} />
                </div>
            </Form>
        </div>
    )
};

export default Step1Form;