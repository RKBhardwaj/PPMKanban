import React, {useEffect, useState} from "react";
import { getProject, createProject } from "../../stateManagement/actions/projectActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Button, TextAreaInput, TextDateInput, TextInput} from "../core/components";
import {useParams} from "react-router-dom";
import {getHistory} from "../../stateManagement/actions/actionsUtils";

const EditProject = (props) => {
    const {id} = useParams();
    const { createProject, getProject, history } = props

    const [projectName, setProjectName] = useState('');
    const [projectIdentifier, setProjectIdentifier] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const { errors, project = {} } = props
        setErrors(errors);
        setProjectName(project.projectName)
        setProjectIdentifier(project.projectIdentifier);
        setDescription(project.description)
        setStartDate(project.start_date)
        setEndDate(project.end_date);
    }, [props.errors, props.project])


    useEffect(() => {
        getProject(id, history);
    }, [id])

    const onSubmit = (e) => {
        e.preventDefault();

        const EditProject = {
            id,
            projectName,
            projectIdentifier,
            description,
            start_date: startDate,
            end_date: endDate
        };

        createProject(EditProject, history);
    }

    return (
        <div className="project">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h5 className="display-4 text-center">Update Project form</h5>
                        <hr />
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
                                isDisabled={true}
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
    );
}

EditProject.propTypes = {
    getProject: PropTypes.func.isRequired,
    createProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    project: state.project.project,
    errors: state.errors,
    history: getHistory(state.history)
});

export default connect(
    mapStateToProps,
    { getProject, createProject }
)(EditProject);