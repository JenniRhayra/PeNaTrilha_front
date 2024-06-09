"use client"

import React, { useContext } from 'react';
import FooterMenu from '../components/footerMenu';
import Header from '../components/header';
import SearchComponent from '../components/searchComponent';
import { Autocomplete, AutocompleteItem} from "@nextui-org/react";
import { useState } from 'react';
import Card from '../components/cardComponent';
import Image from 'next/image';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import GoogleMaps from '../google_maps/page';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';

//Essa info vai vir da consulta do backend
const parksList = [
  {
    title: 'Parque A',
    image: '/images/parque-iguacu.jpg', // Substitua pelo caminho real da imagem
    description: 'Famoso pelas Cataratas do Iguaçu, uma das novas sete maravilhas da natureza.',
    link: 'https://github.com/JenniRhayra/PeNaTrilha_back/branches',
    lat:  -24.056113238506416,
    long: -47.99360184042935
  },
  {
    title: 'Parque C',
    image: '/images/parque-carlos-botelho.jpg', // Substitua pelo caminho real da imagem
    description: 'Conhecido por suas paisagens de cerrado, cachoeiras e trilhas deslumbrantes.',
    link: 'https://github.com/JenniRhayra/PeNaTrilha_back/branches',
    lat:  -24.056113238506416,
    long: -47.99360184042935
  },
  {
    title: 'Parque B',
    image: '/images/parque-carlos-botelho.jpg', // Substitua pelo caminho real da imagem
    description: 'Popular por suas dunas, lagoas cristalinas e praias paradisíacas.',
    link: 'https://github.com/JenniRhayra/PeNaTrilha_back/branches',
    lat:  -24.056113238506416,
    long: -47.99360184042935
  },
  {
    title: 'Parque D',
    image: '/images/parque-iguacu.jpg', // Substitua pelo caminho real da imagem
    description: 'Famoso pelas Cataratas do Iguaçu, uma das novas sete maravilhas da natureza.',
    link: 'https://github.com/JenniRhayra/PeNaTrilha_back/branches',
    lat:  -24.056113238506416,
    long: -47.99360184042935
  },
  {
    title: 'Parque F',
    image: '/images/parque-iguacu.jpg', // Substitua pelo caminho real da imagem
    description: 'Famoso pelas Cataratas do Iguaçu, uma das novas sete maravilhas da natureza.',
    link: 'https://github.com/JenniRhayra/PeNaTrilha_back/branches',
    lat:  -24.056113238506416,
    long: -47.99360184042935
  },
  {
    title: 'Parque E',
    image: '/images/parque-iguacu.jpg', // Substitua pelo caminho real da imagem
    description: 'Famoso pelas Cataratas do Iguaçu, uma das novas sete maravilhas da natureza.',
    link: 'https://github.com/JenniRhayra/PeNaTrilha_back/branches',
    lat:  -24.056113238506416,
    long: -47.99360184042935
  },
  {
    title: 'Parque H',
    image: '/images/parque-iguacu.jpg', // Substitua pelo caminho real da imagem
    description: 'Famoso pelas Cataratas do Iguaçu, uma das novas sete maravilhas da natureza.',
    link: 'https://github.com/JenniRhayra/PeNaTrilha_back/branches',
    lat:  -24.056113238506416,
    long: -47.99360184042935
  },
  {
    title: 'Parque G',
    image: '/images/parque-iguacu.jpg', // Substitua pelo caminho real da imagem
    description: 'Famoso pelas Cataratas do Iguaçu, uma das novas sete maravilhas da natureza.',
    link: 'https://github.com/JenniRhayra/PeNaTrilha_back/branches',
    lat:  -24.056113238506416,
    long: -47.99360184042935
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
  ];

  const guideIdiomas = [
    'Português',
    'Inglês',
    'Francês',  
  ];
 
  const [isDivFilterVisible, setDivFilterVisible] = useState(false);
  const [sliderValue, setSliderValue] = React.useState<number>(5);
  const [filterValue, setSelectedFilter] = React.useState<React.Key>("p");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedSortIndex, setSelectedIndex] = React.useState(2);
  const [parks, setParks] = useState<any[]>(parksList);
  const [iconMapClicked, setMapClicked] = useState(false);
  
  const open = Boolean(anchorEl);

  const handleFilterClick = () => {
    setDivFilterVisible(!isDivFilterVisible);
  };

  const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOrderOfResults = (index: number) => {
    switch(index){
      //A-Z
      case 0:
        setParks(sortAlphabetically());
        console.log('case 0' + parks);
        break;
      //Z-A
      case 1:
        setParks(sortAlphabeticallyDesc());
        console.log('case 1' + parks);
        break;
      //Mais próximos
      case 2:
        break;
        default: '';
    }
  }

  const sortAlphabetically = () => {
    
    return parksList.slice().sort((a, b) => a.title.localeCompare(b.title));
  }

  const sortAlphabeticallyDesc = () => {
    
    return parksList.slice().sort((a, b) => b.title.localeCompare(a.title));
  }

  const handleSortItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    console.log(index);
    setSelectedIndex(index);
    handleOrderOfResults(index);
    setAnchorEl(null);  
  };

  const handleCloseSort = () => {
    setAnchorEl(null);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };

  const handleSearchTitle = (): string => {
    let title: string = '';
    
    switch(filterValue){
      case "p":
        title = "Parques";
        break;
      case "g":
        title = "Guias";
        break;
      case "a":
        title = "Atividades";
        break;
    }

    return title;
   
  }

  const handleSortItems = (): string[] => {
    let sortListFiltered: string[];
    let qtOptions = sortOptions.length;

    sortListFiltered = sortOptions;

    if(filterValue == 'p'){
      sortOptions.push('Mais próximos');
      sortListFiltered = sortOptions;
    }

    if(qtOptions == 3 && filterValue != 'p'){
      sortOptions.pop();
      sortListFiltered = sortOptions;
    }
   
    return sortListFiltered;
  }

  const handleIconMapClick = () => {
    setMapClicked(!iconMapClicked);
  }

  const [personName, setPersonName] = React.useState<string[]>([]);
  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleCheckBoxChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <>
      <div>
        <Header />
      </div>

      <div className="flex w-full flex-wrap md:flex-wrap mb-6 md:mb-0 px-4">

        <div id='tituloPagina' style={{ marginTop: '12vh', alignItems: 'center', width: '100%'}}>
          <h1 style={{ 
            textAlign: 'center',
            textTransform: 'uppercase', 
            fontSize: '18px', 
            fontWeight: 'bold', 
            color: '#667358'
          }}>{handleSearchTitle()}</h1>
        </div>  

        {filterValue?.toString() == 'p' && (
          <div id='paiGoogle' style={{width:'100%'}}>
            <GoogleMaps showMap={true}/>
          </div>  
        )}

        <div className="flex w-full justify-between" style={{marginTop:'2vh'}}>  
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
              {handleSortItems().map((option, index) => (
                <MenuItem
                  key={option}
                  onClick={(event) => handleSortItemClick(event, index)}             
                  selected={index === selectedSortIndex}
                  
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

              {filterValue?.toString() == 'g' &&(
                <div>
                  <InputLabel id="demo-multiple-checkbox-label">Idiomas</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handleCheckBoxChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {guideIdiomas.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={personName.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              )}  
          </div> 
        )}

        <div id='cardsConteiner' className='w-full flex flex-wrap justify-center' style={{paddingLeft:'inherit', paddingBottom:'3rem'}}>
          {parks?.map((park, index) => (
            <div key={index}>
              <Card
                title={park.title}
                image={park.image}
                description={park.description}
                link={park.link}
                distancia={'3.6KM'}
                chipIsVisible = {filterValue?.toString() == 'p' ? true : false}
                pinIsVisible = {filterValue?.toString() == 'p' ? true : false} 
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

