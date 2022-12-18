import { LOGIN, GETALLCOMPANIESBYLOCATION, GET_GIFTS } from './actions';

const initialState = {

}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                appReducer: action.data
            }
        case GETALLCOMPANIESBYLOCATION:
            return {
                ...state,
                appReducer: action.data
            }

        case GET_GIFTS:
            return {
                ...state,
                appReducer: action.data
            }
        default:
            return state;
    }
}