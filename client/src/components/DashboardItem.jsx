import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Items () {
	const [pendingItems, setPendingItems] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		async function fetchData () {
			try {
				const jwt = localStorage.getItem('token');
				const config = {
					headers: { Authorization: `Bearer ${jwt}` }
				};
				const response = await axios.get('http://localhost:4000/orderItem', config);
				setPendingItems(response.data.splice(0, 3));
			} catch (err) {
				navigate('/login');
				console.log(err);
			}
		}
		fetchData();
	}, []);
	return (
		<React.Fragment>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					paddingTop: '1%'
				}}
			>
				<Title>Pending Items</Title>
				<Table
					size="small"
					sx={{
						backgroundColor: 'white',
						marginTop: '3%'
					}}
				>
					<TableHead>
						<TableRow>
							<TableCell>Order No.</TableCell>
							<TableCell>Date</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Name</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{pendingItems.map((row) => (
							<TableRow item={row} key={row.id}>
								<TableCell>{row.orderId}</TableCell>
								<TableCell>{row.deliveryDate}</TableCell>
								<TableCell>{row.status}</TableCell>
								<TableCell>{row.item.name}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Box>
		</React.Fragment>
	);
}
