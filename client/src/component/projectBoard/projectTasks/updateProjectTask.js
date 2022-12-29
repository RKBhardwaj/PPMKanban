import React, { useEffect, useState} from "react";
import {connect} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {
    getProjectTask,
    updateProjectTask
} from "../../../stateManagement/actions/backlogActions";
import PropTypes from "prop-types";
import {getHistory} from "../../../stateManagement/actions/actionsUtils";
import {Button, TextAreaInput, TextDateInput, TextInput} from "../../core/components";
import Dropdown from "../../core/dropdown";

const UpdateProjectTask = (props) => {
    const {getProjectTask, history, updateProjectTask} = props
    const {backlog_id, project_task_id} = useParams();

    const [id, setId] = useState(0);
    const [summary, setSummary] = useState('');
    const [acceptanceCriteria, setAcceptanceCriteria] = useState('');
    const [projectSequence, setProjectSequence] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState(0)
    const projectIdentifier = backlog_id;
    const [errors, setErrors] = useState({})

    useEffect(() => {
        getProjectTask(backlog_id, project_task_id, history)
    }, [backlog_id, project_task_id])

    useEffect(() => {
        const {errors, projectTask = {}} = props
        setErrors(errors);
        setId(projectTask.id);
        setSummary(projectTask.summary);
        setAcceptanceCriteria(projectTask.acceptanceCriteria)
        setDueDate(projectTask.dueDate)
        setStatus(projectTask.status)
        setPriority(projectTask.priority)
        setProjectSequence(projectTask.projectSequence)
    }, [props.errors, props.projectTask])

    const onSubmit = (e) => {
        e.preventDefault();

        const UpdateProjectTask = {
            id,
            projectSequence,
            summary,
            acceptanceCriteria,
            status,
            priority,
            dueDate,
            projectIdentifier
        };

        updateProjectTask(
            projectIdentifier,
            projectSequence,
            UpdateProjectTask,
            history
        );
    }

    return (
        <div className="add-PBI">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link
                            to={`/projectBoard/${projectIdentifier}`}
                            className="btn btn-light"
                        >
                            Back to Project Board
                        </Link>
                        <h4 className="display-4 text-center">Update Project Task</h4>
                        <p className="lead text-center">
                            Project Name: {projectIdentifier} | Project Task ID:{" "}
                            {projectSequence}{" "}
                        </p>
                        <form onSubmit={onSubmit}>
                            <TextInput
                                label="Project Task summary"
                                error={errors.summary}
                                placeholder="Project Task summary"
                                name="summary"
                                value={summary}
                                onChange={(evt) => setSummary(evt.target.value)}
                            />
                            <TextAreaInput
                                label="Acceptance Criteria"
                                placeholder="Acceptance Criteria"
                                name="acceptanceCriteria"
                                value={acceptanceCriteria}
                                onChange={(evt) => setAcceptanceCriteria(evt.target.value)}
                                error={errors.acceptanceCriteria}
                            />
                            <TextDateInput
                                label="Due Date"
                                isDisplayLabel={true}
                                onChange={(evt) => setDueDate(evt.target.value)}
                                name="dueDate"
                                placeholder="Due Date"
                                value={dueDate}
                                error={errors.dueDate}
                            />
                            <Dropdown
                                label="Priority"
                                isDisplayLabel={true}
                                onChange={(e) => setPriority(e.target.value)}
                                name="priority"
                                placeholder="Priority"
                                value={priority}
                                error={errors.priority}
                                options={[{
                                    value: 1,
                                    text: 'High'
                                }, {
                                    value: 2,
                                    text: 'Medium'
                                }, {
                                    value: 3,
                                    text: 'Low'
                                }]}
                            />
                            <Dropdown
                                onChange={(e) => setStatus(e.target.value)}
                                label="Status"
                                isDisplayLabel={true}
                                name="status"
                                placeholder="Status"
                                value={status}
                                error={errors.status}
                                options={[{
                                    value: 'TO_DO',
                                    text: 'To Do'
                                }, {
                                    value: 'IN_PROGRESS',
                                    text: 'In Progress'
                                }, {
                                    value: 'DONE',
                                    text: 'DONE'
                                }]}
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

UpdateProjectTask.propTypes = {
    getProjectTask: PropTypes.func.isRequired,
    projectTask: PropTypes.object.isRequired,
    updateProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return ({
        projectTask: state.backlog.projectTask,
        errors: state.errors,
        history: getHistory(state.history)
    })
};

export default connect(
    mapStateToProps,
    {getProjectTask, updateProjectTask}
)(UpdateProjectTask);