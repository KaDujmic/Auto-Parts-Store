import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as React from 'react';
import SignIn from './components/SignIn';
import OrderList from './components/OrderList';
import CreateUser from './components/CreateUser';
import CreateOrder from './components/CreateOrder';
import ItemList from './components/ItemList';
import UserOrderList from './components/UserOrderList';
import Container from '@mui/material/Container';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/authContext';
import PendingItems from './components/PendingItems';
import Dashboard from './components/Dashboard';

function App () {
	return (
		<AuthProvider>
			<Router>
				<Navbar></Navbar>
				<Container maxWidth="lg" sx={{
					backgroundColor: (theme) =>
						theme.palette.mode === 'light'
							? theme.palette.grey[100]
							: theme.palette.grey[900],
					minHeight: '1000px',
					paddingTop: '10px'
				}}>
					<Routes>
						<Route
							exact
							path="/dashboard"
							element={<>
								<Dashboard />
							</>}
						></Route>
						<Route
							exact
							path="/login"
							element={<>
								<SignIn />
							</>}
						></Route>
						<Route
							exact
							path="/order"
							element={<>
								<OrderList />
							</>}
						></Route>
						<Route
							exact
							path="/order-create"
							element={
								<>
									<CreateOrder />
								</>
							}
						></Route>
						<Route
							exact
							path="/userOrders"
							element={<>
								<UserOrderList />
							</>}
						></Route>
						<Route
							exact
							path="/user"
							element={
								<>
									<CreateUser />
								</>
							}
						></Route>
						<Route
							exact
							path="/"
							element={<ItemList />}
						></Route>
						<Route
							exact
							path="/pendingitems"
							element={
								<PendingItems/>
							}
						></Route>
					</Routes>
				</Container>
			</Router>
		</AuthProvider>
	);
}

export default App;
