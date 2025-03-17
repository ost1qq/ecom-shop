import { useSelector } from 'react-redux';
import { IItem } from '../../../store/slices/itemsSlice';
import { RootState } from '../../../store/store';
import { Card } from '../../common/Card/Card';
import { Modal } from '../../common/Modal/Modal';
import Selector from '../../common/Selector/Selector';
import styles from './ProductsListing.module.scss';

interface IProductsListingProps {
	items: IItem[];
	status: string;
}

export const ProductsListing = ({ items, status }: IProductsListingProps) => {
	const modalStatus = useSelector(
		(state: RootState) => state.modal.modalStatus
	);

	return (
		<main>
			{modalStatus !== 0 && (
				<Modal>Are you sure you want to delete the product?</Modal>
			)}
			<div className={styles.header}>
				<Selector />
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
