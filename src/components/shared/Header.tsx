import React from 'react';
import { useTranslation } from 'react-i18next';

import { AppBar, Toolbar, Grid, Link, IconButton } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

import LinkButton from '../buttons/LinkButton';
import GitHub from '../icons/GitHub';
import Twitter from '../icons/Twitter';

const useStyles = makeStyles((theme: Theme) => ({
  grow: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  container: {
    margin: '0 auto',
    display: 'flex'
  },
  homeButton: {
    width: theme.spacing(28),
    textAlign: 'center'
  },
  button: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    color: '#fff'
  },
  selected: {
    color: '#fff'
  }
}));

const Links = [
  {
    url: 'http://github.com/auvansang/salary-calculator',
    title: 'Sang Au - GitHub',
    icon: <GitHub />
  },
  {
    url: 'https://twitter.com/auvansang',
    title: 'Sang Au - Twitter',
    icon: <Twitter />
  }
];

const Header = () => {
  const classes = useStyles();
  const [t] = useTranslation('homePage');

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar disableGutters>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={10}
            md={8}
            lg={6}
            className={classes.container}
          >
            <LinkButton
              variant="outlined"
              to={'/'}
              className={classes.homeButton}
              exact={true}
              activeClassName={classes.selected}
            >
              {t('homePage')}
            </LinkButton>
            <span className={classes.grow} />
            {Links.map((value, index) => (
              <Link
                key={index}
                href={value.url}
                title={value.title}
                target="_blank"
              >
                <IconButton className={classes.button}>{value.icon}</IconButton>
              </Link>
            ))}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
