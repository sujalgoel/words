import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'words — @hecodesforme (Sujal)',
	description: 'my collection of thoughts',
	themeColor: '#111111',
	openGraph: {
		title: 'words — @hecodesforme (Sujal)',
		description: 'my collection of thoughts',
		url: 'https://words.hecodesforme.com/',
		images: [
			{
				url: 'https://words.hecodesforme.com/website.jpeg',
				width: 1200,
				height: 630,
				alt: 'words — @hecodesforme (Sujal)',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'words — @hecodesforme (Sujal)',
		description: 'my collection of thoughts',
		images: ['https://words.hecodesforme.com/website.jpeg'],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<head>
				<link rel='icon' href='./favicon.png' />
				<link rel='apple-touch-icon' href='./favicon.png' />
			</head>
			<body>{children}</body>
		</html>
	);
}
