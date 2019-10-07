import React    from 'react';
import { Link } from 'react-router-dom';

import Icon from '@material-ui/core/Icon';

import { Meta as AddressListMeta }     from './routes/address-list';
import { Meta as BinaryConverterMeta } from './routes/binary-converter';

import './navigation.scss';

function FeatureLink({ to, icon, title, description }) {
  return (
    <Link to={to}>
      <Icon>{icon}</Icon>
      <span className={'title'}>{title}</span>
      <span className={'description'}>{description}</span>
    </Link>
  );
}

export function Navigation() {
  return <nav className={'navigation'}>
    <FeatureLink to={'/'} icon={'star'} title={'Welcome'}/>
    <FeatureLink to={'/address-list'} icon={'star'}
                 title={AddressListMeta.title}
                 description={AddressListMeta.description}/>
    <FeatureLink to={'/binary-converter'} icon={'star'}
                 title={BinaryConverterMeta.title}
                 description={BinaryConverterMeta.description}/>
  </nav>;
}
