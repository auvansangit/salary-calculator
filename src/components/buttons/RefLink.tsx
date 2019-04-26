import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

const RefLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  (props, ref) => <NavLink {...props} innerRef={ref} />
);

export default RefLink;
