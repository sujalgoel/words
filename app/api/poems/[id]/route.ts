import { prisma } from '@/lib/prisma';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		const poem = await prisma.poem.findUnique({
			where: { id: params.id },
		});

		if (!poem) {
			return NextResponse.json(
				{ success: false, error: 'Poem not found' },
				{ status: 404 },
			);
		}

		return NextResponse.json({ success: true, data: poem });
	} catch (error) {
		console.error('Error fetching poem:', error);

		return NextResponse.json(
			{ success: false, error: 'Failed to fetch poem' },
			{ status: 500 },
		);
	}
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		const body = await request.json();
		const { title, content } = body;

		const poem = await prisma.poem.update({
			where: { id: params.id },
			data: { title, content },
		});

		return NextResponse.json({ success: true, data: poem });
	} catch (error: any) {
		if (error.code === 'P2025') {
			return NextResponse.json(
				{ success: false, error: 'Poem not found' },
				{ status: 404 },
			);
		}
		return NextResponse.json(
			{ success: false, error: 'Failed to update poem' },
			{ status: 500 },
		);
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		await prisma.poem.delete({
			where: { id: params.id },
		});

		return NextResponse.json({ success: true, data: {} });
	} catch (error: any) {
		if (error.code === 'P2025') {
			return NextResponse.json(
				{ success: false, error: 'Poem not found' },
				{ status: 404 },
			);
		}

		return NextResponse.json(
			{ success: false, error: 'Failed to delete poem' },
			{ status: 500 },
		);
	}
}
