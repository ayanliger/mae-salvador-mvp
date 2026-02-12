import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email?: string | null
      role: string
    }
  }

  interface User {
    role?: string
  }
}
