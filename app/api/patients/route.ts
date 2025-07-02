import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const patients = await db.collection('patients').find({}).toArray();
    return NextResponse.json(patients);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('patients').insertOne(data);
    return NextResponse.json({ insertedId: result.insertedId });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add patient' }, { status: 500 });
  }
} 