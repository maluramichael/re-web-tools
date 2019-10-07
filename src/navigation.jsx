import React       from 'react';
import { NavLink } from 'react-router-dom';

import Icon from '@material-ui/core/Icon';

import { Meta as AddressListMeta }     from './routes/address-list';
import { Meta as BinaryConverterMeta } from './routes/binary-converter';

import './navigation.scss';

function FeatureLink({ to, icon, title, description, color }) {
  return (
    <NavLink to={to} className={'link'} style={{ backgroundColor: color || 'crimson' }} activeClassName={'active'}>
      <Icon>{icon}</Icon>
      <span className={'title'}>{title}</span>
      <span className={'description'}>{description}</span>
    </NavLink>
  );
}

export function Navigation() {
  return <nav className={'navigation'}>
    <FeatureLink to={'/'} icon={'star'} title={'Welcome'}/>
    <FeatureLink to={'/address-list'} icon={'star'}
                 title={AddressListMeta.title}
                 description={AddressListMeta.description}
                 color={AddressListMeta.color}/>
    <FeatureLink to={'/binary-converter'} icon={'star'}
                 title={BinaryConverterMeta.title}
                 description={BinaryConverterMeta.description}
                 color={BinaryConverterMeta.color}/>
  </nav>;
}
