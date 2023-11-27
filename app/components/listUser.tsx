'use client'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import UpdateUser from "../update_user/page";


interface User {
  id: string;
  email: string;
  password: string;
}

var user: User

export const ListUser = () => {
  const [users, setUsers] = useState([])
  const [showUpdateUSer, setShowUpdateUser] = useState(false)

  const listUsers = async () => {
    try {
      const response = await fetch('http://localhost:3333/user/')

      if (!response.ok) {
        throw new Error('Erro ao realizar a requisição');
      }
      const data = await response.json();

      console.log('data', data);

      setUsers(!!data ? data.user : [])

    } catch (error) {
      console.error('Erro:', error);
    }
  }

  if (users?.length <= 0) {
    listUsers()
  }

  const onDelete = async (value: any) => {
    const user_id = value.id;
    console.log('user_id:', user_id);
    try {
      await fetch(`http://localhost:3333/user/${user_id}`, {
        method: 'DELETE',
      });
      alert('Usuário deletado');
    } catch (error) {
      alert('Erro ao deletar usuário');
    }
  };

  const handleRedirect = async (newPath: string) => {

    location.pathname = newPath;
  }

  async function onUpdate(value: User) {
    user = value;
    setShowUpdateUser(true);
  }


  return (
    <>
      {!showUpdateUSer ? (
        <TableContainer component={Paper} variant="elevation" >
          <Table size='small' sx={{ ":right": "100" }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">E-mail</TableCell>
                <TableCell align="center">Grupo</TableCell>
                <TableCell align="center">Deletar</TableCell>
                <TableCell align="center">Alterar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((item) => (
                <TableRow key={item?.email}>
                  <TableCell align="center">{item?.email}</TableCell>
                  <TableCell align="center">{item?.group}</TableCell>
                  <TableCell align="center"><Button className="bg-blue-50" onClick={() => onDelete(item)}>Deletar</Button></TableCell>
                  <TableCell align="center"><Button className="bg-blue-50" onClick={() => onUpdate(item)}>Alterar</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <>
          <UpdateUser user_data={user} />
        </>
      )}
    </>
  )};
