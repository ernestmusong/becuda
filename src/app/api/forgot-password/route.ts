import { NextRequest, NextResponse } from "next/server";
import clientPromise from '@/lib/mongdb';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); 
    const data = body.values;
    const { phone, newPassword, confirmPassword } = data;
    console.log(body)

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json({ message: 'Invalid phone number' }, { status: 400 });
    }

    if (!newPassword || typeof newPassword !== 'string') {
      return NextResponse.json({ message: 'New password is required' }, { status: 400 });
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ message: 'Passwords do not match' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('becudaBuea');
    const collection = db.collection('users');

    // Find user by phone number
    const user = await collection.findOne({ phone });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password
    const result = await collection.updateOne(
      { phone },
      { $set: { password: hashedPassword } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'Failed to reset password' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Password reset successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
