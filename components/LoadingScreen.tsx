'use client';

import { useState, useEffect } from 'react';

interface LoadingScreenProps {
	onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
			setTimeout(onComplete, 300);
		}, 2000);

		return () => clearTimeout(timer);
	}, [onComplete]);

	if (!isVisible) return null;

	return (
		<div
			id='loader-wrapper'
			className='fixed inset-0 z-50 flex items-center justify-center bg-[#121212]'
			style={{
				opacity: isVisible ? 1 : 0,
				transition: 'opacity 0.3s ease',
			}}
		>
			<div className='loader-content text-center'>
				<h1 className='font-moontime text-9xl tracking-widest text-white animate-pulse'>
					W<span className='opacity-50'>O</span>RDS
				</h1>
				<div className='mt-8 flex justify-center'>
					<div className='loading-bar w-32 h-1 bg-gray-700 rounded-full overflow-hidden'>
						<div className='loading-progress h-full bg-white rounded-full'></div>
					</div>
				</div>
			</div>
		</div>
	);
}
