import AsyncStorage from '@react-native-async-storage/async-storage';

const IP = '10.0.0.12';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const GETALLCOMPANIESBYLOCATION = 'GETALLCOMPANIESBYLOCATION'

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

export const getAllCompaniesByLocationDispatch = () => {
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
                console.log(JSON.stringify(data));
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