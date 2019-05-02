import React, { memo } from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    height: 64,
    width: 64
  }
});

const Loading = memo(() => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <CircularProgress className={classes.loading} size={64} />
    </section>
  );
});

export default Loading;
