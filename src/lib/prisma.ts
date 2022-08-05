// /lib/prisma.ts
import { PrismaClient } from '@prisma/client'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  let global_t = global as any;
  if (!global_t.prisma) {
    global_t.prisma = new PrismaClient()
  }
  prisma = global_t.prisma
}

export default prisma