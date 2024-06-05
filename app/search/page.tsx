"use client"

import React, { useContext } from 'react';
import FooterMenu from '../components/footerMenu';
import Header from '../components/header';
import SearchComponent from '../components/searchComponent';
import { Autocomplete, AutocompleteItem} from "@nextui-org/react";
import { useState } from 'react';
import Card from '../components/cardComponent';
import LocationComponent from '../components/locationComponent';
import Image from 'next/image';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

//Essa info vai vir da consulta do backend
const parksList = [
  {
    title: 'Parque A',
    image: '/images/parque-iguacu.jpg', // Substitua pelo caminho real da imagem
    description: 'Famoso pelas Cataratas do Iguaçu, uma das novas sete maravilhas da natureza.',
    link: 'https://github.com/JenniRhayra/PeNaTrilha_back/branches'
  },
  {
    title: 'Parque C',
    image: '/images/parque-carlos-botelho.jpg', // Substitua pelo caminho real da imagem
    description: 'Conhecido por suas paisagens de cerrado, cachoeiras e trilhas deslumbrantes.',
    link: 'https://github.com/JenniRhayra/PeNaTrilha_back/branches'
  },
  {
    title: 'Parque B',
    image: '/images/parque-carlos-botelho.jpg', // Substitua pelo caminho real da imagem
    description: 'Popular por suas dunas, lagoas cristalinas e praias paradisíacas.',
    link: 'https://github.com/JenniRhayra/PeNaTrilha_back/branches'
  },
  {
    title: 'Parque D',
    image: '/images/parque-iguacu.jpg', // Substitua pelo caminho real da imagem
    description: 'Famoso pelas Cataratas do Iguaçu, uma das novas sete maravilhas da natureza.',
    link: 'https://github.com/JenniRhayra/PeNaTrilha_back/branches'
  },
  {
    title: 'Parque F',
    image: '/images/parque-iguacu.jpg', // Substitua pelo caminho real da imagem
    description: 'Famoso pelas Cataratas do Iguaçu, uma das novas sete maravilhas da natureza.',
    link: 'https://github.com/JenniRhayra/PeNaTrilha_back/branches'
  },
  {
    title: 'Parque E',
    image: '/images/parque-iguacu.jpg', // Substitua pelo caminho real da imagem
    description: 'Famoso pelas Cataratas do Iguaçu, uma das novas sete maravilhas da natureza.',
    link: 'https://github.com/JenniRhayra/PeNaTrilha_back/branches'
  },
  {
    title: 'Parque H',
    image: '/images/parque-iguacu.jpg', // Substitua pelo caminho real da imagem
    description: 'Famoso pelas Cataratas do Iguaçu, uma das novas sete maravilhas da natureza.',
    link: 'https://github.com/JenniRhayra/PeNaTrilha_back/branches'
  },
  {
    title: 'Parque G',
    image: '/images/parque-iguacu.jpg', // Substitua pelo caminho real da imagem
    description: 'Famoso pelas Cataratas do Iguaçu, uma das novas sete maravilhas da natureza.',
    link: 'https://github.com/JenniRhayra/PeNaTrilha_back/branches'
  }
];

const Search: React.FC = () => {

  const itemsFilterPrincipal = [
    {
      value: "p",
      label: "Parques",
    },
    {
      value: "g",
      label: "Guias",
    },
    {
      value: "a",
      label: "Atividades",
    }
  ];

  const sortOptions = [
    'A-Z',
    'Z-A',
    'Mais próximos'
  ];
 
  const [isDivFilterVisible, setDivFilterVisible] = useState(false);
  const [sliderValue, setSliderValue] = React.useState<number>(5);
  const [filterValue, setSelectedFilter] = React.useState<React.Key>("p");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedSortIndex, setSelectedIndex] = React.useState(0);
  const [parks, setParks] = useState<any[]>(parksList);

  const open = Boolean(anchorEl);

  const handleFilterClick = () => {
    setDivFilterVisible(!isDivFilterVisible);
  };

  const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOrderOfResults = () => {
    switch(selectedSortIndex){
      //A-Z
      case 0:
        setParks(sortAlphabetically(parksList));
        console.log(parks);
        break;
      //Z-A
      case 1:
        setParks(sortAlphabeticallyDesc(parksList));
        console.log(parks);
        break;
      //Mais próximos
      case 2:
        break;
        default: '';
    }
  }

  const sortAlphabetically = (p: any): any => {
    return parksList.slice().sort((a, b) => a.title.localeCompare(b.title));
  }

  const sortAlphabeticallyDesc = (p: any): any => {
    return parksList.slice().sort((a, b) => b.title.localeCompare(a.title));
  }

  const handleSortItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    handleOrderOfResults();
  };

  const handleCloseSort = () => {
    setAnchorEl(null);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };

  return (
    <>
      <div>
        <Header></Header>
      </div>
      
      <div id='conteinerBusca' style={{ marginTop: '3rem', marginLeft: '8rem', alignItems:'center'}}>
        
        <SearchComponent title='' filterTerm={filterValue ? filterValue.toString() : undefined}></SearchComponent>
        <br></br>
      </div>

      {filterValue?.toString() == 'p' &&(
          <div>
            <LocationComponent showMap={false}></LocationComponent>  
          </div>  
      )}
      <div className="flex w-full flex-wrap md:flex-wrap mb-6 md:mb-0 gap-4 mt-36 px-4">
        <div className="flex w-full justify-between">
          <div>
            <Image id='filtro'
              src="/images/filtro.png"
              alt="filtro"
              width={25}
              onClick={handleFilterClick}
              height={25}
              className='cursor-pointer'
            />
            <label htmlFor="filtro" className='block'> Filtrar </label>
          </div>

          <div className="md:self-end">
            <Image id='ordenar'
              src="/images/sort.png"
              alt="ordenar"
              width={25}
              height={25}
              className='cursor-pointer'
              onClick={handleSortClick}
            />

            <label htmlFor="ordenar" className='block'> Ordenar</label>

            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseSort}
              MenuListProps={{
                'aria-labelledby': 'lock-button',
                role: 'listbox',
              }}
            >
              {sortOptions.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={index === selectedSortIndex}
                  onClick={(event) => handleSortItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>

        {isDivFilterVisible && (
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-start" style={{ borderBottom: '1px solid #667358', borderRadius: '4px', padding:'1em', justifyContent:'center'}}>

              <Autocomplete 
                isRequired
                label="Selecione um filtro:"
                labelPlacement={"outside-left"}
                variant="bordered"
                defaultItems={itemsFilterPrincipal}
                //startContent={<PetIcon className="text-xl" />}
                className="max-w-xs"
                selectedKey={filterValue}
                onSelectionChange={setSelectedFilter}
                defaultSelectedKey={'p'}
              >
                {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
              </Autocomplete>
            
              {filterValue?.toString() == 'p' &&(
                <div id='filtrosParque'> 
                  <label> Distância: </label>
                  <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    <Slider aria-label="Volume" value={sliderValue} onChange={handleSliderChange} />
                  </Stack>
                  
                </div>
              )}    
          </div> 
        )}

        <div id='cardsConteiner' className='w-full flex flex-wrap justify-center' style={{paddingLeft:'inherit', paddingBottom:'3rem'}}>
          {parks.map((park, index) => (
            <div key={index}>
              <Card
                title={park.title}
                image={park.image}
                description={park.description}
                link={park.link}
                distancia={'3.6KM'}
                chipIsVisible = {filterValue?.toString() == 'p' ? true : false}

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

