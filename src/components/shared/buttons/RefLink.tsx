import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

const RefLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  (props, ref) => <NavLink innerRef={ref} {...props} />
);

export default RefLink;
