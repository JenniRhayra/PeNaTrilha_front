"use client"

import React from 'react';
import FooterMenu from '../components/footerMenu';
import Header from '../components/header';
import SearchComponent from '../components/searchComponent';
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import Image from 'next/image';
import { useState } from 'react';
import Card from '../components/cardComponent';
import LocationComponent from '../components/locationComponent';
import Grid from "@nextui-org/react"
import GoogleMaps from '../google_maps/page';

//Essa info vai vir da consulta do backend
const parks = [
  {
    title: 'Parque Nacional do Iguaçu',
    image: '/images/parque-iguacu.jpg', // Substitua pelo caminho real da imagem
    description: 'Famoso pelas Cataratas do Iguaçu, uma das novas sete maravilhas da natureza.',
    link: 'https://github.com/JenniRhayra/PeNaTrilha_back/branches'
  },
  {
    title: 'Parque Nacional da Chapada dos Veadeiros',
    image: '/images/parque-carlos-botelho.jpg', // Substitua pelo caminho real da imagem
    description: 'Conhecido por suas paisagens de cerrado, cachoeiras e trilhas deslumbrantes.',
    link: 'https://github.com/JenniRhayra/PeNaTrilha_back/branches'
  },
  {
    title: 'Parque Nacional de Jericoacoara',
    image: '/images/parque-carlos-botelho.jpg', // Substitua pelo caminho real da imagem
    description: 'Popular por suas dunas, lagoas cristalinas e praias paradisíacas.',
    link: 'https://github.com/JenniRhayra/PeNaTrilha_back/branches'
  },
  {
    title: 'Parque Nacional do Iguaçu',
    image: '/images/parque-iguacu.jpg', // Substitua pelo caminho real da imagem
    description: 'Famoso pelas Cataratas do Iguaçu, uma das novas sete maravilhas da natureza.',
    link: 'https://github.com/JenniRhayra/PeNaTrilha_back/branches'
  },
  {
    title: 'Parque Nacional do Iguaçu',
    image: '/images/parque-iguacu.jpg', // Substitua pelo caminho real da imagem
    description: 'Famoso pelas Cataratas do Iguaçu, uma das novas sete maravilhas da natureza.',
    link: 'https://github.com/JenniRhayra/PeNaTrilha_back/branches'
  },
  {
    title: 'Parque Nacional do Iguaçu',
    image: '/images/parque-iguacu.jpg', // Substitua pelo caminho real da imagem
    description: 'Famoso pelas Cataratas do Iguaçu, uma das novas sete maravilhas da natureza.',
    link: 'https://github.com/JenniRhayra/PeNaTrilha_back/branches'
  }
];

const items = [
  {
    key: "parque",
    label: "Parques",
  },
  {
    key: "guia",
    label: "Guias",
  },
  {
    key: "trilha",
    label: "Trilhas",
  }
];

const Search: React.FC = () => {

  const [isDivVisible, setIsDivVisible] = useState(false);

  const handleImageClick = () => {
    setIsDivVisible(!isDivVisible);
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div style={{ marginTop: '0.5rem', padding: '16px' }}>
        <LocationComponent />
        <SearchComponent title='' />
        <br />
      </div>
      <GoogleMaps />
      <div style={{ marginTop: '9rem', padding: '16px' }}>
        <Image
          src="/images/filtro.png"
          alt="filtro"
          width={25}
          height={25}
          onClick={handleImageClick}

        />
        {isDivVisible && (
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Autocomplete
              //label="Favorite Animal"
              placeholder="Escolha um filtro"
              variant="bordered"
              defaultItems={items}
              //startContent={<PetIcon className="text-xl" />}
              className="max-w-xs"
            >
              {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
            </Autocomplete>
          </div>
        )}

        {parks.map((park, index) => (
          <div key={index}>
            <Card
              title={park.title}
              image={park.image}
              description={park.description}
              link={park.link}
            />
            <br></br>
          </div>
        ))}
      </div>
      <FooterMenu activePage='search'></FooterMenu>

    </>
  );
};

export default Search;

