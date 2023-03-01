import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import OrderList from './components/OrderList';
import CreateUser from './components/CreateUser';
import CreateOrder from './components/CreateOrder';
import ItemList from './components/ItemList'
import Container from '@mui/material/Container';
import PendingItems from './components/PendingItems'

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
							path="/order-create"
							element={
								<>
									<CreateOrder />
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
	);
}

export default App;