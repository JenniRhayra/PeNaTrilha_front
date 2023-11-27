'use client'

import { Button, Grid, TextField } from "@mui/material"
import { stringify } from "querystring"
import { useState } from "react"
import { json } from "stream/consumers"

interface User {
    name: string;
    email: string;
    group: string;
    password: string;
}

var user_id : string;

export function getUserId(id : string){
    user_id = id;
}

export const UpdateUser = (id : string) => {
    user_id = id;
    console.log(user_id)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [group, setGroup] = useState('')
    const [password, setPassword] = useState('')
    const user: User = {
        name: "",
        email: "",
        group: "",
        password: ""
    }

    const handleChangeName = (prop: any) => {
        setName(prop.target.value)
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
        user.name = name
        user.email = email
        user.group = group
        user.password = password

        console.log('JSON.stringify(user)', JSON.stringify(user))
        console.log('user', user)
        try {
            const response = await fetch('http://localhost:3333/user/', {
                method: 'POST',
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
                <TextField id="name" label="nome" variant="outlined" size='small'  />
            </Grid>
            <Grid item>
                <TextField id="email" label="e-mail" variant="outlined" size='small'  />
            </Grid>
            {/* <Grid item>
            <TextField id="group" label="grupo" variant="outlined" size='small' onChange={(e) => handleChangeGroup(e)}/> 
        </Grid> */}
            <Grid item>
                <TextField id="password" label="senha" variant="outlined" size='small'  />
            </Grid>
            <Grid item >
                <Button className="bg-white" fullWidth variant="outlined" color="warning" >Salvar Alterações</Button>
            </Grid>
        </Grid>
    )
}