"use client"

import React from 'react';
import FooterMenu from '../components/footerMenu';
import Header from '../components/header';
import '../globals.css';

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <div className='content'>
        <h1 className='text-center'>Habemos Home Page</h1>
      </div>
      <FooterMenu activePage="home" />
    </div>
  );
};

export default Home;