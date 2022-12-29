import React  from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {deleteProject} from "../../stateManagement/actions/projectActions";
import {Button} from "../core/components";

const ProjectItem = (props) => {
    const { deleteProject, project } = props

    const onDeleteClick = id => {
        deleteProject(id);
    };

    return (
        <div className="container">
            <div className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-2">
                        <span className="mx-auto">{project.projectIdentifier}</span>
                    </div>
                    <div className="col-lg-6 col-md-4 col-8">
                        <h3>{project.projectName}</h3>
                        <p>{project.description}</p>
                    </div>
                    <div className="col-md-4 d-none d-lg-block">
                        <ul className="list-group">

                            <li className="list-group-item board">
                                <Link to={`/projectBoard/${project.projectIdentifier}`}>
                                    <i className="bi bi-flag pr-1"> Project Board </i>
                                </Link>
                            </li>


                            <li className="list-group-item update">
                                <Link to={`/editProject/${project.projectIdentifier}`}>
                                    <i className="bi bi-pencil pr-1"> Update Project Info</i>
                                </Link>
                            </li>


                            <li
                                className="list-group-item delete"
                            >
                                <Button isLink={true} onClick={() => onDeleteClick(project.projectIdentifier)}>
                                    <i className="bi bi-trash pr-1"> Delete Project</i>
                                </Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

ProjectItem.propTypes = {
    deleteProject: PropTypes.func.isRequired
};

export default connect(
    null,
    {deleteProject}
)(ProjectItem);