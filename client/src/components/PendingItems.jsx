import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Title from './Title';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';

export default function Items () {
	const [pendingItems, setPendingItems] = useState([]);
	const navigate = useNavigate();
	const fetchData = async () => {
		try {
			const jwt = localStorage.getItem('token');
			const config = {
				headers: { Authorization: `Bearer ${jwt}` }
			};
			const response = await axios.get('http://localhost:4000/orderItem', config);
			setPendingItems(response.data);
		} catch (err) {
			navigate('/login');
			console.log(err);
		}
	};

	useEffect(() => {
		fetchData();
	}, [navigate]);

	const handleClickItem = async (orderItem) => {
		const jwt = localStorage.getItem('token');
		const config = {
			headers: { Authorization: `Bearer ${jwt}` }
		};
		await axios.put(`http://localhost:4000/orderItem/${orderItem.orderId}/${orderItem.itemId}`, {}, config);
		await fetchData();
		navigate('/pendingItems');
	};

	return (
		<React.Fragment>
			<Title>Pending Items</Title>
			<Box sx={{
				padding: 4,
				borderRadius: 1,
				boxShadow: 2,
				paddingTop: 3,
				backgroundColor: 'white'
			}}>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell>Order ID</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Name</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{pendingItems.map((row) => (
							<TableRow item={row} key={row.itemId}>
								<TableCell>{row.deliveryDate}</TableCell>
								<TableCell>{row.orderId}</TableCell>
								<TableCell>{row.status}</TableCell>
								<TableCell>{row.item.name}</TableCell>
								{
									row.status === 'pending'
										? <TableCell><Button onClick={async () => { await handleClickItem(row); }}>Confirm</Button></TableCell>
										: <TableCell></TableCell>
								}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Box>
		</React.Fragment>
	);
}
