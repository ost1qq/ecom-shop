import React from 'react';
import { useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Correct Router import
import styles from './App.module.scss';
import { ProductPage } from './components/pages/ProductPage/ProductPage';
import { ProductsListing } from './components/pages/ProductsListing/ProductsListing';
import { fetchItems } from './store/slices/itemsSlice';
import { RootState, useAppDispatch } from './store/store';

function App() {
	const dispatch = useAppDispatch();
	const items = useSelector((state: RootState) => state.items.items);
	const status = useSelector((state: RootState) => state.items.status);

	React.useEffect(() => {
		dispatch(fetchItems());
	}, [dispatch]);

	return (
		<Router>
			<div className={styles.app__wrapper}>
				<Routes>
					<Route
						path='/'
						element={<ProductsListing items={items} status={status} />}
					/>
					<Route path='/products/:id' element={<ProductPage />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
