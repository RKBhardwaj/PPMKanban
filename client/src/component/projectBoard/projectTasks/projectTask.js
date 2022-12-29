import React from "react";
import { Link } from "react-router-dom";
import { deleteProjectTask } from "../../../stateManagement/actions/backlogActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ProjectTask = (props) => {
    const { projectTask, deleteProjectTask } = props

    const onDeleteClick = (backlogId, projectTaskId) => {
        deleteProjectTask(backlogId, projectTaskId);
    }

    let priorityString;
    let priorityClass;

    if (projectTask.priority === 1) {
        priorityClass = "bg-danger text-light";
        priorityString = "HIGH";
    }

    if (projectTask.priority === 2) {
        priorityClass = "bg-warning text-light";
        priorityString = "MEDIUM";
    }

    if (projectTask.priority === 3) {
        priorityClass = "bg-info text-light";
        priorityString = "LOW";
    }

    return (
        <div className="card mb-1 bg-light">
            <div className={`card-header text-primary ${priorityClass}`}>
                ID: {projectTask.projectSequence} -- Priority: {priorityString}
            </div>
            <div className="card-body bg-light">
                <h5 className="card-title">{projectTask.summary}</h5>
                <p className="card-text text-truncate ">
                    {projectTask.acceptanceCriteria}
                </p>
                <Link
                    to={`/updateProjectTask/${projectTask.projectIdentifier}/${
                        projectTask.projectSequence
                    }`}
                    className="btn btn-primary"
                >
                    View / Update
                </Link>

                <button
                    className="btn btn-danger ms-5"
                    onClick={() => onDeleteClick(
                        projectTask.projectIdentifier,
                        projectTask.projectSequence
                    )}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

ProjectTask.propTypes = {
    projectTask: PropTypes.object,
    deleteProjectTask: PropTypes.func.isRequired
};
ProjectTask.defaultProps = {
    projectTask: {}
}
export default connect(
    null,
    { deleteProjectTask }
)(ProjectTask);