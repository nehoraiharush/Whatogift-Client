import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { TabsNavigator, AccountStack } from './src/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import firebase from './src/utilies/firebaseConfig';

import reducers from './store/reducers';
const rootReducer = combineReducers({
  appReducer: reducers,
  giftList: reducers,
  wishlist: reducers
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState('');

  const hasToken = useCallback(async () => {

    const dataFromAsync = await AsyncStorage.getItem('Account');
    if (dataFromAsync != null) {
      const data = JSON.parse(dataFromAsync);
      setToken(data.token);
      console.log(token)
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [setToken])

  useEffect(() => {
    hasToken();

  }, [hasToken])

  const [isAuth, setIsAuth] = useState(false);
  if (firebase.apps.length > 0) {
    firebase.auth().onAuthStateChanged((user) => {
      setIsAuth(!!user)
    })
  }


  return (
    <Provider store={store}>
      <NavigationContainer>
        {
          isAuth ? (<TabsNavigator />) : (<AccountStack />)
        }
      </NavigationContainer>
    </Provider>
  );
}
