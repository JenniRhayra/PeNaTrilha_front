"use client"

import React from 'react';
import FooterMenu from '../components/footerMenu';
import Header from '../components/header';
import '../globals.css';

const Profile: React.FC = () => {
  return (
    <div>
        <Header />
        <div className='content'> 
            <h1 className='text-center'>Habemos Profile Page</h1>
        </div>
        <FooterMenu activePage="profile" />
    </div>
  );
};

export default Profile;