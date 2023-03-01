import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import OrderList from './components/OrderList';
import ItemList from './components/itemList'
import Container from '@mui/material/Container';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/authContext';



function App() {
	return (
		<AuthProvider>
			<Navbar></Navbar>
			<Router>
				<Container maxWidth="sm">
					<Routes>
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
							path="/"
							element={<ItemList />}
						></Route>
					</Routes>
				</Container>
			</Router>
		</AuthProvider>
	);
}

export default App;