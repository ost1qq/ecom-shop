import { IItem } from '../../../store/slices/itemsSlice';
import { Card } from '../../common/Card/Card';
import styles from './ProductsListing.module.scss';

interface IProductsListingProps {
	items: IItem[];
	status: string;
}

export const ProductsListing = ({ items, status }: IProductsListingProps) => {
	return (
		<main>
			<div className={styles.header}>
				<button style={{ background: 'rgb(255, 157, 0)' }}>
					Add new product
				</button>
			</div>
			{status === 'loading' && <div>Loading...</div>}
			{status === 'error' && <div>Failed to fetch items</div>}
			{items.length === 0 && status === 'success' && <div>No items found</div>}
			<div className={styles.grid}>
				{items.map((item) => (
					<Card key={item.id} item={item} />
				))}
			</div>
		</main>
	);
};
