import React from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import {TodoList} from '../screens/TodoList/TodoList';
import {MainStackParams, RootTabParams} from './Navigation.types';
import {TodoDetails} from '../screens/TodoDetails/TodoDetails';
import {BackButton} from '../components/BackButton/BackButton';
import {ImgFull} from '../screens/ImgFull/ImgFull';
import {Settings} from '../screens/Settings/Settings';

const MainStack = createNativeStackNavigator<MainStackParams>();
const RootTabs = createBottomTabNavigator<RootTabParams>();

export const navRef = createNavigationContainerRef();

const MainStackNavigation = () => (
  <MainStack.Navigator initialRouteName="TodoList">
    <MainStack.Screen name="TodoList" component={TodoList} />
    <MainStack.Screen
      options={({navigation}) => ({
        title: 'Details',
        headerTitleStyle: {fontSize: 25},
        headerTitleAlign: 'center',
        headerTintColor: 'black',
        headerLeft: () => <BackButton onPress={navigation.goBack} />,
      })}
      name="TodoDetails"
      component={TodoDetails}
    />

    <MainStack.Screen name="ImgFull" component={ImgFull} />
  </MainStack.Navigator>
);

const RootTabNavigator = () => (
  <RootTabs.Navigator
    screenOptions={{
      tabBarActiveTintColor: 'darkred',
      tabBarInactiveTintColor: 'grey',
      tabBarShowLabel: false,
    }}>
    <RootTabs.Screen
      name="Main"
      options={{
        headerShown: false,
        tabBarIcon: props => <Icon name="list" {...props} />,
      }}
      component={MainStackNavigation}
    />
    <RootTabs.Screen
      name="Settings"
      options={{tabBarIcon: props => <Icon name="gear" {...props} />}}
      component={Settings}
    />
  </RootTabs.Navigator>
);

export const Navigation = () => (
  <NavigationContainer ref={navRef}>
    <RootTabNavigator />
  </NavigationContainer>
);
