'use client';

import { Poem } from '@prisma/client';
import html2canvas from 'html2canvas';
import { useState, useEffect, useRef } from 'react';

import { generateRandomGradient } from '@/lib/auth';

interface PoemModalProps {
	poem: Poem | null;
	isOpen: boolean;
	onClose: () => void;
}

export default function PoemModal({ poem, isOpen, onClose }: PoemModalProps) {
	const [isDownloading, setIsDownloading] = useState(false);

	const [gradient] = useState(() => generateRandomGradient());

	const poemCardRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = 'auto';
		};
	}, [isOpen, onClose]);

	const handleDownloadImage = async () => {
		if (!poemCardRef.current || !poem) return;

		setIsDownloading(true);

		try {
			const downloadBtn = document.querySelector(
				'.download-btn',
			) as HTMLElement;
			if (downloadBtn) downloadBtn.style.display = 'none';

			const canvas = await html2canvas(poemCardRef.current, {
				backgroundColor: null,
				scale: 2,
				useCORS: true,
				allowTaint: true,
			});

			if (downloadBtn) downloadBtn.style.display = 'block';

			const link = document.createElement('a');
			link.download = `${poem.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-poem.png`;
			link.href = canvas.toDataURL('image/png');

			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (error) {
			console.error('Error generating image:', error);
		} finally {
			setIsDownloading(false);
		}
	};

	if (!poem) return null;

	return (
		<div
			className={`modal ${isOpen ? 'active' : ''}`}
			onClick={(e) => e.target === e.currentTarget && onClose()}
		>
			<div className='modal-content rounded-md relative'>
				<div
					ref={poemCardRef}
					className='poem-card p-10 flex flex-col justify-between'
					style={{ background: gradient }}
				>
					<div className='poem-title text-center mb-2 text-lg text-text'>
						{poem.title}
					</div>
					<span className='text-xs text-textLight font-semibold text-center mb-10'>
						by Sujal &lt;3
					</span>
					<div
						className='poem-content text-text space-y-6'
						dangerouslySetInnerHTML={{ __html: poem.content }}
					/>
				</div>

				{/* Close Button */}
				<button
					onClick={onClose}
					className='absolute top-4 left-4 bg-black bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm z-10'
					title='Close'
				>
					<svg
						className='w-5 h-5'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M6 18L18 6M6 6l12 12'
						/>
					</svg>
				</button>

				{/* Download Button */}
				<button
					onClick={handleDownloadImage}
					disabled={isDownloading}
					className='download-btn absolute top-4 right-4 bg-black bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed z-10'
					title='Save as image'
				>
					{isDownloading ? (
						<svg
							className='w-5 h-5 animate-spin'
							fill='none'
							viewBox='0 0 24 24'
						>
							<circle
								className='opacity-25'
								cx='12'
								cy='12'
								r='10'
								stroke='currentColor'
								strokeWidth='4'
							/>
							<path
								className='opacity-75'
								fill='currentColor'
								d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
							/>
						</svg>
					) : (
						<svg
							className='w-5 h-5'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
							/>
						</svg>
					)}
				</button>
			</div>
		</div>
	);
}
