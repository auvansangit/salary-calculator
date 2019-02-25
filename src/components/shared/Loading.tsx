import React, { memo } from 'react';
import { CircularProgress } from '@material-ui/core';

const Loading = memo(() => {
  return <CircularProgress />;
});

export default Loading;
