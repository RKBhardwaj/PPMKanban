import React, {useEffect} from "react";
import ProjectItem from "../project/projectItem";
import CreateProjectButton from "../project/createProjectButton";
import { connect } from "react-redux";
import { getAllProjects } from "../../stateManagement/actions/projectActions";
import PropTypes from "prop-types";

const Dashboard = (props) => {
    const { projects = [] } = props.project

    useEffect(() => {
        props.getAllProjects();
    }, []);

    return (
        <div className="projects">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 text-center">Projects</h1>
                        <br />
                        <CreateProjectButton />

                        <br />
                        <hr />
                        {projects.map(project => (
                            <ProjectItem key={project.id} project={project} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

Dashboard.propTypes = {
    project: PropTypes.object.isRequired,
    getAllProjects: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    project: state.project
});

export default connect(
    mapStateToProps,
    { getAllProjects }
)(Dashboard);