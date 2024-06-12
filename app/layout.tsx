import React, { ReactNode } from 'react';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './font.css'
import ReactQueryProvider from './providers/ReactQueryProvider';
import ReduxProvider from './providers/ReduxProvider';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { Metadata } from 'next';

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Storify',
  description: '메이플스토리 BGM/OST 웹 플레이어 Storify 입니다.',
}
 
const RootLayout: React.FC<RootLayoutProps> = async ({ children }) => {

  const session = await getServerSession(authOptions);

  return (
    <html lang="ko">
        <head>
        	<title>Storify</title>
          <link rel='manifest' href='/manifest.json' />
        </head>
        <body style={{margin:'0px', boxSizing:'border-box'}}>
          <ReduxProvider>
            <ReactQueryProvider >
              {/* <ImageContainer> */}
                <Navbar session={session} />
                {children}
              {/* </ImageContainer> */}
            </ReactQueryProvider>
          </ReduxProvider>
        </body>
    </html>
);
};

export default RootLayout;