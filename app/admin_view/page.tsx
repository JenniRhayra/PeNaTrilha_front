'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography'
import { ListUser } from '../components/listUser';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import { CreateUser } from '../components/createUser';
import Image from 'next/image';

export default function Home() {
  const [value, setValue] = React.useState('1');
  const [listUser, setListUser] = React.useState(false)
  const [createUser, setCreateUser] = React.useState(false)
  const [alterUser, setAlterUSer] = React.useState(false)
  const [deleteUser, setDeleteUser] = React.useState(false)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleListUser = () => {
    setCreateUser(false)
    setAlterUSer(false)
    setDeleteUser(false)
    setListUser(true)
  }

  const handleCreateUser = () => {
    setAlterUSer(false)
    setDeleteUser(false)
    setListUser(false)
    setCreateUser(true)
  }

  const handleAlterUser = () => {
    setCreateUser(false)
    setDeleteUser(false)
    setListUser(false)
    setAlterUSer(true)
  }

  const handleDeleteUser = () => {
    setCreateUser(false)
    setAlterUSer(false)
    setListUser(false)
    setDeleteUser(true)
  }

  return (
    <main className="bg-[#F8F8F8]">
      <div className='absolute sm:w-50 sm:h-50 w-70 h-70 lg:w-100 lg:h-100 top-0 left-0 z-100'>
        <Image
            src="/images/img_abs_03.png"
            alt="forma abstrata"
            width={300}
            height={300}
        />
      </div>
      <div className='col-span-12 lg:col-span-5 grid place-items-center mt-10'>
          <Image
              src="/images/penatrilha_logo_w_sf.png"
              alt="logo pe na trilha"
              width={400}
              height={400}
          />
      </div>
      <h1 className="text-[#4D5D47] mb-4 text-3xl lg:text-4xl uppercase font-bold text-center">Contas criadas</h1>
      <h2 className="text-[#C1C1C1] mb-4 text-2xl lg:text-3xl text-center">Alteração e exclusão</h2>
      <br/>
      <div>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box>
            <TabList onChange={handleChange} centered>
              <Tab label="Lista de usuários" value="1" />
            </TabList>
          </Box>
          <TabPanel value="1"><ListUser/></TabPanel>
        </TabContext>
      </Box>
      </div>
    </main>
  )
}
