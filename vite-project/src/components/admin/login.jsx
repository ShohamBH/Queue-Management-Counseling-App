import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/loginSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const useRefName = useRef('');
  const useRefPass = useRef('');
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(true);
  const BASE_URL = 'http://localhost:8787';

  async function handleLogin(event) {
    event.preventDefault();
    const data = {
      name: useRefName.current.value,
      password: useRefPass.current.value,
    };

    try {
      const res = await fetch(BASE_URL + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.status === 401) {
        if (useRefName.current.value == '' ||
          useRefPass.current.value == '')
          setErrorMessage('שם משתמש והססמא הם שדות חובה. אנא נסה שוב.');
        else {
          useRefName.current.value = '';
          useRefPass.current.value = '';
          setErrorMessage('שם משתמש והססמא שגויים. אנא נסה שוב.');
        }
      }

      else if (res.ok) {
        setErrorMessage('');
        dispatch(login());
        sessionStorage.setItem('isLoggedIn', 'true');
        setOpen(false);
        navigate('/admin');
      }
      else {
        setErrorMessage('שגיאה בהתחברות. נסה שוב.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('שגיאת רשת. נסה שוב.');
    }
  }

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  return (
    <Dialog open={open} onClose={handleClose} >
      <DialogTitle id="login-dialog-title">Login</DialogTitle>
      <DialogContent>
        <form onSubmit={handleLogin}>
          <TextField autoFocus margin="dense" label="UserName" type="text" fullWidth inputRef={useRefName} />
          <TextField margin="dense" label="Password" type="password" fullWidth inputRef={useRefPass} />
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}  
        </form>
      </DialogContent>
      <DialogActions>

        <Button onClick={handleClose}>Back</Button>
        <Button onClick={handleLogin}>Login</Button>

      </DialogActions>
    </Dialog>
  );
};

export default Login;
