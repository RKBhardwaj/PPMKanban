import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import { createProject } from '../../stateManagement/actions/projectActions'
import { TextAreaInput, Button, TextDateInput, TextInput } from "../core/components";

class AddProject extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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

    //life cycle hooks
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const newProject = {
            projectName: this.state.projectName,
            projectIdentifier: this.state.projectIdentifier,
            description: this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date
        };
        this.props.createProject(newProject, this.props.history);
    }

    render() {
        const { errors } = this.state;

        return (
            <div>
                <div className="project">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h5 className="display-4 text-center">Create Project form</h5>
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
            </div>
        );
    }
}

AddProject.propTypes = {
    createProject: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, { createProject })(AddProject)