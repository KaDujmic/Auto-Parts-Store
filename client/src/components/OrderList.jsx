import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import OrderCard from './OrderCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Fetch all items from backend
const theme = createTheme();
const OrderList = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    async function fetchData() {
      try {
        const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIwYzEyOTdlLTU4ZjYtNDU4Ny04NDJiLTIzMWZmNjU4MzA4NiIsImlhdCI6MTY3NzU3ODA1OSwiZXhwIjoxNjg1MzU0MDU5fQ.-u6vDFdPz7_pK3FXxZMqZdeTCFBcCj-s3o_OqyO_rho'
        const config = {
          headers: { Authorization: `Bearer ${jwt}` }
        };
        let response = await axios.get(`http://localhost:4000/order`, config)
        setOrders(response.data.models)
        setIsLoading(false)
      }
      catch(err)
      {
        console.log(err)
      }
    }
   fetchData()
  }, [])

  return (
    isLoading ? <div>Loading...</div> : 
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
      </Grid>
        <Container sx={{ py: 6 }}  maxWidth="md">
          <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
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