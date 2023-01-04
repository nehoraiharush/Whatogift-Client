import AsyncStorage from '@react-native-async-storage/async-storage';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const GETALLCOMPANIESBYLOCATION = 'GETALLCOMPANIESBYLOCATION';
export const GET_GIFTS = "GET_GIFTS";
export const UPDATE_WISHLIST = "UPDATE_WISHLIST";
const IP = '10.70.1.186';

export const logout = () => {
    AsyncStorage.removeItem('Account');
    return {
        type: LOGOUT
    }
}

export const loginDispatch = (data) => {
    return dispatch => {
        dispatch({ type: LOGIN, data });
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const url = `http://${IP}:3001/api/account/login`;
            const req = await fetch(url, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });
            const data = await req.json();
            if (data.status) {

                AsyncStorage.setItem('Account', JSON.stringify({
                    token: data.token,
                    _id: data.message._id,
                    firstName: data.message.firstName,
                    lastName: data.message.lastName,
                    email: data.message.email,
                    avatar: data.message.avatar
                }));
                dispatch(loginDispatch(data));

            } else {
                let message = data.message;
                throw new Error(message);
            }

        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export const signup = (email, password, firstName, lastName, uid) => {
    return async dispatch => {
        try {
            const url = `http://${IP}:3001/api/account/signUp`;
            const req = await fetch(url, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    uid: uid
                }),
            });
            const data = await req.json();
            if (data.status) {

                AsyncStorage.setItem('Account', JSON.stringify({
                    token: data.token,
                    _id: data.message._id,
                    firstName: data.message.firstName,
                    lastName: data.message.lastName,
                    email: data.message.email,
                    avatar: data.message.avatar
                }));
                dispatch(loginDispatch(data));

            } else {
                let message = data.message;
                throw new Error(message);
            }

        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export const getAllCompaniesByLocationDispatch = () => {
    return dispatch => {
        dispatch({ type: LOGIN, data });
    }
}



export const getAllCompaniesByLocation = (token, location) => {
    return async dispatch => {
        try {
            const url = `http://${IP}:3001/api/company/get_companies_by_location`;
            const req = await fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                }),
            });
            const data = await req.json();
            if (data.status) {
                //console.log(JSON.stringify(data));
                dispatch(getAllCompaniesByLocationDispatch(data.message));

            } else {
                let message = data.message;
                throw new Error(message);
            }

        } catch (error) {
            throw new Error(error.message);
        }
    }
}


export const updateWishListDispatch = (data) => {
    return dispatch => {
        dispatch({ type: UPDATE_WISHLIST, data });
    }
}

export const updateWishList = (token, favoriets, typeOfAction) => {
    return async dispatch => {
        try {
            const url = `http://${IP}:3001/api/account/add_to_favorites`;
            const req = await fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,

                },
                body: JSON.stringify({
                    favorites: favoriets,
                    typeOfAction: typeOfAction
                })
            });
            req.json()
                .then(data => {
                    if (data.status) {
                        dispatch(updateWishListDispatch(data))
                    } else {
                        console.log("No data for you");
                    }
                })
                .catch(err => {
                    console.log(err.message);
                });

        } catch (err) {
            console.log("ERROR" + JSON.stringify(err.message));
        }
    }

}


export const find_gift_dispatch = (data) => {
    return dispatch => {
        dispatch({ type: GET_GIFTS, data });
    }
}
export const find_gift = (
    token, location, eventTags,
    gender, budget, interestsTags,
    age, locationRadius, related
) => {
    console.log(token);
    return async dispatch => {
        try {
            const url = `http://${IP}:3001/api/product/get_all_products`;
            const req = await fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,

                },
                body: JSON.stringify({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    eventTags: eventTags,
                    gender: gender,
                    budget: budget,
                    interestsTags: interestsTags,
                    age: age,
                    locationRadius: locationRadius,
                    related: related
                })
            });
            req.json()
                .then(data => {
                    if (data.status) {
                        console.log(data)
                        dispatch(find_gift_dispatch(data))
                    } else {
                        console.log("No data for you");
                    }
                })
                .catch(err => {
                    console.log(err.message);
                });
        } catch (error) {
            console.log("ERRRRRRR" + JSON.stringify(error.message));
        }
    }
}