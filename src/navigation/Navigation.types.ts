import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootTabParams = {
  Main: undefined;
  Settings: undefined;
};

export type MainStackParams = {
  TodoList: undefined;
  TodoDetails: {
    todoId: number;
  };
  ImgFull: {
    uri: string;
    todoId: number;
  };
};

export type TodoListNavigationProp = NativeStackNavigationProp<
  MainStackParams,
  'TodoList'
>;

export type TodoDetailsRouteProp = RouteProp<MainStackParams, 'TodoDetails'>;
export type TodoDetailsNavigationProp = NativeStackNavigationProp<
  MainStackParams,
  'TodoDetails'
>;

export type ImgFullRouteProp = RouteProp<MainStackParams, 'ImgFull'>;
export type ImgFullNavigationProp = NativeStackNavigationProp<
  MainStackParams,
  'ImgFull'
>;
