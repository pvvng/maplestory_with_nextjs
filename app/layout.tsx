'use client'

import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/Navbar';
import { SessionProvider } from 'next-auth/react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import './font.css'

const queryClient = new QueryClient();

interface RootLayoutProps {
  children: ReactNode;
}

// 이미지에 pointer-events 속성을 적용하는 스타일드 컴포넌트 생성
const ImageContainer = styled.div`
  img {
    pointer-events: none;
  }
`;

// store 타입 지정
export type RootState = ReturnType<typeof store.getState>

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html>
        <head>
        	<title>Storify</title>
          <link rel='manifest' href='/manifest.json' />
        </head>
        <body style={{margin:'0px', boxSizing:'border-box'}}>
          <SessionProvider>
            <Provider store={store}>
              <QueryClientProvider client={queryClient}>
                <ImageContainer>
                  <Navbar />
                  {children}
                </ImageContainer>
              </QueryClientProvider>
            </Provider>
          </SessionProvider>
        </body>
    </html>
);
};

export default RootLayout;