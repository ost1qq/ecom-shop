import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { IItem, setCurrentProductId } from '../../../store/slices/itemsSlice';
import { setModalStatus } from '../../../store/slices/modalSlice';
import styles from './Card.module.scss';

interface ICardProps {
	item: IItem;
}

export const Card = ({ item }: ICardProps) => {
	const dispatch = useDispatch();

	return (
		<div className={styles.wrapper}>
			<div className={styles.card}>
				<img
					src={item.imageUrl}
					alt={item.name}
					width={item.size.width}
					height={item.size.width}
				/>
				<NavLink to={`/products/${item.id}`}>
					<h3>
						{item.name} <span>{item.weight}</span>
					</h3>
				</NavLink>
				<div className={styles.bottom}>
					<p>Count: {item.count}</p>
					<button
						style={{ background: 'red' }}
						onClick={() => {
							dispatch(setCurrentProductId(item.id));
							dispatch(setModalStatus(1));
						}}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};
