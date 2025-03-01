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

    return NextResponse.json({ message: "User registered" }, { status: 201 });
  } catch (err) {
    console.error('Error inserting user:', err);
    return NextResponse.json({ error: err.message },  { status: 500 });
  }
}

// Get all users
export async function GET() {
  try {
    await mongoClient();
    const users = await User.find();
    return NextResponse.json({ users },  { status: 201 });
  } catch (err) {
    console.error('Error finding users:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
