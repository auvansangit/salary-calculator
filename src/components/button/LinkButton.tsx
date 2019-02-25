import React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { NavLink, NavLinkProps } from 'react-router-dom';

type Props = ButtonProps & NavLinkProps;

const LinkButton = (props: Props) => {
  return <Button component={NavLink} {...props as any} />;
};

export default LinkButton;
