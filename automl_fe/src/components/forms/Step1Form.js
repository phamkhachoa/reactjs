import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Select,
    Checkbox
} from 'antd';
import 'antd/dist/antd.css';
import "./step.css";

//redux
// import { useDispatch, useSelector } from 'react-redux';
import { doSearch } from "../../functions/project";

const plainOptions = ['Train', 'Test'];
const defaultCheckedList = ['Train', 'Test'];
const CheckboxGroup = Checkbox.Group;
const { Option } = Select;

const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
];

function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
}

const Step1Form = (props) => {

    const [projects, setProjects] = useState([]);
    const [checkedList, setCheckedList] = React.useState(defaultCheckedList);

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

    return (
        <div className="form-control-cus">
            <Form>
                <h4>Select Project</h4>
                <Form.Item className="input-cus">
                    <Select value={props.configFlowDTO.projectId} onChange={props.handleChangeSelect}>
                        {projects.map((p) => {
                            return <Option value={p.projectId} name="projectId">{p.projectName}</Option>
                        })}
                    </Select>
                </Form.Item>
                <h4>Model information</h4>
                <h5>Model name *</h5>
                <Form.Item className="input-cus-2">
                    <Input onChange={props.handleChangeModel} value={props.modelDTO.modelName} name="modelName" />
                </Form.Item>
                <h5>Model description</h5>
                <Form.Item name={['user', 'introduction']} className="input-cus-2">
                    <Input.TextArea onChange={props.handleChangeModel} value={props.modelDTO.descritption} name="descritption" />
                </Form.Item>
                <h5>Run note *</h5>
                <Form.Item className="input-cus-2">
                    <Input onChange={props.handleChangeModel} value={props.modelDTO.runNote} name="runNote" />
                </Form.Item>
                <h5>Task *</h5>
                <div>
                    <Checkbox.Group options={options} defaultValue={['Pear']} onChange={onChange} />
                </div>
            </Form>
        </div>
    )
};

export default Step1Form;