"use client"

import React, { useContext } from 'react';
import FooterMenu from '../components/footerMenu';
import Header from '../components/header';
import SearchComponent from '../components/searchComponent';
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useState } from 'react';
import Card from '../components/cardComponent';
import LocationComponent from '../components/locationComponent';
import Image from 'next/image';





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



const Search: React.FC = () => {
  const items = [
    {
      value: "test",
      label: "Parques",
    },
    {
      value: "guia",
      label: "Guias",
    },
    {
      value: "atividade",
      label: "Atividades",
    }
  ];

  const [isDivVisible, setIsDivVisible] = useState(false);
  const [value, setSelectedFilter] = React.useState<React.Key>("parques");

  const handleFilterClick = () => {
    setIsDivVisible(!isDivVisible);
  };

  const handleSortClick = () => {

  };


  return (
    <>
      <div>
        <Header></Header>
      </div>
      <div id='conteinerBusca' style={{ marginTop: '0.5rem', padding: '16px' }}>
        <SearchComponent title='Parques' term={value ? value.toString() : undefined}></SearchComponent>
        <br></br>
      </div>

      <div className="flex w-full flex-wrap md:flex-wrap mb-6 md:mb-0 gap-4 mt-36 px-4">
        <div className="flex w-full justify-between">
          <div>
            <Image id='filtro'
              src="/images/filtro.png"
              alt="filtro"
              width={25}
              onClick={handleFilterClick}
              height={25}
            />
            <label htmlFor="filtro" className='block'> Filtrar </label>
          </div>

          <div className="md:self-end">
            <Image id='ordenar'
              src="/images/sort.png"
              alt="ordenar"
              width={25}
              height={25}
              onClick={handleSortClick}
            />
            <label htmlFor="ordenar" className='block'> Ordenar</label>
          </div>
        </div>

        {isDivVisible && (
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-center">
            <Autocomplete
              //label="Favorite Animal"
              placeholder="Escolha um filtro"
              variant="bordered"
              defaultItems={items}
              //startContent={<PetIcon className="text-xl" />}
              className="max-w-xs"
              selectedKey={value}
              onSelectionChange={setSelectedFilter}
            >
              {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
            </Autocomplete>


            <div id="filtroSelecionado"> Filtro selecionado: {value} </div>


          </div>
        )}
        <div id='cardsConteiner' className='w-full flex flex-wrap justify-center'>
          {parks.map((park, index) => (
            <div key={index}>
              <Card
                title={park.title}
                image={park.image}
                description={park.description}
                link={park.link}
                distancia={'3.6KM'}

              />
            </div>
          ))}
        </div>

      </div>
      <FooterMenu activePage='search'></FooterMenu>

    </>
  );
};

export default Search;

