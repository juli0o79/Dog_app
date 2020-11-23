const { FETCH_DOGS_REQUEST, FETCH_DOGS_SUCCESS, FETCH_DOGS_FAILURE } = require("./actionType")

const initState = {
    loading: false,
    dogs: [],
    error: ''
}

const reducer = (state = initState, action) =>{
    switch(action.type) {
        case FETCH_DOGS_REQUEST:
            return{
                ...state,
                loading:true
        }
        case FETCH_DOGS_SUCCESS:
            return {
                loading: false,
                dogs: action.payload,
                error: ''
            }
        case FETCH_DOGS_FAILURE:
            return{
                loading:false,
                dogs:[],
                error: action.payload
            }
        default: return state
}
}

export default reducer