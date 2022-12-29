import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {connect} from "react-redux";
import {addProjectTask} from "../../../stateManagement/actions/backlogActions";
import PropTypes from "prop-types";
import {getHistory} from "../../../stateManagement/actions/actionsUtils";
import {TextAreaInput, TextDateInput, TextInput} from "../../core/components";
import Dropdown from "../../core/dropdown";

const AddProjectTask = (props) => {
    const {addProjectTask, history} = props
    const {id} = useParams();

    const [summary, setSummary] = useState('');
    const [acceptanceCriteria, setAcceptanceCriteria] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState(0)
    const projectIdentifier = id;
    const [errors, setErrors] = useState({})

    useEffect(() => {
        setErrors(props.errors);
    }, [props.errors])

    const onSubmit = (e) => {
        e.preventDefault();

        const newTask = {
            summary,
            acceptanceCriteria,
            status,
            priority,
            dueDate
        };

        addProjectTask(
            projectIdentifier,
            newTask,
            history
        );
    }

    return (
        <div className="add-PBI">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to={`/projectBoard/${id}`} className="btn btn-light">
                            Back to Project Board
                        </Link>
                        <h4 className="display-4 text-center">Add Project Task</h4>
                        <p className="lead text-center">Project Name + Project Code</p>
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
                            <input
                                type="submit"
                                className="btn btn-primary btn-block mt-4"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

AddProjectTask.propTypes = {
    addProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return ({
        errors: state.errors,
        history: getHistory(state.history)
    })
};

export default connect(
    mapStateToProps,
    {addProjectTask}
)(AddProjectTask);