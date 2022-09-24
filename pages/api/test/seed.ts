// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../lib/prisma';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    prisma.note.deleteMany({}).then(r => {
      res.status(200).json(r);
    }).catch ((e) => {
    console.error(e);
    res.status(500).send('Internal Server Error');
  });
}
