import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import rootReducer from './reducer';
import {Action, TodosState} from './types';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer<TodosState, Action>(
  persistConfig,
  rootReducer,
);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
