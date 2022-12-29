import {
    GET_ERRORS,
    GET_BACKLOG,
    GET_PROJECT_TASK,
    DELETE_PROJECT_TASK,
} from "./types";
import {responseHandler} from "./actionsUtils";

export const addProjectTask = (
    backlogId,
    projectTask,
    history
) => async dispatch => {
    try {
        await fetch(`http://localhost:8090/api/backlog/${backlogId}`, {
            method: 'POST',
            body: JSON.stringify(projectTask),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        history.push(`/projectBoard/${backlogId}`);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const getBacklog = backlogId => async dispatch => {
    try {
        const res = await fetch(`http://localhost:8090/api/backlog/${backlogId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        res.json().then((data) => {
            responseHandler(res, data, dispatch, GET_BACKLOG)
        })

    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const getProjectTask = (
    backlogId,
    projectTaskId,
    history
) => async dispatch => {
    try {
        const res = await fetch(`http://localhost:8090/api/backlog/${backlogId}/${projectTaskId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        res.json().then((data) => {
            responseHandler(res, data, dispatch, GET_PROJECT_TASK)
        })
    } catch (err) {
        history.push("/dashboard");
    }
};

export const updateProjectTask = (
    backlogId,
    projectTaskId,
    projectTask,
    history
) => async dispatch => {
    try {
        const res = await fetch(`http://localhost:8090/api/backlog/${backlogId}/${projectTaskId}`, {
            method: 'PATCH',
            body: JSON.stringify(projectTask),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        history.push(`/projectBoard/${backlogId}`);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        console.log(err)
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const deleteProjectTask = (backlogId, projectTaskId) => async dispatch => {
    if (
        window.confirm(
            `You are deleting project task ${projectTaskId}, this action cannot be undone`
        )
    ) {
        await fetch(`http://localhost:8090/api/backlog/${backlogId}/${projectTaskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        dispatch({
            type: DELETE_PROJECT_TASK,
            payload: projectTaskId
        });
    }
};