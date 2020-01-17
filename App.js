import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import MealsNavigator from './navigation/MealsNavigator';

import mealsReducer from './store/reducers/meals';
import { createStackNavigator } from 'react-navigation-stack';

// improve the performance for rendering screens into mobile devices
enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer
});

const store = createStore(rootReducer);


const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf'),
  });
}

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

  // while fonts are not loaded...
  if(!fontLoaded) {
    return ( 
    <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)}
    /> );
  }

  return (
    <Provider store={store}><MealsNavigator/></Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});