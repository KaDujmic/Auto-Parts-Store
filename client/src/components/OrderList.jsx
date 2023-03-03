import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import OrderCard from './OrderCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"

// Fetch all items from backend
const theme = createTheme();
const OrderList = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
 
  useEffect(() => {
    async function fetchData() {
      try {
        const jwt = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${jwt}` }
        };
        let response = await axios.get(`http://localhost:4000/order`, config)
        setOrders(response.data)
        setIsLoading(false)
      }
      catch(err)
      {
        console.log(err);
        localStorage.removeItem("token")
        navigate("/login")
        console.log(err.response.data)
      }
    }
   fetchData()
  }, [navigate])

  return (
    isLoading ? <div>Loading...</div> : 
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8, justifyContent: 'center' }}  maxWidth="lg">
          <Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
            {
              orders.map((x) => (
              <OrderCard order={x} key={x.id}/>
              ))
            }
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
export default OrderList;