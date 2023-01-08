import AsyncStorage from '@react-native-async-storage/async-storage';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const GETALLCOMPANIESBYLOCATION = 'GETALLCOMPANIESBYLOCATION';
export const GET_GIFTS = "GET_GIFTS";
export const UPDATE_WISHLIST = "UPDATE_WISHLIST";
export const GET_WISHLIST = "GET_WISHLIST";
const IP = '10.0.0.20';

export const logout = () => {
    AsyncStorage.removeItem('Account');
    return {
        type: LOGOUT
    }
}

export const loginDispatch = (data) => {
    return dispatch => {
        dispatch({ type: LOGIN, data: data });
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
        dispatch({ type: LOGIN, data: data });
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
        dispatch({ type: UPDATE_WISHLIST, data: data });
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
                        console.log("WishList: No data for you");
                    }
                })
                .catch(err => {
                    console.log("UPDATE_WISHLIST: " + JSON.stringify(err.message));
                });

        } catch (err) {
            console.log("update_wishlist: " + JSON.stringify(err.message));
        }
    }
}


export const find_gift_dispatch = (data) => {
    return dispatch => {
        dispatch({ type: GET_GIFTS, data: data });
    }
}
export const find_gift = (
    token, location, eventTags,
    gender, budget, interestsTags,
    age, locationRadius, related
) => {
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
                        dispatch(find_gift_dispatch(data))
                    } else {
                        console.log("Find Gift: No data for you");
                    }
                })
                .catch(err => {
                    console.log(err.message);
                });
        } catch (error) {
            console.log("find_gift: " + JSON.stringify(error.message));
        }
    }
}


export const get_wishlist_dispatch = (data) => {
    return dispatch => {
        dispatch({ type: GET_WISHLIST, data: data });
    }
}
export const get_wishlist = (token) => {

    return async dispatch => {
        try {

            const url = `http://${IP}:3001/api/account/get_wishlist`;
            const req = await fetch(url, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                }
            });
            req.json()
                .then(data => {
                    if (data.status) {

                        dispatch(get_wishlist_dispatch(data));

                    } else {
                        console.log("GET WISHLIST: No data Found");
                    }
                })
                .catch(err => {
                    console.log("GET WISHLIST: " + JSON.stringify(err.message));
                });

        } catch (error) {
            console.log("get_wishlist: " + JSON.stringify(error.message))
        }
    }

}