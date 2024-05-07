"use client"

import React from 'react';
import FooterMenu from '../components/footerMenu';
import Header from '../components/header';
import LocationComponent from '../components/locationComponent';
import PageComponentList from '../components/pageComponentList';

const Search: React.FC = () => {
  return (
    <div>
      <Header />
      <div className='content'> 
        <h1 className='text-center'>PÁGINA DE BUSCA</h1>
      </div>
      <div style={{ margin: '0 auto', maxWidth: '800px', height: '20vh', padding: '20px' }}> {/* Reduzindo a altura pela metade */}
        <LocationComponent />
      </div>
      <div>
      </div>
      <FooterMenu activePage="search" />
    </div>
  );
};

export default Search;
