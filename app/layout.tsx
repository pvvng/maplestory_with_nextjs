'use client'

import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html>
        <head>
        	<title>My App</title>
        </head>
        <body>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </body>
    </html>
);
};

export default RootLayout;