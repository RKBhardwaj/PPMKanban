import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {createProject} from '../../stateManagement/actions/projectActions'
import {TextAreaInput, Button, TextDateInput, TextInput} from "../core/components";
import {getHistory} from "../../stateManagement/actions/actionsUtils";

const AddProject = (props) => {
    const {createProject, history} = props
    const [projectName, setProjectName] = useState('');
    const [projectIdentifier, setProjectIdentifier] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setErrors(props.errors);
    }, [props.errors])

    const onSubmit = (e) => {
        e.preventDefault();
        const newProject = {
            projectName,
            projectIdentifier,
            description,
            start_date: startDate,
            end_date: endDate
        };
        createProject(newProject, history);
    }

    return (
        <div>
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create Project form</h5>
                            <hr/>
                            <form onSubmit={onSubmit}>
                                <TextInput
                                    label="Project Name"
                                    error={errors.projectName}
                                    placeholder="Project Name"
                                    name="projectName"
                                    value={projectName}
                                    onChange={(evt) => setProjectName(evt.target.value)}
                                />
                                <TextInput
                                    label="Project Id"
                                    placeholder="Unique Project ID"
                                    name="projectIdentifier"
                                    value={projectIdentifier}
                                    onChange={(evt) => setProjectIdentifier(evt.target.value)}
                                    error={errors.projectIdentifier}
                                />
                                <TextAreaInput
                                    label="Project Description"
                                    placeholder="Project Description"
                                    name="description"
                                    value={description}
                                    onChange={(evt) => setDescription(evt.target.value)}
                                    error={errors.description}
                                />
                                <TextDateInput
                                    label="Start Date"
                                    isDisplayLabel={true}
                                    onChange={(evt) => setStartDate(evt.target.value)}
                                    name="start_date"
                                    placeholder="Start Date"
                                    value={startDate}
                                    error={errors.start_date}
                                />
                                <TextDateInput
                                    label="Estimated End Date"
                                    isDisplayLabel={true}
                                    onChange={(evt) => setEndDate(evt.target.value)}
                                    name="end_date"
                                    placeholder="Estimated End Date"
                                    value={endDate}
                                    error={errors.end_date}
                                />

                                <Button
                                    class="btn btn-primary btn-block mt-4"
                                    type="submit"
                                >Submit</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

AddProject.propTypes = {
    createProject: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    history: getHistory(state.history)
})

export default connect(mapStateToProps, {createProject})(AddProject)