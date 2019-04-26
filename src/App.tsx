import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from './theme';

import { ErrorBoundary, Loading } from 'components/shared';
import routes from './routes';

const baseUrl = process.env.PUBLIC_URL;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename={baseUrl}>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>{renderRoutes(routes)}</Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
