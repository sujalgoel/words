'use client';

import DateTime from '@/components/DateTime';
import MasonryGrid from '@/components/MasonryGrid';
import LoadingScreen from '@/components/LoadingScreen';

import { Poem } from '@prisma/client';
import { useState, useEffect } from 'react';

export default function Home() {
	const [poems, setPoems] = useState<Poem[]>([]);

	const [isLoading, setIsLoading] = useState(true);
	const [showContent, setShowContent] = useState(false);

	const fetchPoems = async () => {
		try {
			const response = await fetch('/api/poems');
			const data = await response.json();
			if (data.success) {
				setPoems(data.data);
			}
		} catch (error) {
			console.error('Error fetching poems:', error);
		}
	};

	useEffect(() => {
		fetchPoems();
	}, []);

	const handleLoadingComplete = () => {
		setIsLoading(false);
		setShowContent(true);
	};

	if (isLoading) {
		return <LoadingScreen onComplete={handleLoadingComplete} />;
	}

	return (
		<div
			className='px-4 py-8 md:p-8'
			style={{
				opacity: showContent ? 1 : 0,
				transition: 'opacity 0.5s ease',
			}}
		>
			<header className='mb-10 text-center'>
				<h1 className='font-moontime text-9xl tracking-widest'>
					W<span className='opacity-50'>O</span>RDS
				</h1>
				<p className='text-xs text-gray-400 mt-2'>
					my collection of thoughts
				</p>
			</header>

			<MasonryGrid poems={poems} />

			<footer className='mt-16 text-center text-xs text-gray-500'>
				<div className='mb-2'>
					<a
						target='_blank'
						href='https://instagram.com/hecodesforme/'
						className='instagram-link'
					>
						@hecodesforme (Sujal)
					</a>
				</div>
				<DateTime />
				<div className='mt-4'>
					<a
						target='_blank'
						href='https://github.com/sujalgoel/words'
						className='github-link'
					>
						github
					</a>
				</div>
			</footer>
		</div>
	);
}
