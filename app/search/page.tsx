"use client"

import React from 'react';
import FooterMenu from '../components/footerMenu';
import Header from '../components/header';
import '../globals.css';

const Search: React.FC = () => {
  return (
    <div>
        <Header />
        <div className='content'> 
            <h1 className='text-center'>Habemos Search Page</h1>
        </div>
        <FooterMenu activePage="search" />
    </div>
  );
};

export default Search;