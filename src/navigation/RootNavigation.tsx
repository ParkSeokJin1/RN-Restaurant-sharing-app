import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import {MainScreen} from '../screens/MainScreen';
import {AddScreen} from '../screens/AddScreen';
import {DetailScreen} from '../screens/DetailScreen';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

type ScreenParams = {
  Main: undefined;
  Add: {latitude: number; longitude: number; address: string};
  Detail: {
    latitude: number;
    longitude: number;
    address: string;
    name: string;
  };
};

const Stack = createNativeStackNavigator<ScreenParams>();

export const RootNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'containedModal',
      }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Add" component={AddScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export const useRootNavigation = <RouteName extends keyof ScreenParams>() =>
  useNavigation<NativeStackNavigationProp<ScreenParams, RouteName>>();

export const useRootRoute = <RouteName extends keyof ScreenParams>() =>
  useRoute<RouteProp<ScreenParams, RouteName>>();
