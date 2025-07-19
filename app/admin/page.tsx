'use client';

import { Poem } from '@prisma/client';
import { useState, useEffect } from 'react';

interface LoginProps {
	onLogin: () => void;
}

function LoginForm({ onLogin }: LoginProps) {
	const [error, setError] = useState('');
	const [password, setPassword] = useState('');

	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');

		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password }),
			});

			const data = await response.json();

			if (data.success) {
				onLogin();
			} else {
				setError(data.error || 'Login failed');
			}
		} catch (err) {
			console.error('Login error:', err);
			setError('Login failed');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center'>
			<div className='max-w-md w-full space-y-8 p-8'>
				<div className='text-center'>
					<h1 className='font-moontime text-6xl tracking-widest mb-4'>
						ADMIN
					</h1>
					<p className='text-gray-400'>enter password to continue</p>
				</div>

				<form onSubmit={handleSubmit} className='space-y-6'>
					<div>
						<input
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder='password'
							className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500 text-white'
							required
						/>
					</div>

					{error && (
						<div className='text-red-400 text-sm text-center'>
							{error}
						</div>
					)}

					<button
						type='submit'
						disabled={isLoading}
						className='w-full py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
					>
						{isLoading ? 'logging in...' : 'login'}
					</button>
				</form>
			</div>
		</div>
	);
}

interface PoemFormProps {
	poem?: Poem;
	onSave: (poem: Partial<Poem>) => void;
	onCancel: () => void;
	isLoading: boolean;
}

function PoemForm({ poem, onSave, onCancel, isLoading }: PoemFormProps) {
	const [title, setTitle] = useState(poem?.title || '');
	const [content, setContent] = useState(poem?.content || '');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave({ title: title.trim(), content: content.trim() });
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-6'>
			<div>
				<label className='block text-sm font-medium mb-2'>Title</label>
				<input
					type='text'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500 text-white'
					required
				/>
			</div>

			<div>
				<label className='block text-sm font-medium mb-2'>
					Content (HTML allowed)
				</label>
				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					rows={15}
					className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500 text-white font-mono text-sm'
					placeholder='Use HTML tags for formatting: <p>, <em>, <strong>, <br>, etc.'
					required
				/>
			</div>

			<div className='flex space-x-4'>
				<button
					type='submit'
					disabled={isLoading}
					className='flex-1 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
				>
					{isLoading ? 'saving...' : 'save poem'}
				</button>
				<button
					type='button'
					onClick={onCancel}
					className='flex-1 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors'
				>
					cancel
				</button>
			</div>
		</form>
	);
}

export default function AdminPage() {
	const [message, setMessage] = useState('');

	const [showForm, setShowForm] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const [poems, setPoems] = useState<Poem[]>([]);
	const [editingPoem, setEditingPoem] = useState<Poem | null>(null);

	const fetchPoems = async () => {
		try {
			const response = await fetch('/api/poems');
			const data = await response.json();
			if (data.success) {
				setPoems(data.data);
			}
		} catch (error) {
			console.error('Failed to fetch poems:', error);
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			fetchPoems();
		}
	}, [isAuthenticated]);

	const handleSavePoem = async (poemData: Partial<Poem>) => {
		setIsLoading(true);
		try {
			const url = editingPoem
				? `/api/poems/${editingPoem.id}`
				: '/api/poems';
			const method = editingPoem ? 'PUT' : 'POST';

			const response = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(poemData),
			});

			const data = await response.json();

			if (data.success) {
				setMessage(
					editingPoem
						? 'Poem updated successfully!'
						: 'Poem created successfully!',
				);
				fetchPoems();
				setShowForm(false);
				setEditingPoem(null);
			} else {
				setMessage(data.error || 'Operation failed');
			}
		} catch {
			setMessage('Operation failed');
		} finally {
			setIsLoading(false);
			setTimeout(() => setMessage(''), 3000);
		}
	};

	const handleDeletePoem = async (id: string) => {
		if (!confirm('Are you sure you want to delete this poem?')) return;

		try {
			const response = await fetch(`/api/poems/${id}`, {
				method: 'DELETE',
			});
			const data = await response.json();

			if (data.success) {
				setMessage('Poem deleted successfully!');
				fetchPoems();
			} else {
				setMessage(data.error || 'Delete failed');
			}
		} catch {
			setMessage('Delete failed');
		} finally {
			setTimeout(() => setMessage(''), 3000);
		}
	};

	const handleLogout = async () => {
		try {
			await fetch('/api/auth/logout', { method: 'POST' });
			setIsAuthenticated(false);
			setPoems([]);
		} catch (error) {
			console.error('Logout failed:', error);
		}
	};

	if (!isAuthenticated) {
		return <LoginForm onLogin={() => setIsAuthenticated(true)} />;
	}

	if (showForm) {
		return (
			<div className='min-h-screen p-8'>
				<div className='max-w-4xl mx-auto'>
					<div className='flex justify-between items-center mb-8'>
						<h1 className='font-moontime text-4xl tracking-widest'>
							{editingPoem ? 'EDIT POEM' : 'NEW POEM'}
						</h1>
					</div>

					<PoemForm
						poem={editingPoem || undefined}
						onSave={handleSavePoem}
						onCancel={() => {
							setShowForm(false);
							setEditingPoem(null);
						}}
						isLoading={isLoading}
					/>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen p-8'>
			<div className='max-w-6xl mx-auto'>
				<div className='flex justify-between items-center mb-8'>
					<h1 className='font-moontime text-6xl tracking-widest'>
						ADMIN
					</h1>
					<div className='flex space-x-4'>
						<button
							onClick={() => setShowForm(true)}
							className='px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors'
						>
							add new poem
						</button>
						<button
							onClick={handleLogout}
							className='px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors'
						>
							logout
						</button>
					</div>
				</div>

				{message && (
					<div className='mb-4 p-4 bg-green-800 text-green-100 rounded-lg'>
						{message}
					</div>
				)}

				<div className='grid gap-6'>
					{poems.map((poem) => (
						<div
							key={poem.id}
							className='bg-gray-800 rounded-lg p-6'
						>
							<div className='flex justify-between items-start mb-4'>
								<h3 className='poem-title text-lg'>
									{poem.title}
								</h3>
								<div className='flex space-x-2'>
									<button
										onClick={() => {
											setEditingPoem(poem);
											setShowForm(true);
										}}
										className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'
									>
										edit
									</button>
									<button
										onClick={() =>
											handleDeletePoem(poem.id)
										}
										className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors'
									>
										delete
									</button>
								</div>
							</div>
							<div
								className='poem-content text-sm text-gray-300'
								dangerouslySetInnerHTML={{
									__html: poem.content,
								}}
							/>
							<div className='text-xs text-gray-500 mt-4'>
								Created:{' '}
								{new Date(poem.createdAt).toLocaleDateString()}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
