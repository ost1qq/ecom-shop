import styles from './App.module.scss';
import { ProductsListing } from './components/pages/ProductsListing/ProductsListing';

function App() {
	return (
		<div className={styles.app__wrapper}>
			<ProductsListing />
		</div>
	);
}

export default App;
