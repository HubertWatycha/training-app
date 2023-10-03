import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import prisma from '../../lib/prismadb';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const userId = session.user.id;

  try {
    const avatarLink = JSON.parse(await req.text()); // Parse JSON here
    
    // Validate if `avatarLink` is a string (URL) or implement further validation logic
    if (typeof avatarLink !== 'string') {
      return new NextResponse('Invalid JSON data', { status: 400 });
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        image: avatarLink,
      },
    });

    return new NextResponse('Avatar has been changed');
  } catch (error) {
    console.error('Error updating avatar:', error);
    return NextResponse.json('Invalid JSON data', { status: 400 });
  }
}
