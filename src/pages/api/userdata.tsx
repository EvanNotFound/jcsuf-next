import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      // Fetch the user-specific data from the relevant API endpoint
      const userDataRes = await fetch('https://api.jcsuf.top/api/loginstatus');
      if (!userDataRes.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await userDataRes.json();
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user data' });
    }
  }
  