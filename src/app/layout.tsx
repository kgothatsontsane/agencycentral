import type { Metadata } from "next";
import { DM_Sans} from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ThemeProvider } from '@/providers/theme-provider'

const font = DM_Sans({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: "AgencyCentral",
  description: "Centralise your workflow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme:dark}}>
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            </head>
            
            <body className={`${font} antialiased`}>
                <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
                >
                
                    {children}
              
                </ThemeProvider>
            </body> 
        </html>
    </ClerkProvider>
  );
}
