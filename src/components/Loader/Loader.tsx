import React from 'react';
import './Loader.scss';

export const Loader:React.FC = () => {
  return (
    <div className="lds-roller" data-testid='loader'>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
    </div>
  );
};
