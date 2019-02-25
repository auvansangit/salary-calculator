import React, { Component, ErrorInfo } from 'react';
import { Button } from '@material-ui/core';

interface IError {
  readonly error?: Error;
  readonly errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component {
  state: IError = {
    error: undefined,
    errorInfo: undefined
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  shouldComponentUpdate(nextProps: {}, nextState: IError) {
    if (nextProps) {
    }

    if (this.state.errorInfo && !nextState.errorInfo) {
      return false;
    }

    return true;
  }

  handleRetry = () => {
    this.setState({
      error: undefined,
      errorInfo: undefined
    });
  };

  render() {
    const { error, errorInfo } = this.state;

    if (errorInfo) {
      const errorDetails =
        !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? (
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        ) : (
          undefined
        );

      return (
        <>
          <h2>Oops!!! Something went wrong.</h2>
          {errorDetails}
          <Button variant="outlined" color="primary" onClick={this.handleRetry}>
            Retry
          </Button>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
