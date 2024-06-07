'use client'

import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/Navbar';
import { SessionProvider } from 'next-auth/react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        {/* 가로 스크롤바 없애놓음. 나중에 필요하면 꺼내셈 */}
        <body style={{margin:'0px', boxSizing:'border-box', background:'black',}}>
          <SessionProvider>
            <Provider store={store}>
              <QueryClientProvider client={queryClient}>
                <Navbar />
                {children}
              </QueryClientProvider>
            </Provider>
          </SessionProvider>
        </body>
    </html>
);
};

export default RootLayout;