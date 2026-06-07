import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongdb';
import { ObjectId } from 'mongodb';

export const GET = async (req: NextRequest, { params }: { params: { _id: string } }) => {
  try {
    const client = await clientPromise;
    const db = client.db('becudaBuea');
    const collection = db.collection('users');

    // Find the user by ID
    const user = await collection.findOne({ _id: new ObjectId(params._id) });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Transform the user data as necessary
    const transformedUser = {
      _id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      position: user.position,
      phone: user.phone,
      reg: user.reg,
      role: user.role,
      password: user.password,
      registeredOn: user.registeredOn,
      transactions: user.transactions,
    };

    return NextResponse.json(transformedUser, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};

