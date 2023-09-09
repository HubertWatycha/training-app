import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../lib/prismadb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session || !session.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  const userId = session.user.id;

  try {
    const { itemId, category } = await req.json();
    console.log({ itemId, category });

    let relation;
    switch (category) {
      case 'Shoe':
        relation = 'chosenShoes';
        break;
      case 'T_Shirt':
        relation = 'chosenT_Shirts';
        break;
      case 'Trousers':
        relation = 'chosenTrousers';
        break;
      case 'Shorts':
        relation = 'chosenShorts';
        break;
      case 'Hoodies':
        relation = 'chosenHoodies';
        break;
      default:
        return new NextResponse('Invalid category', { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        [relation]: {
          disconnect: { id: itemId },
        },
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error removing item:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
