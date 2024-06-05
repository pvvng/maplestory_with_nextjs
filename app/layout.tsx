'use client'

import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from './store';

const queryClient = new QueryClient();

interface RootLayoutProps {
  children: ReactNode;
}

// store 타입 지정
export type RootState = ReturnType<typeof store.getState>

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html>
        <head>
        	<title>메이뿡스토리</title>
        </head>
        <body>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
          </Provider>
        </body>
    </html>
);
};

export default RootLayout;