export async function verifyPassword(password: string): Promise<boolean> {
	const adminPassword = process.env.ADMIN_PASSWORD;

	if (!adminPassword) {
		throw new Error('Admin password not configured');
	}

	return password === adminPassword;
}

export function generateRandomGradient(): string {
	const lightness1 = 75 + Math.floor(Math.random() * 15);
	const lightness2 = 60 + Math.floor(Math.random() * 15);
	const lightness3 = 80 + Math.floor(Math.random() * 10);

	const color1 = `hsl(0, 5%, ${lightness1}%)`;
	const color2 = `hsl(0, 8%, ${lightness2}%)`;
	const color3 = `hsl(0, 3%, ${lightness3}%)`;

	return `linear-gradient(135deg, ${color1}, ${color2}, ${color3})`;
}

export function shuffleArray<T>(array: T[]): T[] {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}
