"use client"

import React, { useState, useEffect, useTransition } from 'react';
import FooterMenu from '../components/footerMenu';
import Header from '../components/header';
import SearchComponent from '../components/searchComponent';
import { Autocomplete, AutocompleteItem} from "@nextui-org/react";
import Card from '../components/cardComponent';
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
import { FaFilter } from "react-icons/fa6";
import { FaSortAlphaDown } from 'react-icons/fa';
import LoadingSpinner from '../components/loadingSpinner';

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

  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handlePageLoad = () => {
      startTransition(() => {
        setLoading(false);
      });
    };

    if (document.readyState === 'complete') {
      handlePageLoad();
    } else {
      window.addEventListener('load', handlePageLoad);
      return () => window.removeEventListener('load', handlePageLoad);
    }
  }, []);

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

  const guideEspec = [
    'Botânica',
    'Montanhismo',
    'Observação de aves',  
  ];

  const infraPark = [
    'Banheiro',
    'Hospedagem',
    'Restaurante', 
    'Acessibilidade',
    'Estacionamento' 
  ];

  const [infraSelected, setInfraSelected] = useState<string[]>([]);

  const handleInfraChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setInfraSelected(event.target.value as string[]);
  };
 
  const [isDivFilterVisible, setDivFilterVisible] = useState(false);
  const [sliderValue, setSliderValue] = React.useState<number>(5);
  const [filterValue, setSelectedFilter] = React.useState<React.Key>("p");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedSortIndex, setSelectedIndex] = React.useState(2);
  const [parks, setParks] = useState<any[]>(parksList);
  
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

  const [language, setLanguage] = React.useState<string[]>([]);
  const [espec, setEspec] = React.useState<string[]>([]);
  
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

  const handleCheckBoxChange = (event: SelectChangeEvent<typeof language>) => {
    const {
      target: { value },
    } = event;
    setLanguage(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <>
      {loading || isPending ? (
          <LoadingSpinner />
        ) : (
          <>
          <div>
            <Header />
          </div>

          <div id='main'>
            <div id='conteinerBusca' style={{ marginTop: '3rem', marginLeft: '8rem', alignItems:'center'}}>
              <SearchComponent title={`BUSCAR - ${handleSearchTitle()}`} filterTerm={filterValue ? filterValue.toString() : undefined}></SearchComponent>
            </div>
          </div>

          <div className="flex w-full flex-wrap md:flex-wrap mb-6 md:mb-0 px-4">
            {filterValue?.toString() === 'p' ? (
              <div id='paiGoogle' style={{ width: '100%', marginTop:'20vh' }}>
                <GoogleMaps showMap={true}/>
              </div>
            ) : (
              <div id='paiGoogle' style={{ width: '100%' }}>
                <GoogleMaps showMap={false}/>
              </div>
            )}
          </div>

          <div>
            <div className='filters' style={{ display: 'flex', marginTop: '2vh', justifyContent: 'flex-end', alignItems: 'center', padding:'0 3vh 2vh 0'}}>
              <div style={{ marginRight: '3vh', alignItems:'center', display: 'flex' }}>
                <FaFilter
                  style={{ fontSize: 20, cursor: 'pointer' }}
                  onClick={handleFilterClick}
                />
                <label htmlFor="filtro" className='block' style={{ fontSize: 12, marginLeft: '0.5rem' }}> Filtrar </label>
              </div>

              <div style={{ alignItems: 'center', display: 'flex' }}>
                <FaSortAlphaDown 
                  style={{ fontSize: 20, cursor: 'pointer' }}
                  onClick={handleSortClick}
                />
                <label htmlFor="ordenar" className='block' style={{ fontSize: 12, marginLeft: '0.5rem' }}> Ordenar</label>
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
              <div style={{gridTemplateColumns: '1fr 1fr', marginTop: '0vh 3vh', justifyContent: 'flex-start', backgroundColor:'white', alignItems: 'center', padding:'3vh 2vh', borderBottom: '1px solid #667358', borderRadius: '4px'}}>
                <div style={{display: 'flex', flexDirection: 'column', marginBottom: '1vh'}}>
                  <div style={{marginBottom: '3vh'}}>
                    <Autocomplete 
                      isRequired
                      label="Selecione um filtro:"
                      labelPlacement={"outside-left"}
                      variant="bordered"
                      defaultItems={itemsFilterPrincipal}
                      className="max-w-xs"
                      selectedKey={filterValue}
                      onSelectionChange={setSelectedFilter}
                      defaultSelectedKey={'p'}
                    >
                      {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                    </Autocomplete >
                  </div>

                  {filterValue?.toString() === 'p' && (
                    <div style={{  display: 'flex', justifyContent:'space-around', fontSize:'13px', color:'black'}}>
                      <div id='filtrosParque' style={{ alignItems: 'center',width: '20vh'}}> 
                        <label>Distância:</label>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                          <Slider aria-label="Volume" value={sliderValue} onChange={handleSliderChange} />
                        </Stack>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',width: '25vh'}}>
                        <InputLabel id="demo-multiple-checkbox-label" sx={{ fontSize:'13px', color:'black'}}>Infraestrutura</InputLabel>
                        <Select
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          value={infraSelected}
                          onChange={handleInfraChange}
                          input={<OutlinedInput label="Tag" />}
                          renderValue={(selected) => {
                            if (selected.length > 1) {
                              return 'Vários campos';
                            } else {
                              return selected[0] || '';
                            }
                          }}
                          MenuProps={MenuProps}
                          style={{ width: '100%' }}
                        >
                          {infraPark.map((infra) => (
                            <MenuItem key={infra} value={infra}>
                              <Checkbox checked={infraSelected.indexOf(infra) > -1} />
                              <ListItemText primary={infra} />
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                    </div>
                  )}

                  {filterValue?.toString() == 'g' &&(
                    <div style={{  display: 'flex', justifyContent:'space-around', fontSize:'13px', color:'black'}}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',width: '25vh'}}>
                        <InputLabel id="demo-multiple-checkbox-label" sx={{ fontSize:'13px', color:'black'}}>Idiomas</InputLabel>
                        <Select
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox_idioma"
                          multiple
                          value={language}
                          onChange={handleCheckBoxChange}
                          input={<OutlinedInput label="Tag" />}
                          renderValue={(selected) => {
                            if (selected.length > 1) {
                              return 'Vários campos';
                            } else {
                              return selected[0] || '';
                            }
                          }}
                          MenuProps={MenuProps}
                          style={{ width: '100%' }}
                        >
                          {guideIdiomas.map((name) => (
                            <MenuItem key={name} value={name}>
                              <Checkbox checked={language.indexOf(name) > -1} />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',width: '25vh'}}>
                        <InputLabel id="demo-multiple-checkbox-label_espec" sx={{ fontSize:'13px', color:'black'}}>Especialidade</InputLabel>
                        <Select
                          labelId="demo-multiple-checkbox-label_espec"
                          id="demo-multiple-checkbox_espec"
                          multiple
                          value={espec}
                          onChange={handleCheckBoxChange}
                          input={<OutlinedInput label="Tag" />}
                          renderValue={(selected) => {
                            if (selected.length > 1) {
                              return 'Vários campos';
                            } else {
                              return selected[0] || '';
                            }
                          }}
                          MenuProps={MenuProps}
                          style={{ width: '100%' }}
                        >
                          {guideEspec.map((name) => (
                            <MenuItem key={name} value={name}>
                              <Checkbox checked={espec.indexOf(name) > -1} />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                    </div>
                  )}  
                </div> 
              </div>
            )}

            <div id='cardsConteiner' style={{ display: 'flex', marginTop: '2vh', justifyContent: 'center', flexWrap:'wrap',alignItems: 'center', padding:'0 3vh 2vh 3vh'}}>
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
          <div style={{paddingBottom:'5vh'}}></div>
          <FooterMenu activePage='search'></FooterMenu>
        </>
      )}
    </>
  );
};

export default Search;

