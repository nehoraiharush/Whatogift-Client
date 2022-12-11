import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { TabsNavigator, AccountStack } from './src/navigation';
import React, { useCallback, useEffect, useState } from 'react';

import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { combineReducers, applyMiddleware, createStore } from 'redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

import reducers from './store/reducers';

const rootReducer = combineReducers({
  appReducer: reducers
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState('');

  const hasToken = useCallback(async () => {

    const dataFromAsync = await AsyncStorage.getItem('Account');
    if (dataFromAsync != null) {
      const data = JSON.parse(dataFromAsync);
      setToken(data.token)
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [setToken])

  useEffect(() => {
    hasToken();

  }, [hasToken])


  return (
    <Provider store={store}>
      <NavigationContainer>
        {
          isLogin ? (<TabsNavigator />) : (<AccountStack />)
        }
      </NavigationContainer>
    </Provider>
  );
}
