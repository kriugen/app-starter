// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const r = await prisma.note.deleteMany({});
    res.status(200).json(r);
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
}
