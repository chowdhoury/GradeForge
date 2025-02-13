// /api/courseResults.ts
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  const { studentId, semesterId } = req.query;

  if (!studentId || !semesterId) {

    return res.status(400).json({ error: 'Missing studentId or semesterId' });
  }
  const backendUrl = `http://software.diu.edu.bd:8006/result?grecaptcha=&semesterId=${semesterId}&studentId=${studentId}`;

  try {
    const backendResponse = await fetch(backendUrl);
    if (!backendResponse.ok) {
      throw new Error(`Backend error: ${backendResponse.statusText}`);
    }
    const data = await backendResponse.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error: any) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch data' });
  }
}

