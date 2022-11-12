import React from 'react';
import { Provider } from "react-redux";
import store from './stateManagement/store';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from './component/layout/header';
import Dashboard from './component/dashboard/dashboard';
import EditProject from './component/project/editProject';
import AddProject from './component/project/addProject';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Header />
                        <Routes>
                            <Route exact path="/dashboard" element=<Dashboard /> />
                            <Route exact path="/addProject" element=<AddProject /> />
                            <Route exact path="/editProject/:id" element=<EditProject/> />
                        </Routes>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
