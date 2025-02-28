import { ObjectId } from "mongodb";
import mongoClient from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { NextResponse } from 'next/server';

// Get user
export async function GET(req, { params }) {
  try {
    await mongoClient();
    const user = await User.findById(params.id);

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

    if (!params || !params.id) {
      return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
    }

    const updates = await req.json(); // Get fields to update
    console.log("updates", updates);
    let updateQuery = { ...updates }; // Prepare update object
    console.log("updateQuery1", updateQuery)
    // If the request includes an appointment, append it instead of replacing
    if (updates.appointment) {
      updateQuery = { 
        ...updates, 
        $push: { appointments: updates.appointment } 
      };
      delete updateQuery.appointment; // Remove to avoid conflict
    }
    console.log("updateQuery2", updateQuery)
    const updatedUser = await User.findByIdAndUpdate(
      params.id,
      updateQuery,
      { new: true, runValidators: true } 
    );

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