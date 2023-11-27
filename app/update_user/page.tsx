'use client'

import { Button, Grid, TextField } from "@mui/material"
import { stringify } from "querystring"
import { useState } from "react"
import { json } from "stream/consumers"
import { getUserId } from "../components/updateUser"

interface IProps {
    user_id: string;
}

interface User {
    id: string;
    email: string;
    password: string;
}

export default function UpdateUser({ user_data }: User) {
    
    const [name, setName] = useState('')
    const [newEmail, setEmail] = useState('')
    const [group, setGroup] = useState('')
    const [newPassword, setPassword] = useState('')
    const user: User = {
        id: '',
        email: "",
        password: ""
    }

    const handleChangeEmail = (prop: any) => {
        setEmail(prop.target.value)
    }

    const handleChangeGroup = (prop: any) => {
        setGroup(prop.target.value)
    }

    const handleChangePassword = (prop: any) => {
        setPassword(prop.target.value)
    }

    const onsubmitHandle = async () => {
        user.id = user_data?.id
        user.email = newEmail
        user.password = newPassword

        try {
            const response = await fetch(`http://localhost:3333/user/`, {
                method: 'PUT',
                body: JSON.stringify(user),
            })

            if (!response.ok) {
                throw new Error('Erro ao realizar a requisição');
            }
            const data = await response.json();
            alert('Usuário cadastrado')
        } catch (error) {
            alert('Erro ao cadastrar usuário')
        }
    }



    return (
        <Grid container direction="column" justifyContent="center" alignItems="center" rowSpacing={5}>
            <Grid item>
                <TextField id="email" label="e-mail" variant="outlined" size='small' value={user_data?.email} onChange={(e) => handleChangeEmail(e)} />
            </Grid>
            {/* <Grid item>
            <TextField id="group" label="grupo" variant="outlined" size='small' onChange={(e) => handleChangeGroup(e)}/> 
        </Grid> */}
            <Grid item>
                <TextField id="password" label="senha" variant="outlined" size='small' value={user_data?.password} onChange={(e) => handleChangePassword(e)}  />
            </Grid>
            <Grid item >
                <Button className="bg-white" fullWidth variant="outlined" color="warning" onClick={(e) => onsubmitHandle()} >Salvar Alterações</Button>
            </Grid>
        </Grid>
    )
}