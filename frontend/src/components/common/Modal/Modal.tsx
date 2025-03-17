import { useSelector } from 'react-redux';
import {
	deleteItem,
	setCurrentProductId,
} from '../../../store/slices/itemsSlice';
import { setModalStatus } from '../../../store/slices/modalSlice';
import { RootState, useAppDispatch } from '../../../store/store';
import styles from './Modal.module.scss';

interface IModal {
	children?: React.ReactNode;
}

export const Modal = ({ children }: IModal) => {
	const dispatch = useAppDispatch();
	const currentProductId = useSelector(
		(state: RootState) => state.items.currentProductId
	);

	return (
		<div>
			<div className={styles.modal}>
				{children}
				<div className={styles.buttons}>
					<button
						style={{ background: 'green' }}
						onClick={() => {
							dispatch(deleteItem(currentProductId));
							dispatch(setModalStatus(0));
						}}
					>
						Yes
					</button>
					<button
						style={{ background: 'red', marginLeft: '16px' }}
						onClick={() => {
							dispatch(setCurrentProductId(0));
							dispatch(setModalStatus(0));
						}}
					>
						No
					</button>
				</div>
			</div>
		</div>
	);
};
