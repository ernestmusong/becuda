"use server";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from '@/lib/mongdb';
import { revalidatePath } from "next/cache";
import { ObjectId } from 'mongodb';

export const PUT = async (req: NextRequest) => {
  if (req.method !== 'PUT') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const data = await req.json();
  const { userId, id } = data.values;

  if (!userId || typeof userId !== 'string') {
    return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
  }

  if (!id || typeof id !== 'string') {
    return NextResponse.json({ message: 'Invalid transaction ID' }, { status: 400 });
  }

  if (typeof data !== 'object' || data === null) {
    return NextResponse.json({ message: 'Invalid update fields' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('becudaBuea');
    const collection = db.collection('users');

    // Use $set and arrayFilters to update the specific transaction in the array
    const result = await collection.updateOne(
      { _id: new ObjectId(userId), 'transactions.id': id },
      { $set: { 'transactions.$': data.values } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: 'Transaction not found or not updated' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Transaction updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating transaction:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    revalidatePath("/users/");
  }
};
