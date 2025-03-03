import bcrypt from 'bcryptjs';
import { ObjectId } from "mongodb";
import mongoClient from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { NextResponse } from 'next/server';

// Create new user
export async function POST(req){
  try {
    await mongoClient(); 
    const { firstName, lastName, age, role, email, password, confirmPassword } = await req.json();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ message: "This email is already being used" }, { status: 400 })
    }
    const hashedPwd = await bcrypt.hash(password, 10);

    const user = {
      firstName, 
      lastName, 
      age,
      role,
      email, 
      password: hashedPwd
    }

    const newUser = await User.create(user); 
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (err) {
    console.error('Error inserting user:', err);
    return NextResponse.json({ message: "Something went wrong." },  { status: 500 });
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
