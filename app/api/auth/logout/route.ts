import { NextResponse } from 'next/server';

export async function POST() {
	const response = NextResponse.json({
		success: true,
		message: 'Logout successful',
	});

	response.cookies.delete('admin-session');

	return response;
}
