import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcrypt';
import { AuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from './prisma';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'user',
        },
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid email or password');
        }

        const isExistingUser = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (!isExistingUser) {
          throw new Error('User does not exist');
        }

        const doPasswordsMatch = await bcrypt.compare(
          credentials.password,
          isExistingUser.password!
        );

        if (!doPasswordsMatch) {
          throw new Error('Incorrect password provided');
        }

        return {
          id: isExistingUser.id,
          email: isExistingUser.email,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};
