import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import { prisma } from './prisma'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: 'gestante',
      name: 'Gestante',
      credentials: {
        cpf: { label: 'CPF', type: 'text' },
        senha: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        const cpf = (credentials.cpf as string)?.replace(/\D/g, '')
        const senha = credentials.senha as string
        if (!cpf || !senha) return null

        const gestante = await prisma.gestante.findUnique({ where: { cpf } })
        if (!gestante || !gestante.ativo) return null

        const senhaValida = await compare(senha, gestante.senha)
        if (!senhaValida) return null

        return {
          id: gestante.id,
          name: gestante.nomeSocial || gestante.nome,
          email: gestante.email,
          role: 'gestante' as const,
        }
      },
    }),
    Credentials({
      id: 'profissional',
      name: 'Profissional',
      credentials: {
        cpf: { label: 'CPF', type: 'text' },
        senha: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        const cpf = (credentials.cpf as string)?.replace(/\D/g, '')
        const senha = credentials.senha as string
        if (!cpf || !senha) return null

        const profissional = await prisma.profissional.findUnique({ where: { cpf } })
        if (!profissional || !profissional.ativo) return null

        const senhaValida = await compare(senha, profissional.senha)
        if (!senhaValida) return null

        return {
          id: profissional.id,
          name: profissional.nome,
          role: 'profissional' as const,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role: string }).role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
})
