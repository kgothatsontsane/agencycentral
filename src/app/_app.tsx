// _app.tsx
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import type { AppProps } from 'next/app';
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <Component {...pageProps} />
        </ClerkProvider>
    );
}

export default MyApp;