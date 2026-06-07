import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongdb';
import { Transaction, User } from '../../../../../types/types';
import { ObjectId } from 'mongodb';

export const POST = async (req: NextRequest) => {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }
  
  try {
    const transaction = await req.json();        
    const { paidIn, fines, userId } = transaction;

    const transactionToSave: Transaction = {
      userId: transaction.userId,
      id: transaction.id,
      date: transaction.date, 
      savings: transaction.savings,
      loans: transaction.loans,
      devLevy: transaction.devLevy,
      troubleFund: transaction.troubleFund,
      paidIn: {
        id: transaction.paidIn.id,
        date: transaction.date,
        motive: paidIn.motive,
        amt: paidIn.amt,
      },
      fines: {
        id: transaction.fines.id,
        date: transaction.date,
        motive: fines.motive,
        amt: fines.amt,
      },
    };

    const client = await clientPromise;
    const db = client.db('becudaBuea');
    const collection = db.collection<User>('users');

    // Check if the user exists
    const existingUser = await collection.findOne({ _id: new ObjectId(userId)});

    if (!existingUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Use $push to add the transaction to the transactions array
    const result = await collection.updateOne(
      { _id: new ObjectId(userId)},
      { $push: { transactions: transactionToSave } }
    );

    if (result.modifiedCount === 0) {
        return NextResponse.json({ message: 'Transaction could not be added.' }, { status: 500 });
      }

    return NextResponse.json({ message: 'Transaction added successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Error in add-transaction route:', error);
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
};
