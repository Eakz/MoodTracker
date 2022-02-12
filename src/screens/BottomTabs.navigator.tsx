import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Text} from 'react-native';
import {AnalyticsIcon, HistoryIcon, HomeIcon} from '../components/Icons';
import {theme} from '../theme';
import {Anaylytics} from './Analytics.screen';
import {History} from './History.screen';
import {Home} from './Home.screen';

const BottomTabs = createBottomTabNavigator();
enum routes {
  home = 'Home',
  history = 'History',
  analytics = 'Analytics',
}

export const BottomTabsNavigator: React.FC = () => {
  return (
    <BottomTabs.Navigator
      initialRouteName={routes.home}
      screenOptions={({route: {name}}) => ({
        tabBarActiveTintColor: theme.colorBlue,
        tabBarInactiveTintColor: theme.colorGrey,
        tabBarShowLabel: false,
        tabBarIcon: ({focused, size}) => {
          const getColor = (f: boolean): string =>
            !f ? theme.colorGrey : theme.colorBlue;
          switch (name) {
            case routes.home:
              return <HomeIcon size={size} color={getColor(focused)} />;
            case routes.history:
              return <HistoryIcon size={size} color={getColor(focused)} />;
            case routes.analytics:
              return <AnalyticsIcon size={size} color={getColor(focused)} />;
            default:
              return <Text>name</Text>;
          }
        },
      })}>
      <BottomTabs.Screen
        name="Home"
        component={Home}
        options={{title: "Today's mood"}}
      />
      <BottomTabs.Screen
        name="History"
        component={History}
        options={{title: 'Past Moods'}}
      />
      <BottomTabs.Screen
        name="Analytics"
        component={Anaylytics}
        options={{title: 'Graph'}}
      />
    </BottomTabs.Navigator>
  );
};
