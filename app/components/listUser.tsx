'use client'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useState } from "react"

interface User {
  name: string;
  email: string;
  group: string;
}

export const ListUser = () => {
  const [users, setUsers] = useState([])
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

  const onUpdate = async (value: any) => {
    const user_id = value.id;
    console.log('user_id:', user_id);
    try {
      await fetch(`http://localhost:3333/user/${user_id}`, {
        method: 'POST',
      });
      alert('Usuário editado');
    } catch (error) {
      alert('Erro ao editar usuário');
    }
  };


  return (
    <TableContainer component={Paper} variant="elevation">
      <Table size='small' sx={{ ":right": "100" }}>
        <TableHead>
          <TableRow>
            <TableCell color="primary" align="center">Nome</TableCell>
            <TableCell align="center">E-mail</TableCell>
            <TableCell align="center">Grupo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((item) =>
            <>
              <TableRow>
                <TableCell align="center">{item?.name}</TableCell>
                <TableCell align="center">{item?.email}</TableCell>
                <TableCell align="center">{'Pe na trilha'}</TableCell>
                <TableCell align="center"><Button className="bg-blue-50" onClick={() => onDelete(item)}>Deletar</Button></TableCell>
                <TableCell align="center"><Button className="bg-blue-50" onClick={() => onUpdate(item)}>Alterar</Button></TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}