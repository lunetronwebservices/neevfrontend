import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Provider } from 'react-redux';
import { store } from '@/redux/store/store';
import AuthGuard from '@/guards/AuthGuard';
import ReduxProvider from '@/redux/ReduxProvider';

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ReduxProvider>
          <ThemeProvider>
            <SidebarProvider>


              {/* <AuthGuard allowedRoles={["organization", "admin", "operation"]}> */}
              {/* <AuthGuard>
              </AuthGuard> */}
              {children}

            </SidebarProvider>

          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
