import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSliceReducer } from './slices/ingredientsSlice';
import { burgerConstructorSliceReducer } from './slices/burgerConstructorSlice';
import { feedsSliceReducer } from './slices/feedsSlice';
import { userSliceReducer } from './slices/userSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsSliceReducer,
  constructorItems: burgerConstructorSliceReducer,
  feeds: feedsSliceReducer,
  auth: userSliceReducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
