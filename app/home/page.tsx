'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography'
import { ListUser } from '../components/listUser';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { CreateUser } from '../components/updateUser';


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
    <>
    <Typography variant="h4">
      Prototipo Evolutivo
    </Typography>
    <br/>
    <div>
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} centered>
            <Tab label="Listar usuário" value="1" />
            <Tab label="Cadastrar usuário" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><ListUser/></TabPanel>
        <TabPanel value="2"><CreateUser/></TabPanel>
      </TabContext>
    </Box>
    </div>
    </>
    
  )
}
