'use client'
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';

interface Props {
  children: React.ReactNode;
}

// store 타입 지정
export type RootState = ReturnType<typeof store.getState>

const ReduxProvider: React.FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;