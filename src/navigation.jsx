import React       from 'react';
import { NavLink } from 'react-router-dom';

import Icon from '@material-ui/core/Icon';

import { Meta as AddressListMeta }      from './routes/address-list';
import { Meta as BinaryConverterMeta }  from './routes/binary-converter';
import { Meta as GenericConverterMeta } from './routes/generic-converter';

import './navigation.scss';

function FeatureLink({ to, icon, title, description, color, ...props }) {
  return (
    <NavLink
      to={to}
      className={'link'}
      style={{ '--background-color': color }}
      activeClassName={'active'}
      {...props}
    >
      <Icon>{icon}</Icon>
      <span className={"title"}>{title}</span>
      <span className={"description"}>{description}</span>
    </NavLink>
  );
}

export function Navigation() {
  return (
    <nav className={"navigation"}>
      <FeatureLink to={"/"} icon={"home"} title={"Welcome"} exact />
      <FeatureLink
        to={"/address-list"}
        icon={"list"}
        title={AddressListMeta.title}
        description={AddressListMeta.description}
        color={AddressListMeta.color}
      />
      <FeatureLink
        to={'/binary-converter'}
        icon={'image'}
        title={BinaryConverterMeta.title}
        description={BinaryConverterMeta.description}
        color={BinaryConverterMeta.color}
      />
      <FeatureLink
        to={'/generic-converter'}
        icon={'refresh'}
        title={GenericConverterMeta.title}
        description={GenericConverterMeta.description}
        color={GenericConverterMeta.color}
      />
    </nav>
  );
}
