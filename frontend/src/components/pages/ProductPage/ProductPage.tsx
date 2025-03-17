import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IItem } from '../../../store/slices/itemsSlice';
import { RootState } from '../../../store/store';

export const ProductPage = () => {
	const { id } = useParams<{ id: string }>();
	const items = useSelector((state: RootState) => state.items.items);
	console.log(items);
	const item = items.find((item: IItem) => item.id === Number(id));

	return (
		<main>
			<h1>{item!.name}</h1>
			<img src={item!.imageUrl} width={256} alt={item!.name} />
			<p>Weight: {item!.weight}</p>
			<p>Count: {item!.count}</p>
		</main>
	);
};
