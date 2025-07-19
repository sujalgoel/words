'use client';

import { useState } from 'react';
import { Poem } from '@prisma/client';

import { generateRandomGradient } from '@/lib/auth';

interface PoemCardProps {
	poem: Poem;
	onClick: (poem: Poem) => void;
}

export default function PoemCard({ poem, onClick }: PoemCardProps) {
	const [gradient] = useState(() => generateRandomGradient());

	return (
		<div className='masonry-item poem-item'>
			<div
				className='poem-card rounded-lg p-6 cursor-pointer'
				style={{ background: gradient }}
				onClick={() => onClick(poem)}
			>
				<div className='poem-title text-text mb-4'>{poem.title}</div>
				<div
					className='poem-content text-text text-sm'
					dangerouslySetInnerHTML={{ __html: poem.content }}
				/>
			</div>
		</div>
	);
}
