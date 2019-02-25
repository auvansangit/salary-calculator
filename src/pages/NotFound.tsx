import React from 'react';
import Helmet from 'react-helmet';
import { Typography } from '@material-ui/core';

type Props = {
  location: Location;
};

const NotFound = (props: Props) => {
  return (
    <>
      <Helmet
        title={'404 Not found - Salary Calculator'}
        meta={[
          {
            name: 'description',
            content: '404 Not found - Salary Calculator'
          }
        ]}
      />
      <Typography variant="h1">404 Not found</Typography>
      <Typography variant="h2">
        No match found for <code>{props.location.pathname}</code>
      </Typography>
    </>
  );
};

export default NotFound;
