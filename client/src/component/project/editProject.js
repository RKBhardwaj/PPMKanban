import React, { Component } from "react";
import { getProject, createProject } from "../../stateManagement/actions/projectActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Button, TextAreaInput, TextDateInput, TextInput} from "../core/components";

class EditProject extends Component {
    //set state
    constructor() {
        super();

        this.state = {
            id: "",
            projectName: "",
            projectIdentifier: "",
            description: "",
            start_date: "",
            end_date: "",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
        const {
            id,
            projectName,
            projectIdentifier,
            description,
            start_date,
            end_date
        } = nextProps.project;

        this.setState({
            id,
            projectName,
            projectIdentifier,
            description,
            start_date,
            end_date
        });
    }

    componentDidMount() {
        this.props.getProject(this.props.match.params.id, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const EditProject = {
            id: this.state.id,
            projectName: this.state.projectName,
            projectIdentifier: this.state.projectIdentifier,
            description: this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date
        };

        this.props.createProject(EditProject, this.props.history);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Update Project form</h5>
                            <hr />
                            <form onSubmit={this.onSubmit}>
                                <TextInput
                                    label="Project Name"
                                    error={errors.projectName}
                                    placeholder="Project Name"
                                    name="projectName"
                                    value={this.state.projectName}
                                    onChange={this.onChange}
                                />
                                <TextInput
                                    label="Project Id"
                                    placeholder="Unique Project ID"
                                    name="projectIdentifier"
                                    value={this.state.projectIdentifier}
                                    onChange={this.onChange}
                                    error={errors.projectIdentifier}
                                    isDisabled={true}
                                />
                                <TextAreaInput
                                    placeholder="Project Description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                />
                                <TextDateInput
                                    label="Start Date"
                                    isDisplayLabel={true}
                                    onChange={this.onChange}
                                    name="start_date"
                                    placeholder="Start Date"
                                    value={this.state.start_date}
                                    error={errors.start_date}
                                />
                                <TextDateInput
                                    label="Estimated End Date"
                                    isDisplayLabel={true}
                                    onChange={this.onChange}
                                    name="end_date"
                                    placeholder="Estimated End Date"
                                    value={this.state.end_date}
                                    error={errors.end_date}
                                />

                                <Button
                                    type="submit"
                                    label="Submit"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
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
    match: state.match
});

export default connect(
    mapStateToProps,
    { getProject, createProject }
)(EditProject);