import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const POST = async (request: NextRequest) => {
  const reqBody = await request.json();
  const { name, email, password } = reqBody;

  if (!name || !email || !password) {
    return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
  }

  const isExistingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (isExistingUser) {
    return NextResponse.json(
      { message: 'User already exists with the given email, please login' },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ message: 'User registered' }, { status: 201 });
};
