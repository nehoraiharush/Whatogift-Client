import AsyncStorage from '@react-native-async-storage/async-storage';

const IP = '10.0.0.10';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const GETALLCOMPANIESBYLOCATION = 'GETALLCOMPANIESBYLOCATION'
export const GET_GIFTS = "GET_GIFTS"



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
    return async dispatch => {
        try {
            const url = `http://${IP}:3001/api/product/get_all_products`;
            console.log("token")
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
            console.log("token2")
            req.json()
                .then(data => {
                    if (data.status) {
                        dispatch(find_gift_dispatch(data))
                    } else {
                        console.log("No data for you");
                    }
                })
                .catch(err => {
                    console.log(err.message);
                });


        } catch (error) {
            console.log("ERRRRRRR" + JSON.stringify(error));
        }
    }
}