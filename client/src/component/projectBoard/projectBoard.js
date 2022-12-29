import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Backlog from "./backlog";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../../stateManagement/actions/backlogActions";
import ErrorComponent from "../core/errorComponent";

const boardAlgorithm = (projectTasks) => {
    if (projectTasks.length === 0) {
        return (
            <div className="alert alert-info text-center" role="alert">
                No Project Tasks on this board
            </div>
        );
    }
    return <Backlog projectTasks={projectTasks} />;
};

function ProjectBoard(props) {
    const { id } = useParams();

    const [projectTasks, setProjectTasks] = useState(props.backlog.projectTasks)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        props.getBacklog(id);
    }, [id]);

    useEffect( () => {
        const { errors, backlog: { projectTasks = {} } = {}} = props
        setProjectTasks(projectTasks)
        setErrors(errors);
        BoardContent()
    }, [props.errors, props.backlog])

    const BoardContent = () => {
        return boardAlgorithm(projectTasks);
    }

    return (
        <div className="container">
            {Object.keys(errors).length > 0 && <ErrorComponent errors={errors} />}
            {Object.keys(errors).length === 0 && (
                <>
                    <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
                        <i className="bi bi-plus-circle"> Create Project Task</i>
                    </Link>
                    <br />
                    <hr />
                    {BoardContent()}
                </>
            )}
        </div>
    );
}

ProjectBoard.propTypes = {
    id: PropTypes.string,
    backlog: PropTypes.object.isRequired,
    getBacklog: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    id: state.id,
    backlog: state.backlog,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { getBacklog }
)(ProjectBoard);