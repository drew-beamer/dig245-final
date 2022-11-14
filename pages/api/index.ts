// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type ResData = {
  status: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResData>
) {
  res.status(200).json({ status: 'Up and running!' })
}
