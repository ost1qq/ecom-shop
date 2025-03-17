import { IItem } from '../../../store/slices/itemsSlice';
import styles from './Card.module.scss';

interface ICardProps {
	item: IItem;
}

export const Card = ({ item }: ICardProps) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.card}>
				<img
					src={item.imageUrl}
					alt={item.name}
					width={item.size.width}
					height={item.size.width}
				/>
				<h3>
					{item.name} <span>{item.weight}</span>
				</h3>
				<div className={styles.bottom}>
					<p>Count: {item.count}</p>
					<button style={{ background: 'red' }}>Delete</button>
				</div>
			</div>
		</div>
	);
};
