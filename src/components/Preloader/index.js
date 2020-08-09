import React from 'react';
import CircleLoader from 'react-spinners/CircleLoader';
import PropTypes, { oneOfType } from 'prop-types';
import './index.scss';

export default function Preloader({ size = '100%' }) {
  return (
    <div className="preloader">
      <CircleLoader size={size} />
    </div>
  );
}

Preloader.propTypes = {
  size: oneOfType([PropTypes.string, PropTypes.number]),
};
