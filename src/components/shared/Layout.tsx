import React, { Suspense } from 'react';
import { RouteConfig, renderRoutes } from 'react-router-config';

import { Grid } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

import Header from './Header';
import Loading from './Loading';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex'
  },
  container: {
    margin: `${theme.spacing(2)}px auto`
  },
  toolbar: theme.mixins.toolbar
}));

type Props = {
  route?: RouteConfig;
};

const Layout = (props: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <Grid container>
        <Grid item xs={12} sm={10} md={8} lg={6} className={classes.container}>
          <div className={classes.toolbar} />
          <Suspense fallback={<Loading />}>
            {renderRoutes(props.route!.routes)}
          </Suspense>
        </Grid>
      </Grid>
    </div>
  );
};

export default Layout;
