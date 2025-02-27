import { ObjectId } from "mongodb";
import mongoClient from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { NextResponse } from 'next/server';

// Get user
export async function GET(req, { params }) {
  try {
    await mongoClient();
    const user = await User.findById(params.id);

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.error('Error finding users:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// Edit user
export async function PUT(req, { params }){
  try {
    await mongoClient();
    const body = await req.json();
    const updatedUser = await User.findByIdAndUpdate(params.id, body, { new: true });

    if (!updatedUser) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'User updated', user: updatedUser }), { status: 200 });
  } catch (err) {
    console.error('Error updating user:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// Delete user
export async function DELETE(req, { params }){
  try {
    await mongoClient();
    const deletedUser = await User.findByIdAndDelete(params.id);

    if (!deletedUser) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'User deleted' }), { status: 200 });
  } catch (err) {
    console.error('Error deleting user:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}