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

// Fetch all items from backend
const theme = createTheme();
const ItemList = () => {
  const [items, setItems] = useState([])
  const [searchText, setSearchText] = useState('') 
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedManufacturer, setSelectedManufacturer] = useState([])
  const [filteredItems, setFilteredItems] = useState([])


  useEffect(() => {
    async function fetchData() {
      try {
        let response = await axios.get(`http://localhost:4000/item`)
        setItems(response.data)
      }
      catch(err)
      {
        console.log(err)
      }
    }
   fetchData()
  }, [])

      useEffect(()=> { 
        const filteredAllItems = items.filter(item => {
        if (searchText.length > 0 && !item.name.toLowerCase().includes(searchText.toLocaleLowerCase()))
        return false
        if (selectedCategories.length > 0 && !selectedCategories.includes(item.categoryId))
        return false
        if(selectedManufacturer.length > 0 && !selectedManufacturer.includes(item.manufacturerId))
        return false

          console.log(item,'items')
        return item
      })
      setFilteredItems(filteredAllItems)
    },[items,searchText,selectedCategories,selectedManufacturer])
      
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
      <SearchField onChange={e => setSearchText(e.target.value)}/>
      <FilterCategory onChange={(e, value) => setSelectedCategories(value.map( e => e.id))}  />
      <FilterManufacturer onChange={(e, value) => setSelectedManufacturer(value.map( e => e.id))}  />
      </Grid>
        <Container sx={{ py: 6 }}  maxWidth="md">
          <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
            {filteredItems.map((x) => (
            <ItemCard item={x} key={x.id}/>
           ))}</Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
export default ItemList;