import { ObjectId } from "mongodb";
import mongoClient from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { NextResponse } from 'next/server';

// Get user
export async function GET(req, context) {
  const params = await context.params;
  try {
    await mongoClient();
    const user = await User.findById(params.id).populate("appointments");;

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.error('Error finding users:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// Edit user
export async function PUT(req, context) {
  const params = await context.params;
  try {
    await mongoClient();
    const update = await req.json();

    if (!params || !params.id) {
      return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(params.id, update, { new: true })

    return new Response(JSON.stringify({ message: 'User updated', user: updatedUser }), { status: 200 });
  } catch (err) {
    console.error('Error updating user:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// Delete user
export async function DELETE(req, context) {
  const params = await context.params;
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