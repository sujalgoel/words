'use client';

import { useState, useEffect } from 'react';

export default function DateTime() {
	const [dateTime, setDateTime] = useState({
		date: '',
		time: '',
	});

	useEffect(() => {
		const updateDateTime = () => {
			const now = new Date();

			const hours = now.getHours().toString().padStart(2, '0');
			const minutes = now.getMinutes().toString().padStart(2, '0');
			const seconds = now.getSeconds().toString().padStart(2, '0');

			const year = now.getFullYear().toString().slice(2);
			const day = now.getDate().toString().padStart(2, '0');
			const month = (now.getMonth() + 1).toString().padStart(2, '0');

			setDateTime({
				date: `${day}.${month}.${year}`,
				time: `${hours}:${minutes}:${seconds}`,
			});
		};

		updateDateTime();
		const interval = setInterval(updateDateTime, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className='flex items-center justify-center gap-4'>
			<span>{dateTime.date}</span>
			<span className='opacity-50'>|</span>
			<span>{dateTime.time}</span>
		</div>
	);
}
