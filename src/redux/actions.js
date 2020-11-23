import { FETCH_DOGS_FAILURE, FETCH_DOGS_REQUEST, FETCH_DOGS_SUCCESS } from "./actionType"
import axios from 'axios'
import { get } from "http"
export const fetchDogsRequest = () => {
    return{
        type: FETCH_DOGS_REQUEST
    }
}
export const fetchDogsSuccess = (dogs) => {
    return{
        type: FETCH_DOGS_SUCCESS,
        payload: dogs
    }
}
export const fetchDogsFailure = (error) => {
    return{
        type: FETCH_DOGS_FAILURE,
        payload: error
    }
}

export const fetchDogs = () => {
    return (dispatch) =>{
        dispatch(fetchDogsRequest)
        axios.get('https://dog.ceo/api/breeds/list/all')
        .then(response =>{ const dogs = response.data.message;
        dispatch(fetchDogsSuccess(dogs))
        })
        .catch(error => {
            const errorMsg = error
            dispatch(fetchDogsFailure(errorMsg))
        })
    }
}