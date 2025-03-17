import { Card } from '../../common/Card/Card';
import styles from './ProductsListing.module.scss';

export const ProductsListing = () => {
	return (
		<main>
			<div className={styles.header}>
				<button style={{ background: 'rgb(255, 157, 0)' }}>
					Add new product
				</button>
			</div>
			<div className={styles.grid}>
				<Card />
				<Card />
				<Card />
				<Card />
			</div>
		</main>
	);
};
