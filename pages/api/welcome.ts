import { NextResponse } from 'next/server';
import { EdgeConfigValue, get } from '@vercel/edge-config';

export default async function handler(req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { greeting: EdgeConfigValue | undefined; }): void; new(): any; }; }; }) {
  const greeting = await get('user1Name');
  res.status(200).json({ greeting });
}
