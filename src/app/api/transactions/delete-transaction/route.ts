"use server";

import { NextRequest, NextResponse } from "next/server";
import clientPromise from '@/lib/mongdb';
import { revalidatePath } from "next/cache";
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { ObjectId } from 'mongodb';
import fetchData from "@/actions/fetchData";

export const DELETE = async (req: NextRequest) => {
  if (req.method !== 'DELETE') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role === 'admin') {
      return NextResponse.json({ message: 'You are not authorized to make this request!' }, { status: 401 });
    }

    const data = await req.json();
    const { userId, id } = data;
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ message: 'Invalid transaction ID' }, { status: 400 });
    }
    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('becudaBuea');
    const collection = db.collection('users');

     
    const result = await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $pull: { transactions: { id } as any } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
    }

    // Revalidate path and refetch data if necessary
    await fetchData();
    revalidatePath("/users/[_id]");

    return NextResponse.json({ message: 'Transaction deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};
