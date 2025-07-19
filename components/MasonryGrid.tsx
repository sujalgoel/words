'use client';

import { Poem } from '@prisma/client';
import { useEffect, useState } from 'react';

import PoemCard from './PoemCard';
import PoemModal from './PoemModal';
import { shuffleArray } from '@/lib/auth';

interface MasonryGridProps {
	poems: Poem[];
}

export default function MasonryGrid({ poems }: MasonryGridProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [shuffledPoems, setShuffledPoems] = useState<Poem[]>([]);
	const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);

	useEffect(() => {
		setShuffledPoems(shuffleArray(poems));
	}, [poems]);

	const handlePoemClick = (poem: Poem) => {
		setSelectedPoem(poem);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedPoem(null);
	};

	return (
		<>
			<div className='masonry-grid'>
				{shuffledPoems.map((poem) => (
					<PoemCard
						key={poem.id}
						poem={poem}
						onClick={handlePoemClick}
					/>
				))}
			</div>

			<PoemModal
				poem={selectedPoem}
				isOpen={isModalOpen}
				onClose={handleCloseModal}
			/>
		</>
	);
}
