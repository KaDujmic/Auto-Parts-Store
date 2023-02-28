import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ItemCard from './ItemCard';
import {useEffect, useState, useMemo} from 'react';
import axios from 'axios';
import SearchField from './Search';

// Fetch all items from backend
const theme = createTheme();
const ItemList = () => {
  const [items, setItems] = useState([])
  const [query, setQuery] = useState('') 
 
  useEffect(() => {
    async function fetchData() {
      try {
        let response = await axios.get(`http://localhost:4000/item`)
        console.log(response.data)
        setItems(response.data)
      }
      catch(err)
      {
        console.log(err)
      }
    }
   fetchData()
  }, [])

  //Filter data only when items or query parameters change
  const filteredData = useMemo(() => {
  return items.filter((item) => {
   return item.name.toLowerCase().includes(query.toLocaleLowerCase())
  })
  },[items,query])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
      <SearchField  value = {query} onChange={e => setQuery(e.target.value)}/>
      </Grid>
        <Container sx={{ py: 6 }}  maxWidth="md">
          <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
            {filteredData.map((x) => (
            <ItemCard item={x} key={x.id}/>
           ))}</Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
export default ItemList;