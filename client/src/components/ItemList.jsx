import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
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
  const [selectedCategory, setSelectedCategory] = useState({})
  const [selectedManufacturer, setSelectedManufacturer] = useState({})
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  
  async function fetchData ( page,selectedCategoryId,selectedManufacturerId) {
    try {
      const params = {}
      if(selectedCategoryId && selectedManufacturerId) {
        params.category = selectedCategoryId
        params.manufacturer = selectedManufacturerId
      }    
      else if(selectedManufacturerId) {
        params.manufacturer = selectedManufacturerId
      }
      else if(selectedCategoryId) {
        params.category = selectedCategoryId
      }
      let response = await axios.get(`http://localhost:4000/item?page=${page}`,{params})
      setItems(response.data)

      setPageCount(+response.headers['x-total-pages'])
    }
    catch(err)
    {
      console.log(err)
    }}
  const handleChange = async(event,value) => {
      setPage(value);
    };

  useEffect(() => {
    fetchData(page, selectedCategory?.id, selectedManufacturer?.id) 
  }, [selectedCategory,selectedManufacturer, page])
  
    //Filter data only when items or query parameters change
      const searchData =
      items.filter((item) => {
      return item.name.toLowerCase().includes(searchText.toLocaleLowerCase())
      })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ justifyContent: 'center', alignItems: 'center', sm: 12 }}  maxWidth="lg">
        <Container  maxWidth="sm" sx={{ paddingLeft: 3, display:'flex', justifyContent: 'center' }}>
          <Grid container spacing={2} marginTop={0} justifyContent='center' paddingLeft={2} >
            <Grid  item xs={12} justifyContent="center"><SearchField onChange={e => setSearchText(e.target.value)}/></Grid>
            <Grid  item xs={6} justifyContent="center"><FilterCategory onChange={async(e, value) => { 
              setSelectedCategory(value)
              await fetchData(page, value ? value.id : undefined, selectedManufacturer?.id);
            } }  /></Grid>
            <Grid item xs={6} justifyContent="center"><FilterManufacturer onChange={async(e, value) => { 
              setSelectedManufacturer(value)
              await fetchData( page, selectedCategory?.id, value ? value.id : undefined);
            } }/></Grid>
          </Grid>
        </Container>
        <Container sx={{display: 'flex', py: 2, justifyContent: 'space-between', alignContent: 'center' }}  maxWidth="sm">
          <Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
            {searchData.map((x) => (
            <ItemCard item={x} key={x.id}/>
          ))}</Grid>
        </Container>
        <Stack spacing={2} paddingTop={2} paddingLeft={62.5}>
          <Pagination count={+pageCount} page={page} onChange={handleChange} />
        </Stack>
      </Box>
      
    </ThemeProvider>
  );
}
export default ItemList;
