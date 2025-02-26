import { ObjectId } from "mongodb";
import mongoClient from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { NextResponse } from 'next/server';

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