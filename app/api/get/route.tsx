import { NextResponse } from 'next/server';
import prisma from '../../lib/prismadb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';



export async function GET() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session || !session.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const userId = session.user.id;

  const [
    chosenShoes,
    chosenT_Shirts,
    chosenTrousers,
    chosenShorts,
    chosenHoodies,
  ] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      include: { chosenShoes: true },
    }),
    prisma.user.findUnique({
      where: { id: userId },
      include: { chosenT_Shirts: true },
    }),
    prisma.user.findUnique({
      where: { id: userId },
      include: { chosenTrousers: true },
    }),
    prisma.user.findUnique({
      where: { id: userId },
      include: { chosenShorts: true },
    }),
    prisma.user.findUnique({
      where: { id: userId },
      include: { chosenHoodies: true },
    }),
  ]);

  const allItems = [
    ...(chosenShoes?.chosenShoes ?? []),
    ...(chosenT_Shirts?.chosenT_Shirts ?? []),
    ...(chosenTrousers?.chosenTrousers ?? []),
    ...(chosenShorts?.chosenShorts ?? []),
    ...(chosenHoodies?.chosenHoodies ?? []),
  ];

  console.log(userId);
  if (!allItems || allItems.length === 0) {
    return new NextResponse('No items');
  }

  return NextResponse.json(allItems);
}
