import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from "./types";

export const createProject = (project, history) => async dispatch => {
    try {
        await fetch('http://localhost:8090/api/project', {
            method: 'POST',
            body: JSON.stringify(project),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        history.push('/dashboard')
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    } catch(err) {
        console.log(err)
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const getAllProjects = () => async dispatch => {
    const res = await fetch('http://localhost:8090/api/project', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    res.json().then((data) => {
        dispatch({
            type: GET_PROJECTS,
            payload: data
        })
    })
}

export const getProject = (id, history) => async dispatch => {
    try {
        const res = await fetch(`http://localhost:8090/api/project/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        res.json().then((data) => {
            dispatch({
                type: GET_PROJECT,
                payload: data
            })
        })
    } catch(err) {
        history.push('/dashboard')
    }
}

export const deleteProject = (id) => async dispatch => {
    if (window.confirm('Are you sure to delete the project. All its data will be removed?')) {
        await fetch(`http://localhost:8090/api/project/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        dispatch({
            type: DELETE_PROJECT,
            payload: id
        })
    }
}