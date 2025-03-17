import React from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { setSort } from '../../../store/slices/itemsSlice';
import { useAppDispatch } from '../../../store/store';
import styles from './Selector.module.scss';

export const Selector = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	const dropdownRef = React.useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();

	const sortList = [
		{ name: 'alphabet(low)', field: 'name', order: 'asc' },
		{ name: 'count(low)', field: 'count', order: 'asc' },
		{ name: 'alphabet(high)', field: 'name', order: 'desc' },
		{ name: 'count(high)', field: 'count', order: 'desc' },
	] as const;

	const handleChangeSort = (field: 'name' | 'count', order: 'asc' | 'desc') => {
		dispatch(setSort({ field, order }));
		setIsOpen(false);
	};

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className={styles.dropdown__menu} ref={dropdownRef}>
			<div className={styles.btn} onClick={() => setIsOpen((prev) => !prev)}>
				<p>Sort by</p>
				<RiArrowDropDownLine size={28} />
			</div>
			<ul
				className={styles.list}
				style={{ display: isOpen ? 'block' : 'none' }}
			>
				{sortList.map((sort) => (
					<li
						key={sort.field + sort.order}
						className={styles.item}
						onClick={() => handleChangeSort(sort.field, sort.order)}
					>
						{sort.name}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Selector;
