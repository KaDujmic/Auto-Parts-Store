import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ItemCard from './ItemCard';
import {useEffect, useState} from 'react';
import axios from 'axios';
import SearchField from './Search';
import FilterCategory from './FilterCategory';
import FilterManufacturer from './FilterManufacturer';
//import PaginationLink from './Pagination';

// Fetch all items from backend
const theme = createTheme();
const ItemList = () => {
  const [items, setItems] = useState([])
  const [searchText, setSearchText] = useState('') 
  const [selectedCategory, setSelectedCategory] = useState([])
  const [selectedManufacturer, setSelectedManufacturer] = useState({})

  async function fetchData (selectedCategoryId,selectedManufacturerId) {
    try {
      const params = {}
      if(selectedCategoryId) {
        params.category = selectedCategoryId
      }    
      if(selectedManufacturerId) {
        params.manufacturer = selectedManufacturerId
      }
      console.log(params,'params')
      let response = await axios.get(`http://localhost:4000/item`,{params})
      setItems(response.data)
    }
    catch(err)
    {
      console.log(err)
    }}
  useEffect(() => {
    fetchData(undefined, undefined)    
  }, [])

    //Filter data only when items or query parameters change
      const searchData =
      items.filter((item) => {
      return item.name.toLowerCase().includes(searchText.toLocaleLowerCase())
      })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
      <Container  maxWidth="md">
      <Grid container spacing={2} >
      <Grid  item xs={12} justifyContent="center"><SearchField onChange={e => setSearchText(e.target.value)}/></Grid>
      <Grid  item xs={6} justifyContent="center"><FilterCategory onChange={async(e, value) => { 
        setSelectedCategory(value)
        await fetchData(value ? value.id : undefined, selectedManufacturer);

      } }  /></Grid>
      <Grid  item xs={6} justifyContent="center"><FilterManufacturer onChange={async(e, value) => { 
        setSelectedManufacturer(value)
        await fetchData(selectedCategory, value ? value.id : undefined);

      } }/></Grid>
      </Grid></Container>
        <Container sx={{ py: 6 }}  maxWidth="md">
          <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
            {searchData.map((x) => (
            <ItemCard item={x} key={x.id}/>
           ))}</Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
export default ItemList;