'use client';

// Css
import './global.css';
import 'react-toastify/dist/ReactToastify.css';
import 'simplebar-react/dist/simplebar.min.css';
import 'react-quill/dist/quill.snow.css'; /* quill editor CSS */

// redux
import { store, persistor } from '@/redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

// context
import { CollapseDrawerProvider } from '@/contexts/CollapseDrawerContext';


// components
import LoadingScreen from '@/components/LoadingScreen';

// theme
import ThemeConfig from '@/theme';

// material
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import ScrollToTop from '@/components/ScrollToTop';
import { Toaster } from 'react-hot-toast';
import AppInit from '@/guards/AppInit';

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <title>Tiffin Stash</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Web site created using create-react-app" />

        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />

        <link rel="manifest" href="manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ReduxProvider store={store}>
          <PersistGate loading={<LoadingScreen />} persistor={persistor}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <CollapseDrawerProvider>
                {/* Toaster */}
                <Toaster
                  position="top-center"
                  reverseOrder={false}
                />
                <AppInit> 
                  <ThemeConfig>
                    <ScrollToTop />
                    {children}
                  </ThemeConfig>
                </AppInit>
              </CollapseDrawerProvider>
            </LocalizationProvider>
          </PersistGate>
        </ReduxProvider>
      </body>
    </html>
  )
}
