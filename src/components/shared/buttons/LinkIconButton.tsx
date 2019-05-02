import React from 'react';
import { NavLinkProps } from 'react-router-dom';

import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';

import RefLink from './RefLink';

type Props = IconButtonProps & NavLinkProps;

const LinkIconButton = (props: Props) => {
  return <IconButton component={RefLink as any} {...props} />;
};

export default LinkIconButton;
