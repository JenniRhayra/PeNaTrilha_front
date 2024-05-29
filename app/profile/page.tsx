"use client"

import React from 'react';
import FooterMenu from '../components/footerMenu';
import Header from '../components/header';
import '../globals.css';
import { Avatar } from '@nextui-org/react';
const Profile: React.FC = () => {
  return (
    <div>
        <Header />
        <div className='perfil' style={{paddingTop:'5rem', paddingLeft:'1rem'}}> 
          <div id='imagem'>
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-20 h-20 text-large mt-3" />
          </div>
          <div id='infoPerfil'>
            <h1 style={{color:'#4D5D47', fontWeight:'700'}}> MEU PERFIL </h1>
          </div>
        </div>
        <FooterMenu activePage="profile" />
    </div>
  );
};

export default Profile;