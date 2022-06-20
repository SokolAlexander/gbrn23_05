import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {TodoList} from '../screens/TodoList/TodoList';
import {RootStackParams} from './Navigation.types';
import {TodoDetails} from '../screens/TodoDetails/TodoDetails';
import {BackButton} from '../components/BackButton/BackButton';
import {ImgFull} from '../screens/ImgFull/ImgFull';

const RootStack = createNativeStackNavigator<RootStackParams>();

export const Navigation = () => (
  <NavigationContainer>
    <RootStack.Navigator initialRouteName="TodoList">
      <RootStack.Group>
        <RootStack.Screen name="TodoList" component={TodoList} />
        <RootStack.Screen
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
      </RootStack.Group>

      <RootStack.Group screenOptions={{presentation: 'transparentModal'}}>
        <RootStack.Screen name="ImgFull" component={ImgFull} />
      </RootStack.Group>
    </RootStack.Navigator>
  </NavigationContainer>
);
