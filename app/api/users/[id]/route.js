import { ObjectId } from "mongodb";
import mongoClient from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { NextResponse } from 'next/server';

// Get user
export async function GET() {
  try {
    await mongoClient();
    const users = await User.find();

    return new Response(JSON.stringify({ message: 'Found users', user: newUser }), { status: 201 });
  } catch (err) {
    console.error('Error finding users:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// Edit user
export async function PUT(){

}

// Delete user
export async function DELETE(){

}