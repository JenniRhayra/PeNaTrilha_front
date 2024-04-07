"use client"

import React from 'react';
import FooterMenu from '../components/footerMenu';
import Header from '../components/header';
import '../globals.css';

const Visited: React.FC = () => {
  return (
    <div>
        <Header />
        <div className='content'> 
            <h1 className='text-center'>Habemos Visited Page</h1>
        </div>
        <FooterMenu activePage="visited" />
    </div>
  );
};

export default Visited;