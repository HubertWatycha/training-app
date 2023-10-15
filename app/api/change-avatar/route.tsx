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

    switch (true) {
      case !!req.body && !!req.body.avatar:
        const avatarFile = req.body.avatar;

        break;

      case !!req.body && !!req.body.avatarLink:
        const avatarLink = req.body.avatarLink;

        if (typeof avatarLink !== 'string') {
          return new NextResponse('Invalid data', { status: 400 });
        }

        avatarValue = avatarLink;
        break;

      default:
        return new NextResponse('Invalid data', { status: 400 });
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
