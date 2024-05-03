"use client"

import React from 'react';
import FooterMenu from '../components/footerMenu';
import Header from '../components/header';
import PageComponentList from '../components/pageComponentList';
import '../globals.css';

const Search: React.FC = () => {
  return (
    <div>
        <Header />
        <PageComponentList />
        <FooterMenu activePage="search" />
    </div>
  );
};

export default Search;