import bcrypt from 'bcryptjs';
import { ObjectId } from "mongodb";
import mongoClient from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { NextResponse } from 'next/server';

// Get user
export async function GET(req, context) {
  const params = await context.params;
  try {
    await mongoClient();
    const user = await User.findById(params.id).populate("appointments");

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Edit user
export async function PUT(req, context) {
  const params = await context.params;
  try {
    await mongoClient();
    const { firstName, lastName, email, password, confirmPassword } = await req.json();

    if (!params || !params.id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const user = {
      firstName, 
      lastName, 
      email, 
      password: hashedPwd
    }

    const updatedUser = await User.findByIdAndUpdate(params.id, user, { new: true })

    return NextResponse.json({ message: "User updated" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Delete user
export async function DELETE(req, context) {
  const params = await context.params;
  try {
    await mongoClient();
    const deletedUser = await User.findByIdAndDelete(params.id);

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}