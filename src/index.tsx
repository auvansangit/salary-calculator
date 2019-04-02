import './assets/scss/site.scss';
import './locales/i18n';

import React from 'react';
import ReactDom from 'react-dom';

import App from './App';

import * as serviceWorker from './serviceWorker';

function renderApp() {
  const rootElement = document.getElementById('root')!;
  let renderFn = ReactDom.render;

  if (rootElement.hasChildNodes()) {
    renderFn = ReactDom.hydrate;
  }

  renderFn(<App />, rootElement);
}

renderApp();

serviceWorker.register();

if (module.hot) {
  module.hot.accept('./App.tsx', renderApp);
}
