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
    let avatarValue;

    if (req.files && req.files.avatar) {
      const avatarFile = req.files.avatar;

      avatarValue = avatarFile.path;
    } else {
      const avatarLink = await req.text();
      
      if (typeof avatarLink !== 'string') {
        return new NextResponse('Invalid data', { status: 400 });
      }

      avatarValue = avatarLink;
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        image: avatarValue,
      },
    });

    return new NextResponse(JSON.stringify({ message: 'Avatar has been changed' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error updating avatar:', error);
    return new NextResponse(JSON.stringify({ message: 'Error updating avatar' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
