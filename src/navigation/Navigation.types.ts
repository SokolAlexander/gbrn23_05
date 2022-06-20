import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParams = {
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
  RootStackParams,
  'TodoList'
>;

export type TodoDetailsRouteProp = RouteProp<RootStackParams, 'TodoDetails'>;
export type TodoDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  'TodoDetails'
>;

export type ImgFullRouteProp = RouteProp<RootStackParams, 'ImgFull'>;
export type ImgFullNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  'ImgFull'
>;
