"use server";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from '@/lib/mongdb';
import { revalidatePath } from "next/cache";
import { ObjectId } from 'mongodb';

export const PATCH = async (req: NextRequest) => {
  if (req.method !== 'PATCH') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }
  const data = await req.json();
  const { userId, ...updateData } = data;

  if (!userId || typeof userId !== 'string') {
    return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('becudaBuea');
    const collection = db.collection('users');
 // update the user document with the new data.
    const result = await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // await fetchData();
    revalidatePath("/users");
    return NextResponse.json({ message: 'User updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};
