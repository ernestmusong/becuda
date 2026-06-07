"use server";
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongdb';
import { revalidatePath } from "next/cache";

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const POST = async (req: NextRequest) => {
  if (req.method !== 'POST') {
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
    const user = await req.json();
    const {
      firstName,
      lastName,
      phone,
      reg,
      position,
      registeredOn,
      password,
    } = user;

    if (!firstName || !lastName || !phone || !registeredOn || !reg || !password) {
      throw new Error("All fields are required");
    }

    const stringPassword = password.toString()

    const client = await clientPromise;
    const db = client.db('becudaBuea');
    const collection = db.collection('users');
    const existingUser = await collection.findOne({ phone });

    if (existingUser) {
      throw new Error("Phone number is already in use");
    }
    const hashedPassword = await hashPassword(stringPassword);
    const userToSave = { 
      firstName,
      lastName, 
      phone, 
      reg: parseInt(reg), 
      position, 
      registeredOn, 
      password: hashedPassword, 
      role: "user", 
      transactions: [] 
    };
  
    await collection.insertOne(userToSave);
    revalidatePath("/users");
    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error in create-user route:', error);
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
};

