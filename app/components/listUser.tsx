'use client'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import error from "next/error";
import { useState } from "react";

interface User {
  id: string;
  email: string;
  password: string;
}

var user: User

export const ListUser = () => {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState();
  const [openDialog, setOpenDialog] = useState(false);
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
      console.log(error)
      alert('Erro ao deletar usuário');
    }
    finally {
      listUsers()
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onUpdate = (value: any) => {
    console.log('vaçiue', value)
    setSelectedUser(value);
    setOpenDialog(true);
  };

  const handleDialogChange = (e: any, field: any) => {
    setSelectedUser((prevUser: any) => ({
      ...prevUser,
      [field]: e.target.value,
    }));
  };

  const handleDialogSubmit = async () => {

    try {
      const response = await fetch('http://localhost:3333/user/alterUser', {
        method: 'PUT',
        body: JSON.stringify(selectedUser),
      })

      if (!response.ok) {
        throw new Error('Erro ao realizar a requisição');
      }
      const data = await response.json();
      alert('Usuário alterado')
    } catch (error) {
      alert('Erro ao cadastrar usuário')
    }
    listUsers()
    setOpenDialog(false);
  };


  return (
    <><TableContainer component={Paper} variant="elevation">
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
          {users?.map((item: any) => <>
            <TableRow>
              <TableCell align="center">{item?.email}</TableCell>
              <TableCell align="center">{item?.group}</TableCell>
              <TableCell align="center"><Button className="bg-blue-50" onClick={() => onDelete(item)}>Deletar</Button></TableCell>
              <TableCell align="center"><Button className="bg-blue-50" onClick={() => onUpdate(item)}>Alterar</Button></TableCell>
            </TableRow>
          </>
          )}
        </TableBody>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Editar Usuário</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edite as informações do usuário.
            </DialogContentText>
            <Grid container direction="column" justifyContent="center" alignItems="center" rowSpacing={5}>
              <Grid item>
                <TextField id="email"
                  label="e-mail"
                  variant="outlined"
                  size='small'
                  value={selectedUser?.email}
                  onChange={(e) => handleDialogChange(e, 'email')}
                  required
                  error={!!selectedUser?.email && !isValidEmail(selectedUser.email)} // Adiciona validação de e-mail
                  helperText={!!selectedUser?.email && !isValidEmail(selectedUser.email) && "E-mail inválido"} />
              </Grid>
              <Grid item>
                <TextField required id="group" label="grupo" variant="outlined" size='small' value={selectedUser?.group} onChange={(e) => handleDialogChange(e, 'group')} />
              </Grid>
              <Grid item>
                <TextField required id="password" label="senha" variant="outlined" size='small' onChange={(e) => handleDialogChange(e, 'password')} />
              </Grid>
              {/* <Grid item >
                <Button className="bg-white" fullWidth variant="outlined" color="warning" onClick={onsubmitHandle}>Cadastrar</Button>
              </Grid> */}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            <Button onClick={handleDialogSubmit} color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      </Table>
    </TableContainer></>
  )
}
