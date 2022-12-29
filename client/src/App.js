import React from 'react';
import { Provider } from "react-redux";
import store from './stateManagement/store';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from './component/layout/header';
import Dashboard from './component/dashboard/dashboard';
import EditProject from './component/project/editProject';
import AddProject from './component/project/addProject';
import ProjectBoard from './component/projectBoard/projectBoard';
import AddProjectTask from "./component/projectBoard/projectTasks/addProjectTask";
import UpdateProjectTask from "./component/projectBoard/projectTasks/updateProjectTask";
import ErrorBoundary from './errorBoundary';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css";

const App = () => {
    return (
        <Provider store={store}>
            <Router forceRefresh={true}>
                <div className="App">
                    <Header />
                    <ErrorBoundary>
                        <Routes>
                            <Route path="/dashboard" element=<Dashboard /> />
                            <Route path="/addProject" element=<AddProject /> />
                            <Route path="/editProject/:id" element=<EditProject/> />
                            <Route path="/projectBoard/:id" element=<ProjectBoard /> />
                            <Route path="/addProjectTask/:id" element=<AddProjectTask /> />
                            <Route path="/updateProjectTask/:backlog_id/:project_task_id" element=<UpdateProjectTask /> />
                        </Routes>
                    </ErrorBoundary>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
