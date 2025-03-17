import React from 'react';
import { useSelector } from 'react-redux';
import styles from './App.module.scss';
import { ProductsListing } from './components/pages/ProductsListing/ProductsListing';
import { fetchItems } from './store/slices/itemsSlice';
import { RootState, useAppDispatch } from './store/store';

function App() {
	const dispatch = useAppDispatch();
	const items = useSelector((state: RootState) => state.items.items);
	const status = useSelector((state: RootState) => state.items.status);

	React.useEffect(() => {
		dispatch(fetchItems());
	}, []);

	return (
		<div className={styles.app__wrapper}>
			<ProductsListing items={items} status={status} />
		</div>
	);
}

export default App;
