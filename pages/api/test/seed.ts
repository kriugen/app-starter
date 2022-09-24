// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    await prisma.note.deleteMany({});
    await prisma.user.deleteMany({});

    const user = await prisma.user.create({
      data: { email: 'borisbars1978@gmail.com' }
    })

    await prisma.note.createMany({ data: [{
        title: 'note 1',
        body: 'body 1',
        userId: user.id,
      }, { 
        title: 'note 2',
        body: 'body 2',
        userId: user.id,
      }
    ]});

    res.status(200).json('ok');
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
}
