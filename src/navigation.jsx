import React    from 'react';
import { Link } from 'react-router-dom';

import Icon                            from '@material-ui/core/Icon';

import './navigation.scss';
import { Meta as AddressListMeta }     from './routes/address-list';
import { Meta as BinaryConverterMeta } from './routes/binary-converter';

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
  return <nav>
    <FeatureLink to={'/'} icon={'star'} title={'Welcome'}/>
    <FeatureLink to={'/address-lists'} icon={'star'}
                 title={AddressListMeta.title}
                 description={AddressListMeta.description}/>
    <FeatureLink to={'/binary-converter'} icon={'star'}
                 title={BinaryConverterMeta.title}
                 description={BinaryConverterMeta.description}/>
  </nav>;
}
