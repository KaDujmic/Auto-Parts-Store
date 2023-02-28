import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import OrderList from './components/OrderList';
import CreateUser from './components/CreateUser';
import ItemList from './components/itemList'
import Container from '@mui/material/Container';

function App() {
	return (
			<Router>
				<Container maxWidth="sm">
					<Routes>
						<Route
							exact
							path="/login"
							element={
								<>
									<SignIn />
								</>
							}
						></Route>
            <Route
							exact
							path="/order"
							element={
								<>
									<OrderList />
								</>
							}
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
							element={
									<ItemList/>
							}
						></Route>
					</Routes>
				</Container>
			</Router>
	);
}

export default App;