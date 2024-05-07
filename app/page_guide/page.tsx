"use client"

import React from 'react';
import FooterMenu from '../components/footerMenu';
import Header from '../components/header';
import PageComponentList from '../components/pageComponentList';
import '../globals.css';
import SearchComponent from '../components/searchComponent';

const Search: React.FC = () => {
  return (
    <div>
        <Header />
        <SearchComponent title='GUIAS CREDÊNCIADOS'/>
        <PageComponentList />
        <FooterMenu activePage="search" />
    </div>
  );
};

export default Search;