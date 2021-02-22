import React, { useState } from 'react'
import { Link, useHistory} from 'react-router-dom';
import {Copyright, Logo, useStyles} from '../../components.js';
import { Button, Container, TextField, Grid, Typography } from '@material-ui/core';
import '../../style.css';


function Login(){

  const classes = useStyles();

  const [emailLogin, setEmail] = useState('');
  const [passwordLogin, setPassword] = useState('');
  const urlLogin = `email=${emailLogin}&password=${passwordLogin}`
 
  const history = useHistory();

  const routerHall = () => {
    history.push('/Hall')
  }

  const routerKitchen = () => {
    history.push('/Kitchen')
  }

  const handleLogin = () => {
    fetch('https://lab-api-bq.herokuapp.com/auth', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: urlLogin

    })
      .then((response) => response.json())
      .then((json) => {

        console.log(json)
        localStorage.setItem('token',json.token)
        
        if(json.role === 'garcom'){
          routerHall();
        }
        else if(json.role === 'cozinha'){
          routerKitchen();
        }
        else {
          const errorMessage = json.message
        }
      })
  }

    return (
      <Container className='container'>
        <div className={classes.paper}>
          <Logo/>
          <form className={classes.form}>
          <Typography  component='h1' variant='h5'> Ratatouille Burguer </Typography>
            <TextField variant='outlined' margin='normal' required fullWidth label='Email' name='email' 
            autoComplete='username' value={emailLogin} onChange={event => setEmail(event.target.value)}/>

            <TextField variant='outlined' margin='normal' required fullWidth name='password' label='Senha' type='password' id='password'
            autoComplete='current-password' value={passwordLogin} onChange={event => setPassword(event.target.value)}/>

            <Button type='submit' fullWidth variant='contained' className={classes.submit} onClick={(event) => {event.preventDefault();
              handleLogin();}}>Entrar</Button>
          </form>
          <Grid item>
            <Link to='/Registry' >
              {'Novo usuário? Registre-se'}
            </Link>
          </Grid>
        </div>
        <Copyright/>
      </Container>
    );
  }
  
  export default Login;