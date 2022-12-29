import {createBrowserHistory} from "history";
import { GET_ERRORS } from "./types";

export const getHistory = (propsHistory) => {
    if (propsHistory) {
        return propsHistory
    }
    return createBrowserHistory()
}

export const responseHandler = (response, data, dispatch, type) => {
    const dispatchObject = {
        payload: data
    }
    if (response.status === 400) {
        dispatchObject.type = GET_ERRORS
    } else {
        dispatchObject.type = type
    }
    dispatch(dispatchObject)
}