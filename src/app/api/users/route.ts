"use server";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from '@/lib/mongdb';
import { ObjectId } from "mongodb";

export const GET = async (req: NextRequest) => {
  try {
    const client = await clientPromise;
    const db = client.db('becudaBuea');
    const collection = db.collection('users');
    const allUsers = await collection.find({}).toArray();
    
    // Return the users as a JSON response
    const users = allUsers.map((user) => ({
      _id: (user._id as ObjectId).toString(), // Fix ObjectId conversion
      name: `${user.firstName} ${user.lastName}`,
    }));

    return NextResponse.json(users); // Properly return the users as JSON
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};
