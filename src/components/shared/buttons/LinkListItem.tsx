import React from 'react';
import { NavLinkProps } from 'react-router-dom';

import ListItem, { ListItemProps } from '@material-ui/core/ListItem';

import RefLink from './RefLink';

type Props = ListItemProps & NavLinkProps;

const LinkListItem = (props: Props) => {
  return <ListItem component={RefLink as any} {...props} button />;
};

export default LinkListItem;
