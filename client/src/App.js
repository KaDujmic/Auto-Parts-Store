import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import OrderList from './components/OrderList';
import CreateUser from './components/CreateUser';
import ItemList from './components/ItemList'
import Container from '@mui/material/Container';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/authContext';
import PendingItems from './components/PendingItems'

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