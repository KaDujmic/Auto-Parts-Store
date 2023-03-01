import * as React from 'react';
import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../context/authContext';

export default function ButtonAppBar() {
  const authContext = useContext(AuthContext);
  console.log(authContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Auto Parts
          </Typography>
          {authContext.currentUser
            ? <Button color="inherit" href='/login'>Logout</Button> 
            : <Button color="inherit" href='/login'>Login</Button> 
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}