import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET: Fetch all staff
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const staff = await db.collection('staff').find({}).toArray();
    return NextResponse.json(staff);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch staff' }, { status: 500 });
  }
}

// POST: Add a new staff member
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('staff').insertOne(data);
    return NextResponse.json({ insertedId: result.insertedId });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add staff' }, { status: 500 });
  }
}

// PUT: Update a staff member by _id
export async function PUT(req: NextRequest) {
  try {
    const { _id, ...updateData } = await req.json();
    if (!_id) return NextResponse.json({ error: 'Missing _id' }, { status: 400 });
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('staff').updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );
    return NextResponse.json({ modifiedCount: result.modifiedCount });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update staff' }, { status: 500 });
  }
}

// DELETE: Remove a staff member by _id
export async function DELETE(req: NextRequest) {
  try {
    const { _id } = await req.json();
    if (!_id) return NextResponse.json({ error: 'Missing _id' }, { status: 400 });
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('staff').deleteOne({ _id: new ObjectId(_id) });
    return NextResponse.json({ deletedCount: result.deletedCount });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete staff' }, { status: 500 });
  }
}

const newStaff = {
  name: `${firstName} ${lastName}`,
  role,
  department,
  phone,
  email,
  shift,
  status,
  joinDate,
  salary,
};

const filteredStaff = staff.filter(
  (member) =>
    member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email?.toLowerCase().includes(searchTerm.toLowerCase())
); 