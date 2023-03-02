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
import { useNavigate } from 'react-router-dom';

export default function ButtonAppBar() {
  const authContext = useContext(AuthContext);
  const role = authContext.currentUser !== null ? authContext.currentUser.role : false;
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path)
  }

  const navbarComponents = ()=> {
    if( role === 'Salesperson' ) {
      return(
        <>
          <Button color="inherit" onClick={()=> {handleClick('/order')}}>Orders</Button>
          <Button color="inherit" onClick={()=> {handleClick('/order-create')}}>Create Order</Button>
          <Button color="inherit" onClick={()=> {handleClick('/customer-create')}}>Create Customer</Button>
          <Button color="inherit" onClick={()=> {handleClick('/pendingItems')}}>Pending Items</Button>
          <Button color="inherit" onClick={()=> {handleClick('/')}}>Items</Button>
        </> 
      )
    } else if ( role === 'Customer') {
      return (
        <>
          <Button color="inherit" onClick={()=> {handleClick('/profile')}}>Profile</Button>
          <Button color="inherit" onClick={()=> {handleClick('/userOrders')}}>Orders</Button>
        </> 
      )
    } else {
      <Button color="inherit" onClick={handleClick}>Items</Button>
    }
  }

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
          { navbarComponents() }
          {authContext.currentUser
            ? <Button color="inherit" href='/'>Logout</Button> 
            : <Button color="inherit" href='/login'>Login</Button> 
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}