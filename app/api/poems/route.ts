import { prisma } from '@/lib/prisma';

import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
	try {
		const poems = await prisma.poem.findMany({
			orderBy: { createdAt: 'desc' },
		});
		return NextResponse.json({ success: true, data: poems });
	} catch (error) {
		console.error('Database error:', error);
		return NextResponse.json(
			{ success: false, error: 'Failed to fetch poems' },
			{ status: 500 },
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { title, content } = body;

		if (!title || !content) {
			return NextResponse.json(
				{ success: false, error: 'Title and content are required' },
				{ status: 400 },
			);
		}

		const poem = await prisma.poem.create({
			data: { title, content },
		});
		return NextResponse.json(
			{ success: true, data: poem },
			{ status: 201 },
		);
	} catch {
		return NextResponse.json(
			{ success: false, error: 'Failed to create poem' },
			{ status: 500 },
		);
	}
}
