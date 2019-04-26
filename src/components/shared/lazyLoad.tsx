import React, { ComponentType, lazy } from 'react';
import ErrorBoundary from './ErrorBoundary';

const lazyLoad = <T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) => {
  const lazyLoad = (props: any) => {
    const Component = lazy(factory);

    return (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    );
  };

  return lazyLoad;
};

export default lazyLoad;
