import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import OrderCard from './OrderCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Fetch all items from backend
const theme = createTheme();
const OrderList = () => {
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(0);

	const fetchData = async () => {
		try {
			const jwt = localStorage.getItem('token');
			const config = {
				headers: { Authorization: `Bearer ${jwt}` }
			};
			const response = await axios.get(`http://localhost:4000/order?page=${page}`, config);
			setOrders(response.data);
			setIsLoading(false);
			setPageCount(+response.headers['x-total-pages']);
		} catch (err) {
			console.log(err);
			localStorage.removeItem('token');
			navigate('/login');
			console.log(err.response.data);
		}
	};

	const onChangeCallback = async () => {
		await fetchData();
	};

	useEffect(() => {
		fetchData();
	}, [navigate, page]);
	const handleChange = async (event, value) => {
		setPage(value);
	};

	return (
		isLoading
			? <div>Loading...</div>
			: <ThemeProvider theme={theme}>
				<CssBaseline />
				<main>
					<Container sx={{ py: 8, justifyContent: 'center' }} maxWidth="lg">
						<Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
							{
								orders.map((x) => (
									<OrderCard onChangeCallback={onChangeCallback} order={x} key={x.id}/>
								))
							}
						</Grid>
					</Container>
					<Stack spacing={2} paddingTop={2} paddingLeft={62.5}>
						<Pagination count={+pageCount} page={page} onChange={handleChange} />
					</Stack>
				</main>
			</ThemeProvider>
	);
};
export default OrderList;
