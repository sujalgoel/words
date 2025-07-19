import { verifyPassword } from '@/lib/auth';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { password } = body;

		if (!password) {
			return NextResponse.json(
				{ success: false, error: 'Password is required' },
				{ status: 400 },
			);
		}

		const isValid = await verifyPassword(password);

		if (!isValid) {
			return NextResponse.json(
				{ success: false, error: 'Invalid password' },
				{ status: 401 },
			);
		}

		const sessionToken = Buffer.from(`${Date.now()}-admin`).toString(
			'base64',
		);

		const response = NextResponse.json({
			success: true,
			message: 'Login successful',
		});

		response.cookies.set('admin-session', sessionToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 60 * 60 * 24,
		});

		return response;
	} catch (error) {
		console.error('Login error:', error);

		return NextResponse.json(
			{ success: false, error: 'Login failed' },
			{ status: 500 },
		);
	}
}
