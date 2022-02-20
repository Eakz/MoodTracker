import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Platform, UIManager} from 'react-native';
import {AppProvider} from './App.provider';
import {BottomTabsNavigator} from './screens/BottomTabs.navigator';
import SplashScreen from 'react-native-splash-screen';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <AppProvider>
      <NavigationContainer>
        <BottomTabsNavigator />
      </NavigationContainer>
    </AppProvider>
  );
};
