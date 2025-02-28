import { ObjectId } from "mongodb";
import mongoClient from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { NextResponse } from 'next/server';

// Create new user
export async function POST(req){
  try {
    await mongoClient(); 
    const body = await req.json();
    const newUser = await User.create(body); 

    return new Response(JSON.stringify({ message: 'User added', user: newUser }), { status: 201 });
  } catch (err) {
    console.error('Error inserting user:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// Get all users
export async function GET() {
  try {
    await mongoClient();
    const users = await User.find();

    return new Response(JSON.stringify(users), { status: 201 });
  } catch (err) {
    console.error('Error finding users:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
