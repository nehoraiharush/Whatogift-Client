import { LOGIN, GETALLCOMPANIESBYLOCATION, GET_GIFTS, UPDATE_WISHLIST, GET_WISHLIST } from './actions';

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
                giftList: action.data
            }
        case UPDATE_WISHLIST:
            return {
                ...state,
                appReducer: action.data
            }
        case GET_WISHLIST:
            return {
                ...state,
                wishlist: action.data
            }
        default:
            return state;
    }
}