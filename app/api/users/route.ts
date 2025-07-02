import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const users = await db.collection('users').find({}).toArray();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('users').insertOne(data);
    return NextResponse.json({ insertedId: result.insertedId });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add user' }, { status: 500 });
  }
} 