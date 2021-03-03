import React, { useEffect, useState, useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from './Footer';
import Input from "@material-ui/core/Input";
import Alert from '@material-ui/lab/Alert';
import { useAuth } from '../context/authcontext';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Spinner from '../tools/spinner';


/*function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}*/

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  const userlogin = useAuth();


  const [spin, setSpin] = React.useState(false);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async data => {
    setSpin(true);
    await userlogin.login(data)
    setSpin(false);
    //history.push('/settings')
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Connexion Admin Vendeur
        </Typography>
         {errors && <Alert variant="danger">{errors}</Alert>}
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          {spin && <Spinner />}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="email"
            id="email"
            //defaultValue={user.email}
            label="Email Address"
            name="email"
            autoComplete="email"
            //autoFocus
            inputRef={register({
              required: {
                value: true,
                message: "Champs requis *"
              },
              pattern: {
                value: re,
                message: "Mauvais email"
              },
            })}
            error={errors.email}
            helperText={errors.email ? errors.email.message : ''}

          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={errors.oldpassword}
            inputRef={register({
              required: {
                value: true,
                message: "Champs requis *"
              },
              pattern: {
                value: pass,
                message: "Doit avoir 8 caractères, une majuscule, une minuscule et un chiffre"
              }
            })}
            helperText={errors.password ? errors.password.message : ''}

          />
          <Button
            type="submit"
            //disabled={loading}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          {/*<Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>*/}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
