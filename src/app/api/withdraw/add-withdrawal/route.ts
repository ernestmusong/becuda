"use server";
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongdb';
 
export const POST = async (req: NextRequest) => {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }
  try {
    const withdrawal = await req.json();
    const {date, motive, amt} = withdrawal
    if (!date || !motive || !amt) {
      throw new Error("All fields are required");
    }

    const client = await clientPromise;
    const db = client.db('becudaBuea');
    const collection = db.collection('withdrawals');
     
    const withdrawaToSave = { motive, amt, date };
    await collection.insertOne(withdrawaToSave);
    return NextResponse.json({ message: 'Withdrawal created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error in add-withdrwal route:', error);
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
};