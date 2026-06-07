"use server";
import { NextRequest, NextResponse } from "next/server";;
import clientPromise from '@/lib/mongdb';
import { revalidatePath } from "next/cache";
import { ObjectId } from 'mongodb';
import fetchData from "@/actions/fetchData";

export const DELETE = async (req: NextRequest) => {
  if (req.method !== 'DELETE') {
    return NextResponse.json({ message: 'Method not allowed' }, {status: 405});
  }
  const data = await req.json();
  const userId = data.userId;
  if (!userId || typeof userId !== 'string') {
    return NextResponse.json({ message: 'Invalid user ID' }, {status: 400});
  }

  try {
    const client = await clientPromise;
    const db = client.db('becudaBuea');
    const collection = db.collection('users');
    const result = await collection.deleteOne({ _id: new ObjectId(userId) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'User not found' }, {status: 404});
    }
   await fetchData();
    return NextResponse.json({ message: 'User deleted successfully' }, {status: 200});
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ message: 'Internal server error' }, {status: 500});
  } finally{
    revalidatePath("/users");
  }
}
