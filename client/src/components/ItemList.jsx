import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ItemCard from './ItemCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchField from './Search';
import FilterCategory from './FilterCategory';
import FilterManufacturer from './FilterManufacturer';

// Fetch all items from backend
const theme = createTheme();
const ItemList = () => {
	const [items, setItems] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [selectedCategory, setSelectedCategory] = useState({});
	const [selectedManufacturer, setSelectedManufacturer] = useState({});
	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(0);

	async function fetchData (page, queryText, selectedCategoryId, selectedManufacturerId) {
		try {
			const params = {};
			if (queryText) {
				params.name = queryText.toLowerCase();
			}
			if (selectedManufacturerId) {
				params.manufacturer = selectedManufacturerId;
			}
			if (selectedCategoryId) {
				params.category = selectedCategoryId;
			}
			const response = await axios.get(`http://localhost:4000/item?page=${page}`, { params });
			setItems(response.data);

			setPageCount(+response.headers['x-total-pages']);
		} catch (err) {
			if (err.response && err.response.status === 404) {
				setItems([]);
			} else {
				console.log(err);
			}
		}
	}

	const handleChange = async (event, value) => {
		setPage(value);
	};

	useEffect(() => {
		fetchData(page, searchText, selectedCategory?.id, selectedManufacturer?.id);
	}, [page, searchText, selectedCategory, selectedManufacturer]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box sx={{ justifyContent: 'center', alignItems: 'center', sm: 12 }} maxWidth="lg">
				<Container maxWidth="sm" sx={{ paddingLeft: 3, display: 'flex', justifyContent: 'center' }}>
					<Grid container spacing={2} marginTop={0} justifyContent='center' paddingLeft={2} >
						<Grid item xs={12} justifyContent="center"><SearchField onChange={async (e) => {
							setSearchText(e.target.value);
							await fetchData(page, e.target.value ? e.target.value : undefined, selectedCategory?.id, selectedManufacturer?.id);
							setPage(1);
						}}/></Grid>
						<Grid item xs={6} justifyContent="center"><FilterCategory onChange={async (e, value) => {
							setSelectedCategory(value);
							await fetchData(page, searchText, value ? value.id : undefined, selectedManufacturer?.id);
							setPage(1);
						} } /></Grid>
						<Grid item xs={6} justifyContent="center"><FilterManufacturer onChange={async (e, value) => {
							setSelectedManufacturer(value);
							await fetchData(page, searchText, selectedCategory?.id, value ? value.id : undefined);
							setPage(1);
						} }/></Grid>
					</Grid>
				</Container>
				<Container sx={{ display: 'flex', py: 2, justifyContent: 'space-between', alignContent: 'center' }} maxWidth="md">
					<Grid container sx={{ display: 'grid', columnGap: 3, rowGap: 1, gridTemplateColumns: 'repeat(2, 1fr)' }}>
						{items.map((x) => (
							<ItemCard item={x} key={x.id}/>
						))}</Grid>
				</Container>
				<Stack spacing={2} paddingTop={2} paddingLeft={50}>
					<Pagination count={+pageCount} page={page} onChange={handleChange} />
				</Stack>
			</Box>

		</ThemeProvider>
	);
};
export default ItemList;
