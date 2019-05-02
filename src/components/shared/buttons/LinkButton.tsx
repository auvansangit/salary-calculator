import React from 'react';
import { NavLinkProps } from 'react-router-dom';

import Button, { ButtonProps } from '@material-ui/core/Button';

import RefLink from './RefLink';

type Props = ButtonProps & NavLinkProps;

const LinkButton = (props: Props) => {
  return <Button component={RefLink as any} {...props} />;
};

export default LinkButton;
