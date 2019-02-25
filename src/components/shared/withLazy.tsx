import React, { ComponentType, lazy } from 'react';
import ErrorBoundary from './ErrorBoundary';

const withLazy = <T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) => {
  const WithLazy = (props: any) => {
    const Component = lazy(factory);

    return (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    );
  };

  return WithLazy;
};

export default withLazy;
