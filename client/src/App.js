import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import Order from './components/Order';
import ItemList from './components/ItemList'
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
									<Order />
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