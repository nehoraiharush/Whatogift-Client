import { LOGIN, GETALLCOMPANIESBYLOCATION, GET_GIFTS, UPDATE_WISHLIST, GET_MY_DATA, GET_ALL_PRODUCTS } from './actions';

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
                releventGifts: action.data
            }
        case UPDATE_WISHLIST:
            return {
                ...state,
                appReducer: action.data
            }
        case GET_MY_DATA:
            return {
                ...state,
                myData: action.data
            }
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                giftList: action.data
            }
        default:
            return state;
    }
}