import styles from './Card.module.scss';

export const Card = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.card}>
				<img
					src='https://www.designindaba.com/sites/default/files/node/news/23566/sonic-burger.jpg'
					alt='burger'
				/>
				<h3>
					Burger <span>200g</span>
				</h3>
				<div className={styles.bottom}>
					<p>$9.99</p>
					<button style={{ background: 'red' }}>Delete</button>
				</div>
			</div>
		</div>
	);
};
